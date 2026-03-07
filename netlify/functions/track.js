let stats = {
  visitors: 0,
  clickOrder: 0,
  stripeStart: 0
};

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const data = await request.json();

  if (data.type === "visit") {
    stats.visitors++;
  }

  if (data.type === "click_order") {
    stats.clickOrder++;
  }

  if (data.type === "stripe_start") {
    stats.stripeStart++;
  }

  return new Response(
    JSON.stringify({
      ok: true,
      stats
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};