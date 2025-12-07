const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../../data/payments.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Méthode non autorisée",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email || !packId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Champs manquants" }),
      };
    }

    let payments = [];

    if (fs.existsSync(dataFile)) {
      payments = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    }

    const newPayment = {
      name,
      email,
      packId,
      packLabel,
      units: units || 1,
      mode: mode || "sepa",
      createdAt: new Date().toISOString(),
      paid: false,
      paidAt: null,
    };

    payments.push(newPayment);

    fs.writeFileSync(dataFile, JSON.stringify(payments, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    console.error("savePayment error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};









