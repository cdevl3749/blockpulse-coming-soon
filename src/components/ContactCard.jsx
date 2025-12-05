import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  // --- Envoi EmailJS ---
  const sendEmail = async () => {
  if (!name || !email || !message) {
  setErrorMessage("Merci de remplir tous les champs avant d’envoyer le message.");
  return;
}


    setLoading(true);

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

      setPopup(true);
      setErrorMessage("");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      alert("Une erreur est survenue. Réessayez plus tard.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="contact-card">
        <h3 className="contact-title">📩 Contactez-nous</h3>

        <label className="contact-label">Votre nom</label>
        <input
          type="text"
          className="contact-input"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="contact-label">Votre email</label>
        <input
          type="email"
          className="contact-input"
          placeholder="exemple@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="contact-label">Message</label>
        <textarea
          className="contact-input"
          rows="5"
          placeholder="Écrivez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="contact-button" onClick={sendEmail} disabled={loading}>
          {loading ? (
            "Envoi..."
          ) : (
            <>
              Envoyer <span style={{ fontSize: "1.15rem" }}>✉️</span>
            </>
          )}
        </button>

        {errorMessage && (
        <div className="contact-error">
          {errorMessage}
        </div>
        )}

        {/* Logos crypto */}
        <div className="contact-logos">
          <div className="crypto-icon">₿</div>
          <div className="crypto-icon">Ξ</div>
          <div className="crypto-ledger">L</div>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(false)}>
          <div className="popup-box">
            <h3>Message envoyé 🎉</h3>
            <p>Vous recevrez une réponse sous 24–48h.</p>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
/* ------ CARD ------ */
.contact-card {
  padding: 26px;
  background: radial-gradient(circle at top, rgba(0, 255, 200, 0.06), rgba(5, 11, 24, 0.95));
  border-radius: 18px;
  border: 1px solid rgba(0, 255, 200, 0.15);
  width: 100%;
  max-width: 520px;
  margin: auto;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
}

.contact-title {
  text-align: center;
  margin: 0 0 20px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* ------ INPUTS ------ */
.contact-label {
  margin-top: 14px;
  margin-bottom: 6px;
  display: block;
  color: var(--bp-muted);
  font-size: 0.9rem;
}

.contact-input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  background: #0d1422;
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #fff;
  font-size: 1rem;
  transition: 0.25s;
}

.contact-input:focus {
  border: 1px solid var(--bp-accent);
  background: #111a2e;
}

/* ------ BUTTON ------ */
.contact-button {
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00ffc8, #4de0ff);
  color: #020617;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.contact-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}

.contact-button:active {
  transform: scale(0.97);
}

.contact-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ------ ERROR BOX ------ */
.contact-error {
  margin-top: 16px;
  padding: 13px;
  border-radius: 10px;
  background: rgba(255, 80, 80, 0.12);
  border: 1px solid rgba(255, 80, 80, 0.4);
  color: #ff7f7f;
  font-size: 0.9rem;
  text-align: center;
  animation: fadeError 0.25s ease;
}

/* ------ ICONS ------ */
.contact-logos {
  margin-top: 22px;
  display: flex;
  justify-content: center;
  gap: 14px;
}

.crypto-icon,
.crypto-ledger {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #0f1525;
  border: 1px solid #1f2a44;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
}

.crypto-icon {
  color: var(--bp-accent);
}
.crypto-ledger {
  color: white;
}

/* ------ POPUP ------ */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.35s ease;
}

.popup-box {
  background: #0d1525;
  padding: 34px 40px;
  border-radius: 16px;
  border: 1px solid rgba(0,255,200,0.25);
  text-align: center;
  animation: popIn 0.35s ease;
  box-shadow: 0 25px 60px rgba(0,255,200,0.15);
}

.popup-box h3 {
  color: #00ffc8;
  font-size: 1.4rem;
  font-weight: 700;
}

.popup-box p {
  color: #cbd5e1;
  margin-top: 8px;
}

/* ------ ANIMATIONS ------ */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.82); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes fadeError {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
`}</style>
</>
  );
}