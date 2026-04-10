import { getStore } from "@netlify/blobs";

const DEFAULT_STATS = {
  visitors: 0,
  clicks: 0,
  stripe: 0,
  payments: 0,
  countries: {},
  paymentSessions: {},
  blogLikes: 0, // 🔥 AJOUT
};

async function loadStats(store) {
  try {
    const data = await store.get("stats", { type: "json" });
    if (!data) return { ...DEFAULT_STATS };
    return {
      ...DEFAULT_STATS,
      ...data,
      countries: data.countries || {},
      paymentSessions: data.paymentSessions || {},
      blogLikes: data.blogLikes || 0, // 🔥 AJOUT SÉCURITÉ
    };
  } catch (err) {
    console.log("Load stats error:", err);
    return { ...DEFAULT_STATS };
  }
}

async function saveStats(store, stats) {
  try {
    await store.set("stats", JSON.stringify(stats));
    return true;
  } catch (err) {
    console.log("Save stats error:", err);
    return false;
  }
}

export async function handler(event) {
  const method = event.httpMethod;
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };

  let store;

  try {
    store = getStore({
      name: "blockpulse",
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });
  } catch (err) {
    console.log("getStore error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Store init failed",
        message: err.message,
      }),
    };
  }

  try {
    // =========================
    // GET => lire les stats
    // =========================
    if (method === "GET") {
      const stats = await loadStats(store);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stats),
      };
    }

    // =========================
    // POST => enregistrer un event
    // =========================
    if (method === "POST") {
      const body = JSON.parse(event.body || "{}");
      const stats = await loadStats(store);

      console.log("Incoming event:", body);

      // 1) VISIT
      if (body.type === "visit") {
        stats.visitors++;

        if (body.country) {
          stats.countries[body.country] =
            (stats.countries[body.country] || 0) + 1;
        }
      }

      // 2) CLICK CTA
      if (body.type === "click") {
        stats.clicks++;
      }

      // 3) STRIPE START
      if (body.type === "stripe" || body.type === "stripe_start") {
        stats.stripe++;
      }

      // 4) PAYMENT SUCCESS (dédup session)
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

      // 🔥 5) BLOG LIKE (NOUVEAU)
      if (body.type === "blog_like") {
        stats.blogLikes = (stats.blogLikes || 0) + 1;
      }

      const saved = await saveStats(store, stats);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          saved,
          stats,
        }),
      };
    }

    // =========================
    // DELETE => reset
    // =========================
    if (method === "DELETE") {
      const saved = await saveStats(store, { ...DEFAULT_STATS });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reset: true,
          saved,
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    console.log("Handler fatal error:", err);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal error",
        message: err.message,
      }),
    };
  }
}