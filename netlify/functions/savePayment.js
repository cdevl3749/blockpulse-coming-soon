import { getStore } from "@netlify/blobs";

export async function handler(event) {
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

    // Ouvre ou crée un store Blobs nommé "payments"
    const store = getStore("payments");

    // Récupère les paiements existants
    let existing = [];
    const raw = await store.get("list", { type: "json" });
    if (raw) existing = raw;

    // Ajoute un nouvel enregistrement
    existing.push({
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
    });

    // Sauvegarde dans Netlify Blobs
    await store.set("list", JSON.stringify(existing), {
      access: "public",
      type: "json",
    });

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
}




