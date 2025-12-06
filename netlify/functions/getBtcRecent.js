import fetch from "node-fetch";

export const handler = async () => {
  const BTC_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
  const ONE_DECEMBER_2025 = new Date("2025-12-01").getTime();

  try {
    const res = await fetch(`https://blockstream.info/api/address/${BTC_ADDRESS}`);
    const data = await res.json();

    // Si l'API retourne null → renvoyer une réponse propre
    if (!data || !data.chain_stats) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          recentTransactions: 0,
          totalReceived: 0,
          message: "Aucune transaction ou adresse introuvable."
        })
      };
    }

    const txs = data?.txs || [];

    const recent = txs.filter(tx => {
      const timestamp = tx.status?.block_time * 1000;
      return timestamp && timestamp >= ONE_DECEMBER_2025;
    });

    const totalReceived = recent.reduce((sum, tx) => {
      const received = tx.vout?.reduce((sub, out) => {
        return out.scriptpubkey_address === BTC_ADDRESS ? sub + out.value : sub;
      }, 0) || 0;

      return sum + received;
    }, 0);

    return {
      statusCode: 200,
      body: JSON.stringify({
        recentTransactions: recent.length,
        totalReceivedBTC: totalReceived / 100000000
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
