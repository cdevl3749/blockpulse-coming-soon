import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function DemandeAcces() {
  // 🔒 Reset scroll à l’arrivée sur la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // --- Champs ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // --- UI states ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // --- Envoi EmailJS ---
  const sendEmail = async () => {
    if (!name || !email) {
      setError("Merci de renseigner votre prénom et votre email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        "cdevl3749@gmail.com",
        "template_nh1kma8",
        {
          user_name: name,
          user_email: email,
          message: `Demande d'accès Pro BlockPulse\n\nContexte d’utilisation :\n${message || "Non précisé"}`,
        },
        "o3sNWIRA-SH7s2nsx"
      );

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }

    setLoading(false);
  };

  return (
    <main style={{ paddingTop: "90px", maxWidth: "720px", margin: "0 auto" }}>
      {/* HERO */}
      <section style={{ marginBottom: "40px" }}>
       <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
        Accès Pro BlockPulse
        </h1>
        <p style={{ opacity: 0.85 }}>
        L’accès Pro permet de comprendre <strong>pourquoi</strong> le réseau Bitcoin
        est dans un certain état (stable, neutre ou congestionné).
        <br />
        Les demandes sont examinées manuellement. Activation sous 24h maximum.
        </p>
      </section>

      {/* FORMULAIRE */}
      <section
        style={{
          background: "rgba(255,255,255,0.03)",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <label>Votre prénom</label>
        <input
          type="text"
          placeholder="Prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        <label>Votre email</label>
        <input
          type="email"
          placeholder="exemple@domaine.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        <label>
        Dans quel contexte souhaitez-vous utiliser BlockPulse ?
        <span style={{ opacity: 0.6 }}> (facultatif)</span>
        </label>
        <textarea
          rows="4"
          placeholder="Envoi occasionnel, activité professionnelle, automatisation, analyse du réseau…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", marginBottom: "20px" }}
        />

        <button
          onClick={sendEmail}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            fontWeight: 600,
            background: "#FFD700",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Envoi en cours..." : "Activer mon essai gratuit"}
        </button>

        {error && (
          <p style={{ color: "#ff6b6b", marginTop: "12px" }}>{error}</p>
        )}

        {success && (
          <p style={{ color: "#6bff95", marginTop: "12px" }}>
            ✅ Demande envoyée. Votre accès sera activé après validation, sous 24h maximum.
          </p>
        )}

        {!success && (
          <p style={{ opacity: 0.6, marginTop: "12px", fontSize: "14px" }}>
            Accès par abonnement · Annulable à tout moment · Paiement uniquement après activation
          </p>
        )}
      </section>
    </main>
  );
}
