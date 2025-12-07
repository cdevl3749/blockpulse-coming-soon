const fs = require("fs");
const path = require("path");

const DATA_DIR =
  process.env.PAYMENTS_DATA_DIR || path.join("/tmp", "blockpulse-data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function readPayments() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8") || "[]";
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch (e) {
    console.error("getSepaPayments read error:", e);
    return [];
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: baseHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: baseHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const payments = readPayments();

    // On ne renvoie que les paiements SEPA si tu veux filtrer :
    // const sepaPayments = payments.filter(p => p.mode === "bank" || p.mode === "sepa");
    // return ...

    return {
      statusCode: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payments }),
    };
  } catch (err) {
    console.error("getSepaPayments error:", err);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
