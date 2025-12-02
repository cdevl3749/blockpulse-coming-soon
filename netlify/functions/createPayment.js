// /netlify/functions/createPayment.js

// ⚠️ Ce fichier tourne côté serveur (Netlify Functions)
// Il ne touche PAS à ton ESP32 ni au temps réel.

// --- Config minimale backend (indépendante du front) ---
const UNIT_PRICE = 1.99;

const PACKS = [
  { id: 2, units: 3, label: "Actif", savings: null },
  { id: 3, units: 5, label: "Populaire", savings: 10 },
  { id: 4, units: 10, label: "Expert", savings: 15 },
  { id: 5, units: 100, label: "Whale", savings: 25 },
];

function getPackPrice(units, savings = null) {
  const basePrice = units * UNIT_PRICE;
  if (savings) {
    return (basePrice * (1 - savings / 100)).toFixed(2);
  }
  return basePrice.toFixed(2);
}

// Cryptos autorisées par pack
// 👉 BTC interdit pour le pack Actif (id=2)
const ALLOWED_FOR_PACK = {
  2: ["eth", "usdtbsc", "usdtsol", "usdtpolygon"], // Actif : SANS BTC
  3: ["btc", "eth", "usdtbsc", "usdtsol", "usdtpolygon"], // Populaire
  4: ["btc", "eth", "usdtbsc", "usdtsol", "usdtpolygon"], // Expert
  5: ["btc", "eth", "usdtbsc", "usdtsol", "usdtpolygon"], // Whale
};

exports.handler = async (event, context) => {
  try {
    // On n'accepte que POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Méthode non autorisée" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { packId, crypto } = body;

    if (!packId || !crypto) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "packId et crypto sont requis",
        }),
      };
    }

    // 1) Vérifier que le pack existe
    const pack = PACKS.find((p) => p.id === packId);
    if (!pack) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Pack introuvable" }),
      };
    }

    // 2) Vérifier que la crypto est autorisée pour ce pack
    const allowed = ALLOWED_FOR_PACK[packId] || [];
    if (!allowed.includes(crypto)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Crypto non autorisée pour ce pack",
        }),
      };
    }

    // 3) Calcul du montant
    const price = parseFloat(getPackPrice(pack.units, pack.savings));

    // 4) Récupérer la clé NOWPayments depuis Netlify
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "NOWPAYMENTS_API_KEY manquante côté serveur",
        }),
      };
    }

    // 5) Appel à l'API NOWPayments pour créer une facture
    // Netlify utilise Node 18+ => fetch disponible nativement
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: price,
        price_currency: "eur",
        pay_currency: crypto, // 👉 crypto imposée ici
        order_id: `pack_${packId}_${Date.now()}`,
        success_url: "https://blockpulse.be/success",
        cancel_url: "https://blockpulse.be/cancel",
      }),
    });

    const json = await response.json();

    if (!response.ok || !json.invoice_url) {
      console.error("Erreur NOWPayments:", json);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Erreur création facture",
          details: json,
        }),
      };
    }

    // 6) On retourne uniquement l'URL finale au front
    return {
      statusCode: 200,
      body: JSON.stringify({ url: json.invoice_url }),
    };
  } catch (err) {
    console.error("Erreur createPayment:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
