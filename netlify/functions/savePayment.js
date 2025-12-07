const fs = require("fs");
const path = require("path");

// Dossier PERSISTANT Netlify (autorisé)
const dataDir = "/tmp/blockpulse";
const filePath = path.join(dataDir, "payments.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
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

    // Création du dossier si absent
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Charger fichier existant
    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        existing = JSON.parse(raw);
      }
    }

    // Ajouter nouvelle entrée
    existing.push({
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      paid: false, // tu valideras sur ton dashboard
      createdAt: new Date().toISOString(),
    });

    // Sauvegarde
    fs.writeFileSync(
      filePath,
      JSON.stringify(existing, null, 2),
      "utf8"
    );

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






