let stats = {
  visitors: 0,
  clicks: 0,
  stripe: 0,
  payments: 0,
  countries: {},
  paymentSessions: {},
};

export async function handler(event) {
  const method = event.httpMethod;

  // 👉 GET = récupérer les stats
  if (method === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
  }

  // 👉 POST = ajouter une action
  if (method === "POST") {
    const body = JSON.parse(event.body || "{}");

    if (body.type === "visit") {
      stats.visitors++;
    }

    if (body.type === "click") {
      stats.clicks++;
    }

    if (body.type === "stripe" || body.type === "stripe_start") {
      stats.stripe++;
    }

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

    return {
      statusCode: 200,
      body: JSON.stringify({ reset: true }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
}