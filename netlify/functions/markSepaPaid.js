const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { id } = body;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing payment ID" }),
      };
    }

    if (!fs.existsSync(DATA_FILE)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true }),
      };
    }

    const raw = fs.readFileSync(DATA_FILE, "utf8") || "[]";
    const payments = JSON.parse(raw);

    // Trouver le paiement
    const item = payments.find((p) => p.id === id);

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Payment not found" }),
      };
    }

    // Marquer comme payé
    item.paid = true;
    item.paidAt = new Date().toISOString();

    // Réécriture SAFE
    fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2), "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, payment: item }),
    };

  } catch (err) {
    console.error("markSepaPaid ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne (markPaid)" }),
    };
  }
};

