export default async () => {

  const stats = global.stats || {
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0
  };

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" }
  });
};