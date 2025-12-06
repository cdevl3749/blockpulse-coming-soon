// netlify/functions/getBtcRecent.js

const BTC_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
// Transactions depuis le 1 décembre 2025
const SINCE_TIMESTAMP = Math.floor(
  new Date("2025-12-01T00:00:00Z").getTime() / 1000
);

export async function handler() {
  try {
    // 1) Récupérer les tx de l'adresse (dernières pages, suffisant pour ton usage)
    const txRes = await fetch(
      `https://blockstream.info/api/address/${BTC_ADDRESS}/txs`
    );

    if (!txRes.ok) {
      throw new Error("API Blockstream indisponible");
    }

    const txs = await txRes.json();
    if (!Array.isArray(txs)) {
      throw new Error("Réponse BTC inattendue");
    }

    // 2) Filtrer les tx où ton adresse reçoit des BTC
    const incoming = txs.filter((tx) =>
      (tx.vout || []).some(
        (out) => out.scriptpubkey_address === BTC_ADDRESS
      )
    );

    // 3) Garder seulement celles après le 1er déc 2025
    const recent = incoming.filter((tx) => {
      const t = tx.status?.block_time;
      return typeof t === "number" && t >= SINCE_TIMESTAMP;
    });

    // 4) Calculer le total reçu en sats -> BTC
    let totalSats = 0;
    for (const tx of recent) {
      for (const out of tx.vout || []) {
        if (out.scriptpubkey_address === BTC_ADDRESS) {
          totalSats += out.value || 0;
        }
      }
    }
    const totalBTC = totalSats / 1e8;

    // 5) Récupérer le prix BTC/EUR (CoinGecko)
    let eurPrice = null;
    try {
      const priceRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
      );
      if (priceRes.ok) {
        const priceJson = await priceRes.json();
        eurPrice = priceJson?.bitcoin?.eur ?? null;
      }
    } catch (e) {
      // si l'API prix plante, on laisse eurPrice = null
    }

    const totalEUR =
      eurPrice != null ? Number((totalBTC * eurPrice).toFixed(2)) : null;

    const lastTx =
      recent.length > 0 ? recent[0].status?.block_time ?? null : null;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        address: BTC_ADDRESS,
        since: SINCE_TIMESTAMP,
        count: recent.length,
        totalBTC,
        totalEUR,
        lastTx,
      }),
    };
  } catch (err) {
    // ⚠️ On renvoie QUAND MÊME 200 pour éviter un 502
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: false,
        error: err.message || "Erreur API BTC",
        count: 0,
        totalBTC: 0,
        totalEUR: null,
        lastTx: null,
      }),
    };
  }
}
