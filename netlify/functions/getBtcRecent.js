exports.handler = async () => {
  const ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
  const URL =
    `https://api.blockchair.com/bitcoin/dashboards/address/${ADDRESS}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    const txs = data.data[ADDRESS].transactions;

    const DECEMBER_1 = 1753929600; // timestamp
    const recent = txs.filter(tx => tx.time > DECEMBER_1);

    const totalBTC = recent.reduce(
      (sum, tx) => sum + tx.value / 1e8,
      0
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: recent.length,
        totalBTC,
        totalEUR: totalBTC * 75000,
        lastTx: recent[0] ? recent[0].time : null
      })
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
