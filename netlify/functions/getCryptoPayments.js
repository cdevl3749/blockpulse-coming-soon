// netlify/functions/getCryptoPayments.js
// Stub sécurisé : à compléter si tu veux brancher NOWPayments ou autre plus tard.

export async function handler() {
  try {
    // Ici tu pourras plus tard appeler ton prestataire de paiement
    // (NOWPayments, BTCPay Server, etc.) en utilisant des variables
    // d'environnement (process.env.MA_CLE_API).

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        source: "stub",
        message:
          "Aucune intégration de paiement en direct configurée pour le moment.",
        payments: [],
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: false,
        error: err.message || "Erreur getCryptoPayments",
        payments: [],
      }),
    };
  }
}