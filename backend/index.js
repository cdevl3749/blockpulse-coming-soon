import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = process.env.PORT || 4242;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⚠️ IMPORTANT : webhook AVANT express.json()
app.post(
  "/api/stripe-webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error("❌ Webhook signature error", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("✅ Paiement confirmé");
      console.log("Session ID:", session.id);
      console.log("Email client:", session.customer_details?.email);

      // 👉 ICI on enverra les emails (étape suivante)
    }

    res.json({ received: true });
  }
);

// JSON & CORS après
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "BlockPulse – Boîtier intelligent",
              description: "Offre Early Bird (-22%)",
            },
            unit_amount: 6900,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/paiement/cancel`,
      metadata: {
        product: "blockpulse",
        campaign: "early-bird",
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend Stripe: http://localhost:${PORT}`);
});

