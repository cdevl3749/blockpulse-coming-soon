import React, { useEffect, useState, useRef, useMemo } from "react";
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

  // ✅ Detect EN (works for /en/* AND your EN tool slug)
  const isEN = useMemo(() => {
    if (typeof window === "undefined") return false;
    const p = window.location.pathname || "";
    return p.startsWith("/en") || p.startsWith("/tools/bitcoin-network-status");
  }, []);

  const t = useMemo(() => {
    return isEN
      ? {
          titlePro: "ESP32 data — Pro access",
          titleStarter: "ESP32 data — Starter access",
          titlePublic: "Live ESP32 data preview",
          unavailable: "❌ ESP32 data unavailable",
          loading: "⏳ Loading ESP32…",
          viewers: (n) => `🟢 ${n} people are viewing ESP32 data right now`,
          miningActive: "Active",
          miningInactive: "Inactive",
          connected: "Connected",
          sourcePhysical: "Real physical ESP32",
          updateEvery: "Every 60 seconds",
          lastShare: "Last share",
          sharesAccepted: "Accepted shares",
          nextDraw: "Next draw",
          blocksFound: "Blocks found",
          fullHistory: "0 (full history)",
          moduleStability: "Module stability",
          lastUpdate: (s) => `${s}s ago`,
          blockProb: "Block probability",
          blockProbValue: "Very rare — tracking included",
          upgradeTitle: "🔓 Unlock all ESP32 metrics",
          upgradeText:
            "Get advanced Bitcoin network analysis and full history to decide when to send a transaction with confidence with the ",
          upgradeStrong: "Pro",
          upgradeBtn: "Upgrade to Pro",
          upgradeHref: "/en/#abonnements",
          hashrate: "Hashrate",
          mining: "Mining",
          pool: "Pool",
          module: "ESP32 module",
          source: "Source",
          refresh: "Refresh",
          proRequired: "🔒 Pro plan required",
        }
      : {
          titlePro: "Données ESP32 — Accès Pro",
          titleStarter: "Données ESP32 — Accès Starter",
          titlePublic: "Aperçu des données ESP32 en temps réel",
          unavailable: "❌ Données ESP32 indisponibles",
          loading: "⏳ Chargement ESP32…",
          viewers: (n) => `🟢 ${n} personnes consultent les données ESP32 en ce moment`,
          miningActive: "Actif",
          miningInactive: "Inactif",
          connected: "Connecté",
          sourcePhysical: "ESP32 physique réel",
          updateEvery: "Toutes les 60 secondes",
          lastShare: "Dernière share",
          sharesAccepted: "Shares acceptées",
          nextDraw: "Prochain tirage",
          blocksFound: "Blocs trouvés",
          fullHistory: "0 (historique complet)",
          moduleStability: "Stabilité du module",
          lastUpdate: (s) => `il y a ${s}s`,
          blockProb: "Probabilité de bloc",
          blockProbValue: "Très rare — suivi inclus",
          upgradeTitle: "🔓 Débloquez toutes les métriques ESP32",
          upgradeText:
            "Accédez à une analyse avancée du réseau Bitcoin et à l’historique complet pour savoir quand envoyer une transaction en toute confiance avec l’abonnement ",
          upgradeStrong: "Pro",
          upgradeBtn: "Passer à Pro",
          upgradeHref: "/#abonnements",
          hashrate: "Hashrate",
          mining: "Mining",
          pool: "Pool",
          module: "Module ESP32",
          source: "Source",
          refresh: "Mise à jour",
          proRequired: "🔒 Abonnement Pro requis",
        };
  }, [isEN]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const prevHashrate = useRef(null);

  /* ------------------ VIEWERS COUNTER ------------------ */
  const viewersPool = [6, 8, 10, 12, 15, 18, 22, 25, 28];
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = viewersPool[Math.floor(Math.random() * viewersPool.length)];
      setViewers(next);
    }, 6000); // toutes les ~6s

    return () => clearInterval(interval);
  }, []);

  /* ------------------ TITLE ------------------ */
  const title =
    plan === "pro"
      ? t.titlePro
      : plan === "starter"
      ? t.titleStarter
      : t.titlePublic;

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
    return <p className={styles.error}>{t.unavailable}</p>;
  }

  if (!data) {
    return <p className={styles.loading}>{t.loading}</p>;
  }

  const derivedIsMining =
    Number(data.hashrate) > 0 || Number(data.sharesAccepted) > 0;

  return (
    <section className={styles.section} id="temps-reel">
      <div className={styles.inner}>
        <h2>{title}</h2>

        {/* 👀 VIEWERS */}
        <p className={styles.viewers}>{t.viewers(viewers)}</p>

        <div className={styles.grid}>
          {/* VISIBLES PUBLIC / STARTER / PRO */}
          <Card label={t.hashrate} value={formatHashrate(data.hashrate)} />
          <Card label={t.mining} value={derivedIsMining ? t.miningActive : t.miningInactive} />
          <Card label={t.pool} value={data.pool || "—"} />
          <Card label={t.module} value={t.connected} />
          <Card label={t.source} value={t.sourcePhysical} />
          <Card label={t.refresh} value={t.updateEvery} />

          {/* BLOQUÉS SI PAS PRO */}
          <LockedCard show={isPro} label={t.lastShare} value={data.lastShareTime || "—"} />
          <LockedCard show={isPro} label={t.sharesAccepted} value={data.sharesAccepted ?? "—"} />
          <LockedCard show={isPro} label={t.nextDraw} value={data.nextDrawIn || "—"} />
          <LockedCard show={isPro} label={t.blocksFound} value={t.fullHistory} />

          {/* PRO UNIQUEMENT */}
          {isPro && (
            <>
              <Card label={t.moduleStability} value="99.98%" />
              <Card
                label={isEN ? "Last update" : "Dernière mise à jour"}
                value={t.lastUpdate(Math.floor((Date.now() - lastUpdate) / 1000))}
              />
              <Card label={t.blockProb} value={t.blockProbValue} />
            </>
          )}
        </div>

        {!isPro && (
          <div className={styles.upgradeBox}>
            <h3>{t.upgradeTitle}</h3>
            <p>
              {t.upgradeText}
              <strong>{t.upgradeStrong}</strong>.
            </p>
            <a href={t.upgradeHref} className={styles.upgradeBtn}>
              {t.upgradeBtn}
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
      <span className={styles.value}>🔒 { /* keep icon */ } { /* text */ } Pro plan required</span>
    </div>
  );
}



