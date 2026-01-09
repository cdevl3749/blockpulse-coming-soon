import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function DemandeAccesEN() {
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

  // --- EmailJS send ---
  const sendEmail = async () => {
    if (!name || !email) {
      setError("Please enter your first name and email address.");
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
          message: `BlockPulse Pro access request\n\nUsage context:\n${
            message || "Not specified"
            }`,
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
    <main style={{ paddingTop: "90px", maxWidth: "720px", margin: "0 auto" }}>
      {/* HERO */}
      <section style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
        BlockPulse Pro access
        </h1>
        <p style={{ opacity: 0.85 }}>
        Pro access helps you understand <strong>why</strong> the Bitcoin network
        is in a given state (stable, neutral, or congested).
        <br />
        Requests are reviewed manually. Access is activated within 24 hours.
        </p>
      </section>

      {/* FORM */}
      <section
        style={{
          background: "rgba(255,255,255,0.03)",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <label>Your first name</label>
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        <label>Your email</label>
        <input
          type="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        <label>
        In which context would you like to use BlockPulse?
        <span style={{ opacity: 0.6 }}> (optional)</span>
        </label>
        <textarea
          rows="4"
          placeholder="Occasional transactions, professional use, automation, network analysis…"
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
          {loading ? "Sending..." : "Request Pro access"}
        </button>

        {error && (
          <p style={{ color: "#ff6b6b", marginTop: "12px" }}>{error}</p>
        )}

        {success && (
          <p style={{ color: "#6bff95", marginTop: "12px" }}>
        ✅ Request sent. Your access will be activated after validation, within 24 hours.
        </p>
        )}

        {!success && (
          <p style={{ opacity: 0.6, marginTop: "12px", fontSize: "14px" }}>
            Subscription-based access · Cancel anytime · Payment only after activation
          </p>
        )}
      </section>
    </main>
  );
}
