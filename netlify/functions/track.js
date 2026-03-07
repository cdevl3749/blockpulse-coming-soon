import fs from "fs";

const FILE = "/tmp/stats.json";

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const data = await request.json();

  // Charger stats existantes
  let stats = {
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0
  };

  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    stats = JSON.parse(raw);
  }

  // Incrémenter
  if (data.type === "visit") {
    stats.visitors++;
  }

  if (data.type === "click_order") {
    stats.clickOrder++;
  }

  if (data.type === "stripe_start") {
    stats.stripeStart++;
  }

  // Sauvegarder
  fs.writeFileSync(FILE, JSON.stringify(stats));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};