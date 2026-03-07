import { getStore } from "@netlify/blobs";

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const data = await request.json();

  const store = getStore("blockpulse");

  let stats = await store.get("stats", { type: "json" });

  if (!stats) {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0
    };
  }

  // 👇 RESET DES STATS
  if (data.type === "reset") {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0
    };
  }

  // 👇 TRACKING NORMAL
  if (data.type === "visit") stats.visitors++;
  if (data.type === "click_order") stats.clickOrder++;
  if (data.type === "stripe_start") stats.stripeStart++;

  // 👇 SAUVEGARDE
  await store.set("stats", JSON.stringify(stats));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};