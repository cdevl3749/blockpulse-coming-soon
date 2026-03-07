import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "netlify/data/stats.json");

export default async () => {

  const stats = JSON.parse(fs.readFileSync(file));

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });
};