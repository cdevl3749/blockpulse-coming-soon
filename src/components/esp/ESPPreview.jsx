import React, { useEffect, useState, useRef } from "react";
import styles from "./ESPPreview.module.css";

const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";
const LOCAL_ENDPOINT = import.meta.env.VITE_ESP32_LOCAL_STATUS || null;

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { cache: "no-cache", signal: controller.signal });
    if (!res.ok) throw new Error("HTTP error");
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

export default function ESPPreview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const prevHashrate = useRef(null);

  function formatHashrate(hr) {
    if (!hr) return "—";
    const kh = (hr / 1000).toFixed(1);
    const arrow =
      prevHashrate.current === null
        ? ""
        : hr > prevHashrate.current
        ? "↑"
        : hr < prevHashrate.current
        ? "↓"
        : "→";

    prevHashrate.current = hr;
    return `${kh} KH/s ${arrow}`;
  }

  useEffect(() => {
    const load = async () => {
      try {
        let json = null;

        if (LOCAL_ENDPOINT) {
          try {
            json = await fetchWithTimeout(LOCAL_ENDPOINT, 800);
          } catch {}
        }

        if (!json) {
          json = await fetchWithTimeout(CLOUD_ENDPOINT, 2000);
        }

        setData(json);
        setLastUpdate(new Date());
        setError(false);
      } catch {
        setError(true);
      }
    };

    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <section className={styles.section}>
        <p className={styles.error}>❌ Impossible de récupérer les données ESP32</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.section}>
        <p className={styles.loading}>⏳ Chargement des données ESP32…</p>
      </section>
    );
  }

  return (
    <section className={styles.section} id="temps-reel">
      <div className={styles.inner}>
        <h2>Données ESP32 en temps réel</h2>
        <p className={styles.subtitle}>
          Données mesurées par un <strong>module ESP32 physique réel</strong>, mises à jour
          automatiquement toutes les <strong>30 secondes</strong>.
        </p>

        <div className={styles.grid}>
          <Card icon="📈" label="Hashrate" value={formatHashrate(data.hashrate)} />
          <Card icon="🌐" label="Pool" value={data.pool} />
          <Card icon="⚡" label="Mining" value={data.isMining ? "Actif" : "Inactif"} />
          <Card icon="🕒" label="Dernière share" value={data.lastShareTime || "—"} />
          <Card icon="✔️" label="Shares acceptées" value={data.sharesAccepted} />
          <Card icon="⏰" label="Prochain tirage" value={data.nextDrawIn} />
          <Card icon="🔌" label="Module ESP32" value="Connecté" />
          <Card
            icon="🔄"
            label="Dernière mise à jour"
            value={
              lastUpdate
                ? `il y a ${Math.floor((Date.now() - lastUpdate) / 1000)}s`
                : "—"
            }
          />
        </div>

        <p className={styles.note}>
          Ces données sont affichées telles quelles, sans modification humaine.
        </p>
      </div>
    </section>
  );
}

function Card({ icon, label, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
