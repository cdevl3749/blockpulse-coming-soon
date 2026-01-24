import Stripe from "stripe";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1StEzZKn0lmTcQ1137VPU79J",
          quantity: 1,
        },
      ],
      success_url: "https://blockpulse.be/payment-success",
      cancel_url: "https://blockpulse.be/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log("Stripe backend running"));
