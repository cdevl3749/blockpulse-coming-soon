import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const promoCode =
      body.promo === "TIKTOK15"
        ? process.env.STRIPE_TIKTOK_COUPON_ID
        : null;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      discounts: promoCode
        ? [{ coupon: promoCode }]
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


