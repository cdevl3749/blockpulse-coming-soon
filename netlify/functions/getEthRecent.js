import fetch from "node-fetch";

export const handler = async () => {
  const ETH_ADDRESS = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";
  const ONE_DECEMBER_2025 = new Date("2025-12-01").getTime();

  try {
    const url = `https://eth.blockscout.com/api/v2/addresses/${ETH_ADDRESS}/transactions?filter=to&limit=100`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Échec API Blockscout");
    }

    const data = await response.json();

    if (!data || !data.items) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          recentTransactions: 0,
          totalReceivedETH: 0,
          message: "Aucune donnée disponible ou adresse introuvable."
        })
      };
    }

    // Filtrer transactions depuis le 1 déc 2025
    const recent = data.items.filter(tx => {
      const timestamp = new Date(tx.timestamp).getTime();
      return timestamp >= ONE_DECEMBER_2025;
    });

    const totalReceived = recent.reduce((sum, tx) => {
      if (tx.to?.hash?.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
        return sum + Number(tx.value || 0);
      }
      return sum;
    }, 0);

    return {
      statusCode: 200,
      body: JSON.stringify({
        recentTransactions: recent.length,
        totalReceivedETH: totalReceived / 1e18
      })
    };

  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        recentTransactions: 0,
        totalReceivedETH: 0,
        message: "Aucune donnée récente (API ETH indisponible ou timeout)",
        error: err.message
      })
    };
  }
};
