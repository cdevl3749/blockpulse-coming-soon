let stats = global.stats || {
  visitors: 0,
  clickOrder: 0,
  stripeStart: 0
};

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();

  if (body.type === "visit") stats.visitors++;
  if (body.type === "click_order") stats.clickOrder++;
  if (body.type === "stripe_start") stats.stripeStart++;

  global.stats = stats;

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};