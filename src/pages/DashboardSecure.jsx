import { useState } from "react";
import Dashboard from "./Dashboard";

export default function DashboardSecure() {
  const [auth, setAuth] = useState(
    localStorage.getItem("blockpulse_admin_auth") === "true"
  );

  const PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    const userPass = e.target.password.value;

    if (userPass === PASSWORD) {
      localStorage.setItem("blockpulse_admin_auth", "true");
      setAuth(true);
    } else {
      alert("❌ Mot de passe incorrect");
    }
  };

  if (!auth) {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "80px auto",
          padding: "24px",
          background: "var(--bp-card)",
          borderRadius: "16px",
          border: "1px solid var(--bp-border)",
          boxShadow: "var(--bp-shadow-soft)",
          color: "white"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Accès privé
        </h2>
        <p style={{ textAlign: "center", marginBottom: "24px" }}>
          Cette zone est réservée à l&apos;administration BlockPulse.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe admin"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "12px",
              border: "1px solid var(--bp-border)",
              background: "#0f141c",
              color: "white"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "var(--bp-primary)",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard />;
}
