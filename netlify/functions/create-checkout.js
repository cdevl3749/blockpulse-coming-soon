import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // ✅ Déterminer le produit
    const product = body.product || "standard";

    // ✅ Prix Stripe selon le produit
    let priceId;

    if (product === "lite") {
      priceId = process.env.STRIPE_PRICE_LITE_ID; // 39 €
    } else {
      priceId = process.env.STRIPE_PRICE_ID; // 69 €
    }

    // ✅ Coupon TikTok
    const promoCode =
      body.promo === "TIKTOK15"
        ? process.env.STRIPE_TIKTOK_COUPON_ID
        : null;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: promoCode ? [{ coupon: promoCode }] : [],
      success_url: `${process.env.CLIENT_URL}/paiement/success`,
      cancel_url: `${process.env.CLIENT_URL}/paiement/cancel`,
    });

    // 📊 TRACKING : Stripe Start
    try {
      await fetch(`${process.env.CLIENT_URL}/.netlify/functions/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "stripe_start"
        })
      });
    } catch (err) {
      console.log("Tracking stripe_start failed:", err);
    }

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