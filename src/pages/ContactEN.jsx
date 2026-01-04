import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

export default function ContactEN() {
  // 🔒 Reset scroll on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // --- Fields ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // --- UI states ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // --- EmailJS (UNCHANGED) ---
  const sendEmail = async () => {
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
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
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <main className={styles.page} style={{ paddingTop: "90px" }}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          A question about BlockPulse, ESP32 data, or subscriptions?
          Get in touch — we usually reply within 24–48 hours.
        </p>
      </section>

      {/* FORM */}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Contact us</h2>

          <label>Your name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your email</label>
          <input
            type="email"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Message</label>
          <textarea
            rows="5"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendEmail} disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {success && (
            <p className={styles.success}>
              Message sent successfully. We’ll get back to you shortly.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
