import { kv } from "@netlify/kv";

export default async function handler(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200 };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email || !packId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing required fields",
        }),
      };
    }

    const payment = {
      name,
      email,
      packId,
      packLabel,
      units,
      mode,
      createdAt: new Date().toISOString(),
      paid: false,
      paidAt: null,
    };

    // Lire la liste existante
    const existing = (await kv.get("sepa_payments")) || [];

    // Ajouter la nouvelle entrée
    existing.push(payment);

    // Sauvegarder
    await kv.set("sepa_payments", existing);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, payment }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}








