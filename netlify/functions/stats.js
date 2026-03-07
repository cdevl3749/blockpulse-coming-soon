import { stats } from "./track.js";

export default async () => {

  return new Response(
    JSON.stringify(stats),
    { headers: { "Content-Type": "application/json" } }
  );
};