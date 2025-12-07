import { kv } from "@netlify/kv";

export default async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, createdAt } = body;

    const payments = (await kv.get("sepa_payments")) || [];

    const index = payments.findIndex(
      (p) => p.name === name && p.email === email && p.createdAt === createdAt
    );

    if (index === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Payment not found" }),
      };
    }

    payments[index].paid = true;
    payments[index].paidAt = new Date().toISOString();

    await kv.set("sepa_payments", payments);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, paidAt: payments[index].paidAt }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}


