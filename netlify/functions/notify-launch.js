// netlify/functions/notify-launch.js
const nodemailer = require("nodemailer");

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.handler = async (event) => {
  // Autoriser uniquement POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const email = (body.email || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Email invalide" }),
      };
    }

    // Variables d'env Netlify
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      NOTIFY_TO_EMAIL,
      NOTIFY_FROM_EMAIL,
      APP_NAME,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO_EMAIL) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          error:
            "Configuration email manquante (variables d'environnement). Vérifie SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/NOTIFY_TO_EMAIL.",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE || "false") === "true", // true pour 465, false pour 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const now = new Date().toISOString();

    const subject = `[${process.env.APP_NAME || "BlockPulse"}] Nouvelle demande "Être informé"`;
    const text = `Nouvel email inscrit : ${email}\nDate (ISO) : ${now}\nIP : ${event.headers["x-nf-client-connection-ip"] || "unknown"}\nUser-Agent : ${event.headers["user-agent"] || "unknown"}`;

    await transporter.sendMail({
      from: NOTIFY_FROM_EMAIL || SMTP_USER, // expéditeur
      to: NOTIFY_TO_EMAIL, // destinataire (toi)
      subject,
      text,
      replyTo: email, // pratique: tu peux répondre direct
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("notify-launch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Erreur serveur" }),
    };
  }
};
