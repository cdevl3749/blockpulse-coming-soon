import React, { useEffect, useState } from "react";

const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";

export default function RealtimeESP() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  // Charge les données Netlify
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(CLOUD_ENDPOINT, { cache: "no-cache" });
        if (!res.ok) throw new Error("HTTP error");
        const json = await res.json();
        setData(json);
        setError(false);
      } catch (e) {
        setError(true);
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  // ========================
  // • États d'affichage
  // ========================

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ color: "#f87171", fontSize: "40px" }}>❌</div>
        <p style={{ color: "#f87171", fontSize: "20px", marginTop: "10px" }}>
          Impossible de récupérer les données
        </p>
        <p style={{ color: "#6b7280" }}>Le module n’a peut-être rien envoyé récemment</p>
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

  // ========================
  // • Rendu UI
  // ========================
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>
        Données du module ESP32
      </h1>

      <p style={{ color: "#6b7280", marginTop: "4px" }}>
        Source : Cloud Netlify (compatible mobile & HTTPS)
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
        <Card
          title="Shares acceptées"
          value={data.sharesAccepted}
          icon="✔️"
        />
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
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ fontSize: "32px" }}>{icon}</div>
      <h3
        style={{
          marginTop: "8px",
          color: "#9ca3af",
          fontSize: "14px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <p style={{ marginTop: "6px", fontSize: "26px", color: "white", fontWeight: "bold" }}>
        {value}
      </p>
    </div>
  );
}
