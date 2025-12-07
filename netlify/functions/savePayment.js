import { put, list } from "@netlify/blobs";

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

    // 🔥 Le fichier "payments.json" dans les blobs Netlify
    const key = "payments.json";

    // On récupère l’existant
    let existing = [];
    const current = await list(); // liste des blobs

    if (current.blobs.includes(key)) {
      const url = await get(key);
      const json = await fetch(url).then((r) => r.json());
      existing = Array.isArray(json) ? json : [];
    }

    // On ajoute la nouvelle entrée
    existing.push({
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
    });

    // On réécrit le fichier complet dans les blobs
    await put(key, JSON.stringify(existing, null, 2), {
      contentType: "application/json",
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
};




