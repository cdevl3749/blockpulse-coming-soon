exports.handler = async () => {
  const ADDRESS = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";
  const URL =
    `https://api.etherscan.io/api?module=account&action=txlist&address=${ADDRESS}&offset=200&sort=desc`;

  try {
    const res = await fetch(URL);
    const json = await res.json();

    if (json.status !== "1") {
      throw new Error("Erreur API ETH");
    }

    const DECEMBER_1 = 1753929600;

    const recent = json.result.filter(
      tx => Number(tx.timeStamp) > DECEMBER_1 && tx.to.toLowerCase() === ADDRESS.toLowerCase()
    );

    const totalETH = recent.reduce(
      (sum, tx) => sum + Number(tx.value) / 1e18,
      0
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: recent.length,
        totalETH,
        totalEUR: totalETH * 3500,
        lastTx: recent[0] ? Number(recent[0].timeStamp) : null
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
