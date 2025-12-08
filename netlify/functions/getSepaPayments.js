const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

exports.handler = async () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      };
    }

    const raw = fs.readFileSync(DATA_FILE, "utf8") || "[]";
    const payments = JSON.parse(raw);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payments),
    };

  } catch (err) {
    console.error("getSepaPayments ERROR:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Impossible de lire les paiements SEPA" }),
    };
  }
};

