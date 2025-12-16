// netlify/functions/status.js

let lastStatus = { error: "No data yet" };

exports.handler = async (event, context) => {
  // 🟢 ESP32 → POST les données
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      // 🔒 ON FAIT EXACTEMENT COMME AVANT
      // On stocke TOUT ce que l'ESP32 envoie
      lastStatus = data;

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

  // 🔵 SITE → GET les données (relay brut)
  return {
    statusCode: 200,
    body: JSON.stringify(lastStatus),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  };
};



