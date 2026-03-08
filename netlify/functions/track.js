import { getStore } from "@netlify/blobs";

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 👇 BLOQUER LES BOTS
  const userAgent = request.headers.get("user-agent") || "";
  if (/bot|crawler|spider|preview/i.test(userAgent)) {
    return new Response(JSON.stringify({ ignored: "bot" }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  const data = await request.json();

  const store = getStore("blockpulse");

  let stats = await store.get("stats", { type: "json" });

  if (!stats) {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0,
      paymentSuccess: 0,
      countries: {},
      activeVisitors: 0,
      lastPing: 0
    };
  }

  // sécurité si ancienne structure
  if (!stats.countries) stats.countries = {};
  if (!stats.activeVisitors) stats.activeVisitors = 0;
  if (!stats.lastPing) stats.lastPing = 0;
  if (!stats.paymentSuccess) stats.paymentSuccess = 0;

  // 👇 RESET DES STATS
  if (data.type === "reset") {
    stats = {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0,
      paymentSuccess: 0,
      countries: {},
      activeVisitors: 0,
      lastPing: 0
    };
  }

  // 👇 DETECTER LE PAYS
  let country = "Unknown";

  const geo = request.headers.get("x-nf-geo");

  if (geo) {
    try {
      const geoData = JSON.parse(geo);
      country = geoData.country?.code || "Unknown";
    } catch {}
  }

  // fallback Cloudflare
  if (country === "Unknown") {
    const cfCountry = request.headers.get("cf-ipcountry");
    if (cfCountry) {
      country = cfCountry;
    }
  }

  // 👇 VISITE
  if (data.type === "visit") {

    stats.visitors++;

    if (!stats.countries[country]) {
      stats.countries[country] = 0;
    }

    stats.countries[country]++;
  }

  // 👇 PING VISITEUR ACTIF
  if (data.type === "active_ping") {
    stats.lastPing = Date.now();
  }

  // 👇 AUTRES EVENTS
  if (data.type === "click_order") stats.clickOrder++;
  if (data.type === "stripe_start") stats.stripeStart++;
  if (data.type === "payment_success") stats.paymentSuccess++;

  // 👇 CALCUL VISITEURS ACTIFS (30 sec)
  if (stats.lastPing && Date.now() - stats.lastPing < 30000) {
    stats.activeVisitors = 1;
  } else {
    stats.activeVisitors = 0;
  }

  // 👇 SAUVEGARDE
  await store.set("stats", JSON.stringify(stats));

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });
};