exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Nom ou email manquant" }),
      };
    }

    // Pour l'instant : on log simplement la demande côté serveur
    console.log("📩 Nouvelle demande de participation :", {
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
    });

    // Tu pourras venir lire ça dans :
    // Netlify -> Site -> Functions -> savePayment -> Logs

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    console.error("Erreur savePayment:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur" }),
    };
  }
};


