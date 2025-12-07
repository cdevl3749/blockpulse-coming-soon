import { kv } from "@netlify/kv";

export default async function handler() {
  try {
    const payments = (await kv.get("sepa_payments")) || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ payments }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}

