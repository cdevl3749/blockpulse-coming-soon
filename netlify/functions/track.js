import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "netlify", "data", "stats.json");

export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const data = await request.json();

  // lire stats
  let stats = JSON.parse(fs.readFileSync(filePath));

  if (data.type === "visit") {
    stats.visitors++;
  }

  if (data.type === "click_order") {
    stats.clickOrder++;
  }

  if (data.type === "stripe_start") {
    stats.stripeStart++;
  }

  // sauvegarder
  fs.writeFileSync(filePath, JSON.stringify(stats));

  return new Response(
    JSON.stringify({
      ok: true,
      stats
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};