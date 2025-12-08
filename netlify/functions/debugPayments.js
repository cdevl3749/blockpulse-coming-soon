const fs = require("fs");
const path = require("path");

const DATA_DIR =
  process.env.PAYMENTS_DATA_DIR || path.join("/tmp", "blockpulse-data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

exports.handler = async () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ exists: false, payments: [] }),
      };
    }

    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const payments = JSON.parse(raw || "[]");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exists: true,
        count: payments.length,
        payments,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "read error", details: err.message }),
    };
  }
};
