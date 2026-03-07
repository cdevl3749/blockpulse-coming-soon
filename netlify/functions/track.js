import fs from "fs";
import path from "path";

const filePath = "/tmp/blockpulse-stats.json";

function readStats() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch {
    return {
      visitors: 0,
      clickOrder: 0,
      stripeStart: 0
    };
  }
}

function saveStats(stats) {
  fs.writeFileSync(filePath, JSON.stringify(stats));
}

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();
  let stats = readStats();

  if (body.type === "visit") stats.visitors++;
  if (body.type === "click_order") stats.clickOrder++;
  if (body.type === "stripe_start") stats.stripeStart++;

  saveStats(stats);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};