export default async () => {
  return new Response(
    JSON.stringify({
      message: "BlockPulse function OK"
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};