const fs = require("fs");
const path = require("path");

const DATA_DIR =
  process.env.PAYMENTS_DATA_DIR || path.join("/tmp", "blockpulse-data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function readPayments() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8") || "[]";
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch (e) {
    console.error("readPayments error:", e);
    return [];
  }
}

function writePayments(payments) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2), "utf8");
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: baseHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: baseHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, createdAt } = body;

    if (!name || !email || !createdAt) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({
          error: "Missing fields (name, email, createdAt)",
        }),
      };
    }

    const payments = readPayments();

    const idx = payments.findIndex(
      (p) =>
        p.name === name &&
        p.email === email &&
        p.createdAt === createdAt
    );

    if (idx === -1) {
      return {
        statusCode: 404,
        headers: baseHeaders,
        body: JSON.stringify({ error: "Payment not found" }),
      };
    }

    const now = new Date().toISOString();
    payments[idx].paid = true;
    payments[idx].paidAt = now;

    writePayments(payments);

    return {
      statusCode: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ok: true, paidAt: now }),
    };
  } catch (err) {
    console.error("markSepaPaid error:", err);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};

