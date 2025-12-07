const fs = require("fs");
const path = require("path");

// On stocke dans /tmp (écriture autorisée sur Netlify)
// Tu peux changer ce chemin via une variable d'env PAYMENTS_DATA_DIR si tu veux.
const DATA_DIR =
  process.env.PAYMENTS_DATA_DIR || path.join("/tmp", "blockpulse-data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

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
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2), "utf8");
}

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  // Préflight CORS
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
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email || !packId) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({
          error: "Missing required fields (name, email, packId)",
        }),
      };
    }

    const createdAt = new Date().toISOString();

    const newPayment = {
      name,
      email,
      packId,
      packLabel: packLabel || null,
      units: typeof units === "number" ? units : Number(units) || null,
      mode: mode || "sepa",
      createdAt,
      paid: false,
      paidAt: null,
    };

    const payments = readPayments();
    payments.push(newPayment);
    writePayments(payments);

    return {
      statusCode: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ok: true,
        payment: newPayment,
      }),
    };
  } catch (err) {
    console.error("savePayment error:", err);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({
        error: "Internal error while saving payment",
      }),
    };
  }
};








