import fs from "fs";

const filePath = "/tmp/blockpulse-stats.json";

export default async () => {

  try {
    const data = fs.readFileSync(filePath);
    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(
      JSON.stringify({
        visitors: 0,
        clickOrder: 0,
        stripeStart: 0
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};