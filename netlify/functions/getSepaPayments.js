const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/payments.json");

exports.handler = async () => {
  try {
    let payments = [];

    if (fs.existsSync(DATA_FILE)) {
      payments = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ payments }),
    };
  } catch (err) {
    console.error("Erreur getSepaPayments:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur interne" }),
    };
  }
};
