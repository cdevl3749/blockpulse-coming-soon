import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "netlify/data/stats.json");

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();
  const stats = JSON.parse(fs.readFileSync(file));

  if (body.type === "visit") stats.visitors++;
  if (body.type === "click_order") stats.clickOrder++;
  if (body.type === "stripe_start") stats.stripeStart++;

  fs.writeFileSync(file, JSON.stringify(stats));

  return new Response(JSON.stringify({ ok: true, stats }), {
    headers: { "Content-Type": "application/json" }
  });
};