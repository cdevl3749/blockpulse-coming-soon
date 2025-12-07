const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing name or email" }),
      };
    }

    // 📌 Chemin vers /data/payments.json (racine du projet)
    const filePath = path.join(process.cwd(), "data", "payments.json");

    // 📁 Si dossier data manque, on le crée
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // 📄 Charger/Créer le fichier JSON
    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        existing = JSON.parse(raw);
      }
    }

    // ➕ Ajouter une entrée
    existing.push({
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
      paid: false,
    });

    // 💾 Écrire les données
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("savePayment error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};








