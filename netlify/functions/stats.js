import { getStore } from "@netlify/blobs";

export async function handler(event) {
  let store;
  let stats;

  try {
    store = getStore("blockpulse");
    stats = await store.get("stats", { type: "json" });
  } catch (err) {
    console.log("Blobs error:", err);
  }

  // 👉 fallback si erreur ou vide
  if (!stats) {
    stats = {
      visitors: 0,
      clicks: 0,
      stripe: 0,
      payments: 0,
      countries: {},
      paymentSessions: {},
    };
  }

  const method = event.httpMethod;

  try {
    // 👉 GET
    if (method === "GET") {
      return {
        statusCode: 200,
        body: JSON.stringify(stats),
      };
    }

    // 👉 POST
    if (method === "POST") {
      const body = JSON.parse(event.body || "{}");

      if (body.type === "visit") stats.visitors++;
      if (body.type === "click") stats.clicks++;
      if (body.type === "stripe" || body.type === "stripe_start") stats.stripe++;

      if (body.type === "payment_success") {
        const sessionId = body.session_id;

        if (sessionId) {
          if (!stats.paymentSessions[sessionId]) {
            stats.paymentSessions[sessionId] = true;
            stats.payments++;
          }
        } else {
          stats.payments++;
        }
      }

      if (body.country) {
        stats.countries[body.country] =
          (stats.countries[body.country] || 0) + 1;
      }

      // 👉 sauvegarde (protégée)
      try {
        if (store) {
          await store.set("stats", JSON.stringify(stats));
        }
      } catch (err) {
        console.log("Save error:", err);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    }

    // 👉 RESET
    if (method === "DELETE") {
      stats = {
        visitors: 0,
        clicks: 0,
        stripe: 0,
        payments: 0,
        countries: {},
        paymentSessions: {},
      };

      try {
        if (store) {
          await store.set("stats", JSON.stringify(stats));
        }
      } catch (err) {
        console.log("Reset save error:", err);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ reset: true }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal error",
        message: err.message,
      }),
    };
  }
}