// /netlify/functions/logPackClick.js

import fs from "fs";
import path from "path";

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const pack = body.pack;

  const file = path.join("/tmp", "packs.json");

  let data = {};

  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  if (!data[pack]) data[pack] = 0;
  data[pack]++;

  fs.writeFileSync(file, JSON.stringify(data));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
