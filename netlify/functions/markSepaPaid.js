const { kv } = require("@netlify/kv");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, createdAt } = JSON.parse(event.body);

    let list = (await kv.get("sepa_payments")) || [];

    const index = list.findIndex(
      (p) => p.name === name && p.email === email && p.createdAt === createdAt
    );

    if (index === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Payment not found" }),
      };
    }

    list[index].paid = true;
    list[index].paidAt = new Date().toISOString();

    await kv.set("sepa_payments", list);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        paidAt: list[index].paidAt,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
};


