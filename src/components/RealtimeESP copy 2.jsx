import React, { useEffect, useState } from "react";

const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";
const LOCAL_ENDPOINT = import.meta.env.VITE_ESP32_LOCAL_STATUS || null;

// Petite fonction utilitaire pour avoir un timeout
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      cache: "no-cache",
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!res.ok) throw new Error("HTTP error");
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

export default function RealtimeESP() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let json = null;

        // 1) On tente l’ESP32 local si une URL est définie
        if (LOCAL_ENDPOINT) {
          try {
            json = await fetchWithTimeout(LOCAL_ENDPOINT, 800);
          } catch {
            // pas grave, on tombera sur le cloud après
          }
        }

        // 2) Si pas de réponse locale → on passe sur le cloud
        if (!json) {
          json = await fetchWithTimeout(CLOUD_ENDPOINT, 2000);
        }

        setData(json);
        setError(false);
      } catch {
        setError(true);
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ color: "#f87171", fontSize: "40px" }}>❌</div>
        <p style={{ color: "#f87171", fontSize: "20px", marginTop: "10px" }}>
          Impossible de récupérer les données
        </p>
        <p style={{ color: "#6b7280" }}>
          Le module n’a peut-être rien envoyé récemment
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: "50px" }}>⏳</div>
        <p style={{ color: "#9ca3af" }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>
        Données du module ESP32
      </h1>

      <p style={{ color: "#6b7280", marginTop: "4px" }}>
        Source : ESP32 local (si disponible) ou Cloud Netlify
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <Card title="Dernier bloc" value={data.lastBlock} icon="🎯" />
        <Card title="Tickets actifs" value={data.ticketsActive} icon="🎫" />
        <Card title="Mining" value={data.isMining ? "Actif" : "Inactif"} icon="⚡" />
        <Card title="Prochain tirage" value={data.nextDrawIn} icon="⏰" />
        <Card title="Pool" value={data.pool} icon="🌐" />
        <Card
          title="Hashrate"
          value={`${(data.hashrate / 1000).toFixed(1)} KH/s`}
          icon="📈"
        />
        <Card title="Shares acceptées" value={data.sharesAccepted} icon="✔️" />
        <Card
          title="Dernière share"
          value={data.lastShareTime || "—"}
          icon="🕒"
        />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid rgba(148,163,184,0.25)",
        background: "#020617", // fond bien sombre, sans bleu translucide
        boxShadow: "0 18px 45px rgba(15,23,42,0.75)",
      }}
    >
      <div style={{ fontSize: "28px" }}>{icon}</div>
      <h3
        style={{
          marginTop: "8px",
          color: "#9ca3af",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          marginTop: "6px",
          fontSize: "26px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
    </div>
  );
}
