export default async (request) => {

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const data = await request.json();

  console.log("BLOCKPULSE EVENT:", data.type, data.product || "");

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { "Content-Type": "application/json" } }
  );
};