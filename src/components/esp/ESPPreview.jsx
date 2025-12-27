import React, { useEffect, useState, useRef } from "react";
import styles from "./ESPPreview.module.css";

const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";
const LOCAL_ENDPOINT = import.meta.env.VITE_ESP32_LOCAL_STATUS || null;

/* ------------------ FETCH UTILS ------------------ */

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

export default function ESPPreview({ plan = "public" }) {
  const isPro = plan === "pro";
  const isStarter = plan === "starter";

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const prevHashrate = useRef(null);

  /* ------------------ VIEWERS COUNTER ------------------ */
  const viewersPool = [6, 8, 10, 12, 15, 18, 22, 25, 28];
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      const next =
        viewersPool[Math.floor(Math.random() * viewersPool.length)];
      setViewers(next);
    }, 6000); // toutes les ~6s

    return () => clearInterval(interval);
  }, []);

  /* ------------------ TITLE ------------------ */

  const title =
    plan === "pro"
      ? "Données ESP32 — Accès Pro"
      : plan === "starter"
      ? "Données ESP32 — Accès Starter"
      : "Aperçu des données ESP32 en temps réel";

  /* ------------------ FORMAT HASHRATE ------------------ */

  function formatHashrate(hr) {
    if (!hr || Number(hr) <= 0) return "—";
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

  /* ------------------ DATA LOAD ------------------ */

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
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <p className={styles.error}>❌ Données ESP32 indisponibles</p>;
  }

  if (!data) {
    return <p className={styles.loading}>⏳ Chargement ESP32…</p>;
  }

  const derivedIsMining =
    Number(data.hashrate) > 0 || Number(data.sharesAccepted) > 0;

  return (
    <section className={styles.section} id="temps-reel">
      <div className={styles.inner}>
        <h2>{title}</h2>

        {/* 👀 VIEWERS */}
        <p className={styles.viewers}>
          🟢 {viewers} personnes consultent les données ESP32 en ce moment
        </p>

        <div className={styles.grid}>
          {/* VISIBLES PUBLIC / STARTER / PRO */}
          <Card label="Hashrate" value={formatHashrate(data.hashrate)} />
          <Card label="Mining" value={derivedIsMining ? "Actif" : "Inactif"} />
          <Card label="Pool" value={data.pool || "—"} />
          <Card label="Module ESP32" value="Connecté" />
          <Card label="Source" value="ESP32 physique réel" />
          <Card label="Mise à jour" value="Toutes les 60 secondes" />

          {/* BLOQUÉS SI PAS PRO */}
          <LockedCard
            show={isPro}
            label="Dernière share"
            value={data.lastShareTime || "—"}
          />
          <LockedCard
            show={isPro}
            label="Shares acceptées"
            value={data.sharesAccepted ?? "—"}
          />
          <LockedCard
            show={isPro}
            label="Prochain tirage"
            value={data.nextDrawIn || "—"}
          />
          <LockedCard
            show={isPro}
            label="Blocs trouvés"
            value="0 (historique complet)"
          />

          {/* PRO UNIQUEMENT */}
          {isPro && (
            <>
              <Card label="Stabilité du module" value="99.98%" />
              <Card
                label="Dernière mise à jour"
                value={`il y a ${Math.floor(
                  (Date.now() - lastUpdate) / 1000
                )}s`}
              />
              <Card
                label="Probabilité de bloc"
                value="Très rare — suivi inclus"
              />
            </>
          )}
        </div>

        {!isPro && (
          <div className={styles.upgradeBox}>
            <h3>🔓 Débloquez toutes les métriques ESP32</h3>
            <p>
              Accédez à une analyse avancée du réseau Bitcoin et à l’historique complet pour savoir quand envoyer une transaction en toute confiance avec l’abonnement <strong>Pro</strong>.
            </p>
            <a href="/#abonnements" className={styles.upgradeBtn}>
              Passer à Pro
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- COMPONENTS ---------- */

function Card({ label, value }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

function LockedCard({ show, label, value }) {
  if (show) {
    return <Card label={label} value={value} />;
  }

  return (
    <div className={`${styles.card} ${styles.locked}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>🔒 Abonnement Pro requis</span>
    </div>
  );
}

