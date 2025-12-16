import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

export default function Contact() {
  // 🔒 Reset scroll à l'arrivée sur la page
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

  // --- EmailJS (INCHANGÉ) ---
  const sendEmail = async () => {
    if (!name || !email || !message) {
      setError("Merci de remplir tous les champs.");
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
          message: message,
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
    <main className={styles.page} style={{ paddingTop: '90px' }}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          Une question sur BlockPulse, les données ESP32 ou les abonnements ?
          Écrivez-nous. Réponse sous 24—48h.
        </p>
      </section>

      {/* FORMULAIRE */}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Contactez-nous</h2>

          <label>Votre nom</label>
          <input
            type="text"
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Votre email</label>
          <input
            type="email"
            placeholder="exemple@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Message</label>
          <textarea
            rows="5"
            placeholder="Écrivez votre message ici"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendEmail} disabled={loading}>
            {loading ? "Envoi..." : "Envoyer"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {success && (
            <p className={styles.success}>
              Message envoyé avec succès. Nous vous répondrons rapidement.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
