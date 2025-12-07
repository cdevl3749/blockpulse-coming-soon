let lastStatus = { error: "No data yet" };

// Netlify Functions doivent utiliser : exports.handler = async (...)
exports.handler = async (event, context) => {
    // ESP32 → POST les données ici
    if (event.httpMethod === "POST") {
        try {
            const data = JSON.parse(event.body);
            lastStatus = data;

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Received", data }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            };
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Invalid JSON",
                    details: e.toString()
                }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
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
};

