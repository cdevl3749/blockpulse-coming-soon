const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const dataDir = path.join(__dirname, "data");
    const filePath = path.join(dataDir, "payments.json");

    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ payments: [] }),
      };
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const all = raw.trim() ? JSON.parse(raw) : [];

    // On ne garde que les paiements SEPA
    const sepaOnly = all.filter((p) => p.mode === "sepa");

    return {
      statusCode: 200,
      body: JSON.stringify({ payments: sepaOnly }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    console.error("getSepaPayments error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
