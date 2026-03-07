import fs from "fs";

const FILE = "/tmp/blockpulse_stats.json";

export default async () => {

  let stats = {
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0
  };

  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    stats = JSON.parse(raw);
  }

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });
};