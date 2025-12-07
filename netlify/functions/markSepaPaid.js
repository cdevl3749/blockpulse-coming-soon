const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/payments.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  try {
    const { name, email, createdAt } = JSON.parse(event.body);

    let payments = [];
    if (fs.existsSync(DATA_FILE)) {
      payments = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const index = payments.findIndex(
      (p) => p.name === name && p.email === email && p.createdAt === createdAt
    );

    if (index === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Paiement introuvable" }),
      };
    }

    payments[index].paid = true;
    payments[index].paidAt = new Date().toISOString();

    fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, paidAt: payments[index].paidAt }),
    };
  } catch (err) {
    console.error("Erreur markSepaPaid:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};

