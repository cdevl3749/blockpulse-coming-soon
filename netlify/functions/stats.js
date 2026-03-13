import { getStore } from "@netlify/blobs";

export default async () => {

  const store = getStore("blockpulse");

  let stats = await store.get("stats", { type: "json" });

  if (!stats) {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0,
      paymentSuccess: 0,
      lastClickCountry: null,
      lastStripeCountry: null,
      countries: {},
      activeVisitors: 0,
      sources: {
        reddit: 0,
        tiktok: 0,
        direct: 0
      }
    };
  }

  // sécurité si anciennes stats sans ces champs
  stats.lastClickCountry = stats.lastClickCountry || null;
  stats.lastStripeCountry = stats.lastStripeCountry || null;

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });

};