// netlify/functions/status.js
// Version sécurisée + optimisée crédits
// 🔒 ESP32 POST inchangé
// ⚡ GET avec cache navigateur/CDN

let lastStatus = { error: "No data yet" };

// Timestamp de la dernière mise à jour ESP32
let lastUpdate = 0;

// Durée de cache GET (ms)
const CACHE_TTL = 60 * 1000; // 60 secondes

exports.handler = async (event) => {
  /* ================== ESP32 → POST ================== */
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      // 🟢 ON NE CHANGE RIEN ICI
      lastStatus = data;
      lastUpdate = Date.now();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Received",
          data,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid JSON",
          details: e.toString(),
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
    }
  }

  /* ================== SITE → GET ================== */

  const now = Date.now();
  const age = now - lastUpdate;

  return {
    statusCode: 200,
    body: JSON.stringify(lastStatus),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",

      // 🔑 LA CLÉ POUR LES CRÉDITS
      // Cache navigateur + CDN Netlify
      "Cache-Control": `public, max-age=${Math.floor(
        CACHE_TTL / 1000
      )}, stale-while-revalidate=30`,

      // Info utile pour debug
      "X-Status-Age": age,
    },
  };
};



