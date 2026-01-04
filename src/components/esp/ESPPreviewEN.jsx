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

export default function ESPPreviewEN({ plan = "public" }) {
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
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* ------------------ TITLE ------------------ */

  const title =
    plan === "pro"
      ? "ESP32 data — Pro access"
      : plan === "starter"
      ? "ESP32 data — Starter access"
      : "Live ESP32 data preview";

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
    return <p className={styles.error}>❌ ESP32 data unavailable</p>;
  }

  if (!data) {
    return <p className={styles.loading}>⏳ Loading ESP32 data…</p>;
  }

  const derivedIsMining =
    Number(data.hashrate) > 0 || Number(data.sharesAccepted) > 0;

  return (
    <section className={styles.section} id="temps-reel">
      <div className={styles.inner}>
        <h2>{title}</h2>

        {/* 👀 VIEWERS */}
        <p className={styles.viewers}>
          🟢 {viewers} people are viewing the ESP32 data right now
        </p>

        <div className={styles.grid}>
          <Card label="Hashrate" value={formatHashrate(data.hashrate)} />
          <Card label="Mining" value={derivedIsMining ? "Active" : "Inactive"} />
          <Card label="Pool" value={data.pool || "—"} />
          <Card label="ESP32 module" value="Connected" />
          <Card label="Source" value="Physical ESP32 device" />
          <Card label="Update frequency" value="Every 60 seconds" />

          <LockedCard
            show={isPro}
            label="Last share"
            value={data.lastShareTime || "—"}
          />
          <LockedCard
            show={isPro}
            label="Accepted shares"
            value={data.sharesAccepted ?? "—"}
          />
          <LockedCard
            show={isPro}
            label="Next draw"
            value={data.nextDrawIn || "—"}
          />
          <LockedCard
            show={isPro}
            label="Blocks found"
            value="0 (full history)"
          />

          {isPro && (
            <>
              <Card label="Module stability" value="99.98%" />
              <Card
                label="Last update"
                value={`${Math.floor(
                  (Date.now() - lastUpdate) / 1000
                )}s ago`}
              />
              <Card
                label="Block probability"
                value="Extremely rare — tracking included"
              />
            </>
          )}
        </div>

        {!isPro && (
          <div className={styles.upgradeBox}>
            <h3>🔓 Unlock all ESP32 metrics</h3>
            <p>
              Get advanced Bitcoin network analysis and full history to confidently
              decide when to send a transaction with the <strong>Pro</strong> plan.
            </p>
            <a href="/#abonnements" className={styles.upgradeBtn}>
              Upgrade to Pro
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
      <span className={styles.value}>🔒 Pro subscription required</span>
    </div>
  );
}
