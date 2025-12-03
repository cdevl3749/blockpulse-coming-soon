let lastStatus = { error: "No data yet" };

export async function handler(event, context) {
    // ESP32 → POST Les données ici
    if (event.httpMethod === "POST") {
        try {
            const data = JSON.parse(event.body);
            lastStatus = data;
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Received", data }),
            };
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid JSON", details: e.toString() }),
            };
        }
    }

    // Site → GET pour récupérer les données
    return {
        statusCode: 200,
        body: JSON.stringify(lastStatus),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    };
}

