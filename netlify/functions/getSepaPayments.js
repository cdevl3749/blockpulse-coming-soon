const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../../data/payments.json");

exports.handler = async () => {
  try {
    let payments = [];

    if (fs.existsSync(dataFile)) {
      payments = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ payments }),
    };
  } catch (e) {
    console.error("getSepaPayments error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};
