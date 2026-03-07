import { getStore } from "@netlify/blobs";

export default async () => {

  const store = getStore("stats");

  let stats = await store.get("data", { type: "json" });

  if (!stats) {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0
    };
  }

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });
};