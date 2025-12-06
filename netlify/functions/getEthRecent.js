// netlify/functions/getEthRecent.js

const ETH_ADDRESS = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";
const SINCE_TIMESTAMP = Math.floor(
  new Date("2025-12-01T00:00:00Z").getTime() / 1000
);

export async function handler() {
  try {
    // 1) Appel à Blockscout pour l'historique des tx
    const apiUrl = `https://eth.blockscout.com/api?module=account&action=txlist&address=${ETH_ADDRESS}&sort=desc`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("API Blockscout indisponible");
    }

    const json = await res.json();
    if (json.status !== "1" || !Array.isArray(json.result)) {
      throw new Error("Réponse ETH inattendue");
    }

    const allTx = json.result;

    // 2) Transactions entrantes (to = ton adresse) depuis le 1 déc 2025
    const recentIncoming = allTx.filter((tx) => {
      const ts = Number(tx.timeStamp || "0");
      const to = (tx.to || "").toLowerCase();
      return ts >= SINCE_TIMESTAMP && to === ETH_ADDRESS.toLowerCase();
    });

    // 3) Total reçu en wei -> ETH
    let totalWei = 0n;
    for (const tx of recentIncoming) {
      try {
        totalWei += BigInt(tx.value || "0");
      } catch (e) {
        // ignore une tx malformée
      }
    }

    const totalETH = Number(totalWei) / 1e18;

    // 4) Récupérer prix ETH/EUR
    let eurPrice = null;
    try {
      const priceRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
      );
      if (priceRes.ok) {
        const priceJson = await priceRes.json();
        eurPrice = priceJson?.ethereum?.eur ?? null;
      }
    } catch (e) {
      // on laisse eurPrice = null si ça plante
    }

    const totalEUR =
      eurPrice != null ? Number((totalETH * eurPrice).toFixed(2)) : null;

    const lastTx =
      recentIncoming.length > 0
        ? Number(recentIncoming[0].timeStamp)
        : null;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        address: ETH_ADDRESS,
        since: SINCE_TIMESTAMP,
        count: recentIncoming.length,
        totalETH,
        totalEUR,
        lastTx,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: false,
        error: err.message || "Erreur API ETH",
        count: 0,
        totalETH: 0,
        totalEUR: null,
        lastTx: null,
      }),
    };
  }
}
