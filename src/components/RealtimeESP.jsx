import React, { useEffect, useState, useRef } from "react";

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

  // Historique pour sparkline
  const [hashHistory, setHashHistory] = useState([]);

  // Historique pour flèche hashrate
  const prevHashrate = useRef(null);

  // --- Sparkline générateur ---
  function renderSparkline(arr) {
    if (arr.length === 0) return "";

    const chars = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    return arr
      .map((v) => {
        const index =
          max === min
            ? 0
            : Math.floor(((v - min) / (max - min)) * (chars.length - 1));
        return chars[index];
      })
      .join("");
  }

  // --- Format tendance Hashrate ---
  function formatHashrate(hr) {
    const kh = hr / 1000;
    const formatted = kh.toFixed(1) + " KH/s";

    if (prevHashrate.current === null) {
      prevHashrate.current = hr;
      return formatted;
    }

    const arrow =
      hr > prevHashrate.current ? "↑" : hr < prevHashrate.current ? "↓" : "→";

    const color =
      arrow === "↑"
        ? "#4ade80" // vert
        : arrow === "↓"
        ? "#f87171" // rouge
        : "#9ca3af"; // gris

    prevHashrate.current = hr;

    return (
      <span>
        {formatted}{" "}
        <span style={{ color, fontSize: "20px", fontWeight: "bold" }}>
          {arrow}
        </span>
      </span>
    );
  }

  // --- Format humain “Dernière share” ---
  function formatLastShare(v) {
    if (!v) return "—";

    if (v.includes(":")) {
      const [m, s] = v.split(":").map(Number);
      const total = m * 60 + s;

      if (total < 60) return `il y a ${total}s`;
      if (total < 3600) return `il y a ${Math.floor(total / 60)} min`;
      return `il y a ${Math.floor(total / 3600)}h`;
    }

    return v;
  }

  // --- Statut Mining visuel ---
  function formatMiningStatus(active) {
    return (
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: active ? "#4ade80" : "#f87171",
            boxShadow: active
              ? "0 0 10px rgba(74,222,128,0.7)"
              : "0 0 10px rgba(248,113,113,0.7)",
          }}
        ></span>
        <span style={{ fontWeight: "bold" }}>
          {active ? "Actif" : "Inactif"}
        </span>
      </span>
    );
  }

  // --- Chargement des données ---
  useEffect(() => {
    const load = async () => {
      try {
        let json = null;

        // 1) Tentative ESP local
        if (LOCAL_ENDPOINT) {
          try {
            json = await fetchWithTimeout(LOCAL_ENDPOINT, 800);
          } catch {}
        }

        // 2) Sinon → Cloud
        if (!json) {
          json = await fetchWithTimeout(CLOUD_ENDPOINT, 2000);
        }

        setData(json);
        setError(false);

        // Historique Hashrate Sparkline
        setHashHistory((prev) => {
          const next = [...prev, json.hashrate];
          return next.length > 20 ? next.slice(next.length - 20) : next;
        });
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

      {/* --- SPARKLINE A CÔTÉ DE LA SOURCE --- */}
      <p
        style={{
          color: "#6b7280",
          marginTop: "4px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        <span>Source : ESP32 local (si disponible) ou Cloud Netlify</span>
       <span
        style={{
          color: "#00ffc8",
          fontSize: "12px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          letterSpacing: "1px",
          opacity: 0.85,
        }}
      >
        {renderSparkline(hashHistory)}
      </span>

      </p>

      {/* --- GRID DES CARTES --- */}
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

        <Card
          title="Mining"
          value={formatMiningStatus(data.isMining)}
          icon="⚡"
        />

        <Card title="Prochain tirage" value={data.nextDrawIn} icon="⏰" />
        <Card title="Pool" value={data.pool} icon="🌐" />

        <Card
          title="Hashrate"
          value={formatHashrate(data.hashrate)}
          icon="📈"
        />

        <Card
          title="Shares acceptées"
          value={data.sharesAccepted}
          icon="✔️"
        />

        <Card
          title="Dernière share"
          value={formatLastShare(data.lastShareTime)}
          icon="🕒"
        />
      </div>
    </div>
  );
}

// --- Composant de Carte ---
function Card({ title, value, icon }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid rgba(148,163,184,0.25)",
        background: "#020617",
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
