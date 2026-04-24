const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE"
];

const ALLOWED_SHIPPING_COUNTRIES = [
  ...EU_COUNTRIES,
  "GB",
  "US",
  "JP",
  "CA",
  "CH",
  "NO"
];

function getSafeLang(lang) {
  return ["fr", "de", "en"].includes(lang) ? lang : "fr";
}

function getSafeCountry(country) {
  if (!country || typeof country !== "string") return "BE";
  return country.toUpperCase();
}

function getStripeLocale(lang, country) {
  if (lang === "en" && country === "GB") return "en-GB";
  if (lang === "en") return "en";
  if (lang === "de") return "de";
  return "fr";
}

function getProductPriceId(product, country) {
  const isGB = country === "GB";

  if (product === "lite") {
    return isGB
      ? process.env.STRIPE_PRICE_LITE_GBP_ID
      : process.env.STRIPE_PRICE_LITE_ID;
  }

  return isGB
    ? process.env.STRIPE_PRICE_STANDARD_GBP_ID
    : process.env.STRIPE_PRICE_ID;
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const product = body.product === "lite" ? "lite" : "standard";
    const source = body.source || "direct";
    const promo = body.promo || null;
    const lang = getSafeLang(body.lang);
    const country = getSafeCountry(body.country);

    const priceId = getProductPriceId(product, country);

    if (!priceId) {
      console.error("❌ Missing Stripe price ID", { product, country });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Stripe price ID missing" }),
      };
    }

    const promoCode =
      promo === "TIKTOK15"
        ? process.env.STRIPE_TIKTOK_COUPON_ID
        : null;

    // ✅ BASE PRODUIT
    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    // ✅ OPTIONS
    if (body.options) {
      if (body.options.solar) {
        lineItems.push({
          price: "price_1TMav1Kn0lmTcQ115PNrqZk1", // 🔥 remplace ici
          quantity: 1,
        });
      }

      if (body.options.powerbank) {
        lineItems.push({
          price: "price_1TMaysKn0lmTcQ116adoUsEg", // 🔥 remplace ici
          quantity: 1,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: getStripeLocale(lang, country),

      line_items: lineItems,

      discounts: promoCode ? [{ coupon: promoCode }] : [],

      success_url: `${process.env.CLIENT_URL}/paiement/success?session_id={CHECKOUT_SESSION_ID}&lang=${lang}`,
      cancel_url: `${process.env.CLIENT_URL}/paiement/cancel?lang=${lang}`,

      billing_address_collection: "auto",

      shipping_address_collection: {
        allowed_countries: ALLOWED_SHIPPING_COUNTRIES,
      },

      metadata: {
        product,
        source,
        lang,
        country,
      },
    });

    try {
      await fetch(`${process.env.CLIENT_URL}/.netlify/functions/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "stripe_start",
          product,
          source,
          country,
        }),
      });
    } catch (err) {
      console.log("Tracking stripe_start failed:", err);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error("🔥 Stripe checkout error FULL:", {
      message: error.message,
      stack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};