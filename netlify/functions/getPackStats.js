// /netlify/functions/getPackStats.js

import fs from "fs";
import path from "path";

export const handler = async () => {
  const file = path.join("/tmp", "packs.json");

  if (!fs.existsSync(file)) {
    return {
      statusCode: 200,
      body: JSON.stringify({})
    };
  }

  const data = JSON.parse(fs.readFileSync(file));

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
