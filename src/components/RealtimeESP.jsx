import { useEffect, useState } from "react";

// URL de statut de l'ESP32
// - en prod : on utilisera VITE_ESP_STATUS_URL (Netlify / .env)
// - en local : on garde ton IP actuelle par défaut
const ESP_STATUS_URL =
  import.meta.env.VITE_ESP_STATUS_URL || "http://192.168.1.34/status";

export default function RealtimeESP() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchStatus() {
    try {
      const res = await fetch(ESP_STATUS_URL, {
        headers: {
          // au cas où tu ajoutes plus tard du JSON custom
          "Accept": "application/json",
        },
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      console.error("Erreur ESP32:", err);
      setError("Impossible de récupérer les données temps réel.");
    }
  }

  useEffect(() => {
    // 1er chargement
    fetchStatus();
    // rafraîchissement toutes les 5s
    const id = setInterval(fetchStatus, 5000);
    return () => clearInterval(id);
  }, []);

  if (error) {
    return (
      <section className="bp-section">
        <div className="bp-container">
          <h2>Données en temps réel (ESP32)</h2>
          <p className="bp-error">{error}</p>
          <p style={{ fontSize: "0.85rem", color: "var(--bp-muted)" }}>
            Source : {ESP_STATUS_URL}
          </p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bp-section">
        <div className="bp-container">
          <h2>Données en temps réel (ESP32)</h2>
          <p>Chargement des données…</p>
          <p style={{ fontSize: "0.85rem", color: "var(--bp-muted)" }}>
            Source : {ESP_STATUS_URL}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2>Données en temps réel (ESP32)</h2>
        <div className="bp-realtime-grid">
          <div className="bp-card">
            <span className="bp-label">Dernier bloc</span>
            <span className="bp-value">{data.lastBlock}</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Tickets actifs</span>
            <span className="bp-value">{data.ticketsActive}</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Mining</span>
            <span className="bp-value">
              {data.isMining ? "Actif" : "Arrêté"}
            </span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Prochain tirage</span>
            <span className="bp-value">{data.nextDrawIn}</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Pool</span>
            <span className="bp-value">{data.pool}</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Difficulté</span>
            <span className="bp-value">{data.difficulty}</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Hashrate (exp.)</span>
            <span className="bp-value">{data.hashrate} H/s</span>
          </div>
          <div className="bp-card">
            <span className="bp-label">Shares acceptées</span>
            <span className="bp-value">{data.sharesAccepted}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

