const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/payments.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
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

    // Lire fichier
    let payments = [];
    if (fs.existsSync(DATA_FILE)) {
      payments = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const newPayment = {
      name,
      email,
      packId,
      packLabel: packLabel || "",
      units: units || 1,
      mode: mode || "sepa",
      createdAt: new Date().toISOString(),
      paid: false,
      paidAt: null,
    };

    payments.push(newPayment);

    // Sauvegarde
    fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("Erreur savePayment:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};








