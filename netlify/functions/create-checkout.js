import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    // Lire les données envoyées depuis le site (optionnelles)
    const body = JSON.parse(event.body || "{}");
    const promo = body.promo;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      // ✅ Promo TikTok automatique (sans champ client)
      discounts:
        promo === "TIKTOK15"
          ? [{ coupon: "TIKTOK15" }]
          : [],

      success_url: `${process.env.CLIENT_URL}/paiement/success`,
      cancel_url: `${process.env.CLIENT_URL}/paiement/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
