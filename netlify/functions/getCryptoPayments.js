// /netlify/functions/getCryptoPayments.js

import fetch from "node-fetch";

export const handler = async () => {
  try {
    const BTC_ADDR = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
    const ETH_ADDR = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";

    const fromTimestamp = Math.floor(new Date("2025-12-01").getTime() / 1000);

    // ============================
    // 1. BTC via Blockstream
    // ============================
    const btcTxs = await fetch(`https://blockstream.info/api/address/${BTC_ADDR}/txs`).then(r => r.json());

    const filteredBTC = btcTxs
      .filter(tx => tx.status.block_time >= fromTimestamp)
      .map(tx => ({
        hash: tx.txid,
        date: tx.status.block_time * 1000,
        amount: tx.vout
          .filter(v => v.scriptpubkey_address === BTC_ADDR)
          .reduce((sum, v) => sum + v.value, 0) / 1e8,
        explorer: `https://blockstream.info/tx/${tx.txid}`,
        crypto: "BTC"
      }));

    // ============================
    // 2. ETH via Blockscout
    // ============================
    const ethResult = await fetch(
      `https://eth.blockscout.com/api?module=account&action=txlist&address=${ETH_ADDR}`
    ).then(r => r.json());

    const filteredETH = ethResult.result
      .filter(tx => Number(tx.timeStamp) >= fromTimestamp)
      .map(tx => ({
        hash: tx.hash,
        date: Number(tx.timeStamp) * 1000,
        amount: Number(tx.value) / 1e18,
        explorer: `https://etherscan.io/tx/${tx.hash}`,
        crypto: "ETH",
        direction: tx.to?.toLowerCase() === ETH_ADDR.toLowerCase() ? "IN" : "OUT"
      }))
      .filter(tx => tx.direction === "IN"); // on garde que ce que TU reçois

    // ============================
    // 3. Prix EUR live (CoinGecko)
    // ============================
    const prices = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur"
    ).then(r => r.json());

    const btcPrice = prices.bitcoin.eur;
    const ethPrice = prices.ethereum.eur;

    const btcWithEur = filteredBTC.map(t => ({
      ...t,
      amountEUR: t.amount * btcPrice
    }));

    const ethWithEur = filteredETH.map(t => ({
      ...t,
      amountEUR: t.amount * ethPrice
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        btc: btcWithEur,
        eth: ethWithEur
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
