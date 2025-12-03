let lastStatus = { error: "No data yet" };

export async function handler(event, context) {
  // ESP32 envoie les données ici (POST)
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      lastStatus = data;
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Received", data })
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON", details: e.toString() })
      };
    }
  }

  // Le site récupère les données ici (GET)
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lastStatus)
  };
}
