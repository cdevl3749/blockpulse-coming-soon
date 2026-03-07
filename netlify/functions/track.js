import { getStore } from "@netlify/blobs";

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();

  const store = getStore("stats");

  let stats = await store.get("data", { type: "json" });

  if (!stats) {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0
    };
  }

  if (body.type === "visit") stats.visitors++;
  if (body.type === "click_order") stats.clickOrder++;
  if (body.type === "stripe_start") stats.stripeStart++;

  await store.set("data", stats);

  return new Response(JSON.stringify({ ok: true, stats }), {
    headers: { "Content-Type": "application/json" }
  });
};