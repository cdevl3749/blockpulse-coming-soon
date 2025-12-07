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
    const { name, email, createdAt } = body;

    if (!name || !email || !createdAt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing name, email or createdAt" }),
      };
    }

    const dataDir = path.join(__dirname, "data");
    const filePath = path.join(dataDir, "payments.json");

    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "payments.json not found" }),
      };
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const all = raw.trim() ? JSON.parse(raw) : [];

    let updated = false;
    const now = new Date().toISOString();

    const updatedList = all.map((p) => {
      if (
        p.name === name &&
        p.email === email &&
        p.createdAt === createdAt
      ) {
        updated = true;
        return {
          ...p,
          paid: true,
          paidAt: now,
        };
      }
      return p;
    });

    if (!updated) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Payment not found" }),
      };
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedList, null, 2), "utf8");

    // 👉 Ici on pourrait ajouter un envoi d’email automatique
    // à toi + à l’utilisateur (via Resend, Mailjet, etc.)
    // Pour éviter de t’ajouter des clés API maintenant,
    // je laisse ça pour une prochaine étape.

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, paidAt: now }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    console.error("markSepaPaid error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
