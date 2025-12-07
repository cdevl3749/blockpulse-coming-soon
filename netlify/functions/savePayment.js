import { NetlifyBlobs } from "@netlify/blobs";

export const handler = async (event) => {
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

    const blobs = new NetlifyBlobs({ token: process.env.NETLIFY_BLOBS_TOKEN });
    const store = blobs.store("payments-store");

    // Récupérer les anciens paiements
    const existingRaw = await store.get("payments.json");
    let payments = existingRaw ? JSON.parse(existingRaw) : [];

    // Ajouter le nouveau paiement
    payments.push({
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
    });

    // Sauvegarder
    await store.set("payments.json", JSON.stringify(payments));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    console.error("savePayment error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};




