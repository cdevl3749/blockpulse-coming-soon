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
    const { name, email, createdAt } = JSON.parse(event.body);

    let payments = [];

    if (fs.existsSync(dataFile)) {
      payments = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    }

    const i = payments.findIndex(
      (p) => p.name === name && p.email === email && p.createdAt === createdAt
    );

    if (i === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Paiement introuvable" }),
      };
    }

    payments[i].paid = true;
    payments[i].paidAt = new Date().toISOString();

    fs.writeFileSync(dataFile, JSON.stringify(payments, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        paidAt: payments[i].paidAt,
      }),
    };
  } catch (e) {
    console.error("markSepaPaid error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};


