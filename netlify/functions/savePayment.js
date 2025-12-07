const { kv } = require("@netlify/kv");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, packId, packLabel, units, mode } = body;

    if (!name || !email || !packId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing fields" }),
      };
    }

    const newPayment = {
      name,
      email,
      packId,
      packLabel: packLabel || null,
      units: units || null,
      mode: mode || "sepa",
      createdAt: new Date().toISOString(),
      paid: false,
      paidAt: null,
    };

    let list = (await kv.get("sepa_payments")) || [];
    list.push(newPayment);

    await kv.set("sepa_payments", list);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, payment: newPayment }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
};









