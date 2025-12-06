import fetch from "node-fetch";

export const handler = async () => {
  const ethAddress = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167"; // Ton adresse ETH

  const since = 1764547200; // timestamp du 1er décembre 2025

  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&sort=desc`
    );
    const data = await res.json();

    const txs = data.result;
    const recentTx = txs.filter(tx => Number(tx.timeStamp) >= since);

    let totalWei = 0;
    recentTx.forEach(tx => {
      if (tx.to.toLowerCase() === ethAddress.toLowerCase()) {
        totalWei += Number(tx.value);
      }
    });

    const totalETH = totalWei / 1e18;

    const priceRes = await fetch("https://api.coinbase.com/v2/prices/ETH-EUR/spot");
    const ethPrice = Number(priceRes.data?.amount ?? 0);

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: recentTx.length,
        totalETH,
        totalEUR: totalETH * ethPrice,
        lastTx: recentTx[0]?.timeStamp ?? null,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: "ETH error: " + err.message };
  }
};
