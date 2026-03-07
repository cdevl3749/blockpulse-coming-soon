let stats = {
  visitors: 0,
  clickOrder: 0,
  stripeStart: 0
};

export default async () => {
  return new Response(
    JSON.stringify(stats),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};