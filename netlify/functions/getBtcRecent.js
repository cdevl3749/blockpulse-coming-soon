import fetch from "node-fetch";

export const handler = async () => {
  const btcAddress = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY"; // Ton adresse BTC
  const since = new Date("2025-12-01T00:00:00Z").getTime() / 1000; // timestamp

  try {
    const res = await fetch(
      `https://blockchain.info/rawaddr/${btcAddress}?cors=true`
    );
    const data = await res.json();

    const recentTx = data.txs.filter(tx => tx.time >= since);

    let total = 0;
    if (recentTx.length > 0) {
      recentTx.forEach(tx => {
        tx.out.forEach(o => {
          if (o.addr === btcAddress) total += o.value; 
        });
      });
    }

    const totalBTC = total / 1e8;
    const btcPriceRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/EUR.json");
    const btcPrice = (await btcPriceRes.json()).bpi.EUR.rate_float;

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: recentTx.length,
        totalBTC,
        totalEUR: totalBTC * btcPrice,
        lastTx: recentTx[0]?.time ?? null,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: "BTC error: " + err.message };
  }
};
