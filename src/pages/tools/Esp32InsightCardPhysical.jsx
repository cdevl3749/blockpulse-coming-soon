import { useEffect, useMemo, useState } from "react";
import styles from "./Esp32InsightCard.module.css";
import users from "../../data/users.json";
import proofImg from "./assets/blockpulse-oracle.png";

const STATUS_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";

// ⏱️ Preview gratuite
const PREVIEW_DURATION_MS = 48 * 60 * 60 * 1000;
const PREVIEW_COOKIE = "bp_preview_start";

// 🔢 Starter
const STARTER_DAILY_LIMIT = 10;

/** 🔐 Mini-session (tab) */
const AUTH_TOKEN_KEY = "bp_auth_token";

function getPreviewStart() {
  const match = document.cookie.match(
    new RegExp("(^| )" + PREVIEW_COOKIE + "=([^;]+)")
  );
  return match ? parseInt(match[2], 10) : null;
}

function setPreviewStart(ts) {
  document.cookie = `${PREVIEW_COOKIE}=${ts}; path=/; max-age=${
    60 * 60 * 24 * 365
  }`;
}

function getTodayKey(token = "guest") {
  const d = new Date().toISOString().slice(0, 10);
  return `bp_insight_${token}_${d}`;
}

function getSessionToken() {
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

/* ================== ESTIMATION FRAIS (SANS API) ================== */
function estimateFees({ hashrate, age }) {
  if (!hashrate || age === null) {
    return {
      level: "unknown",
      label: "Indéterminé",
      emoji: "⏳",
      advice: "Données insuffisantes pour estimer les frais.",
    };
  }

  // règles simples & lisibles
  if (hashrate > 5000 && age < 30) {
    return {
      level: "low",
      label: "Faibles",
      emoji: "🟢",
      advice: "Bon moment pour envoyer une transaction.",
    };
  }

  if (hashrate > 2000 && age < 90) {
    return {
      level: "medium",
      label: "Moyens",
      emoji: "🟡",
      advice: "Envoi possible, mais pas optimal.",
    };
  }

  return {
    level: "high",
    label: "Élevés",
    emoji: "🔴",
    advice: "Attendre recommandé si possible.",
    };
}

export default function Esp32InsightCardPhysical({ user }) {
  /* ================== USER ================== */
  const [showProof, setShowProof] = useState(false);
  const effectiveUser = useMemo(() => {
    if (user?.token) {
      return users.find((u) => u.token === user.token) || null;
    }

    const sessionToken = getSessionToken();
    if (!sessionToken) return null;

    return users.find((u) => u.token === sessionToken) || null;
  }, [user]);

  const safeUser = effectiveUser || { plan: "free", token: "guest" };
  const plan = safeUser.plan;

  const isFree = plan === "free";
  const isStarter = plan === "starter";
  const isPro = plan === "pro";

  const isOnInsightPage =
  typeof window !== "undefined" &&
  window.location.pathname.endsWith("/tools/bitcoin-actif");

  /* ================== STATE ================== */
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [previewExpired, setPreviewExpired] = useState(false);
  const [usedToday, setUsedToday] = useState(0);

  /* ================== PREVIEW FREE ================== */
  useEffect(() => {
    if (!isFree) return;

    const start = getPreviewStart();
    const now = Date.now();

    if (start === null) {
    setPreviewStart(now);
    setPreviewExpired(false);
    } else {
    setPreviewExpired(now - start > PREVIEW_DURATION_MS);
    }

  }, [isFree]);

  /* ================== CREDITS STARTER ================== */
  useEffect(() => {
    if (!isStarter) {
      setUsedToday(0);
      return;
    }

    const key = getTodayKey(safeUser.token);
    const used = Number(localStorage.getItem(key) || "0");
    setUsedToday(used);
  }, [isStarter, safeUser.token]);

  /* ================== FETCH ESP32 ================== */
  useEffect(() => {
    if (isFree && previewExpired) return;
    if (isStarter && usedToday >= STARTER_DAILY_LIMIT) return;

    const load = async () => {
      try {
        const res = await fetch(STATUS_ENDPOINT, { cache: "no-cache" });
        if (!res.ok) throw new Error();

        const json = await res.json();
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
  }, [previewExpired, isFree, isStarter, isPro, usedToday]);

  function consumeStarterCredit() {
    if (!isStarter) return;

    const key = getTodayKey(safeUser.token);
    const used = Number(localStorage.getItem(key) || "0");

    if (used >= STARTER_DAILY_LIMIT) return;

    const next = used + 1;
    localStorage.setItem(key, String(next));
    setUsedToday(next);
  }

  const age =
    lastUpdate ? Math.floor((Date.now() - lastUpdate.getTime()) / 1000) : null;

  const isLocked =
    (isFree && previewExpired) ||
    (isStarter && usedToday >= STARTER_DAILY_LIMIT);

  const feeEstimate = useMemo(() => {
    return estimateFees({
      hashrate: data?.hashrate,
      age,
    });
  }, [data, age]);

  /* ================== RENDER ================== */
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        🧠 BlockPulse Insight — Analyse ESP32 en direct
      </div>

      <div className={styles.badgeInfo}>
        ✅ Source physique indépendante — module matériel actif (sans API publique)
        </div>

      <div className={styles.proofRow}>
        <span className={styles.proofText}>
          Données vérifiées par un capteur matériel indépendant.
        </span>
        <button
          type="button"
          className={styles.proofBtn}
          onClick={() => setShowProof(true)}
        >
          Voir le capteur
        </button>
      </div>

      {isStarter && (
        <div className={styles.badgeInfo}>
          🔢 Accès restants aujourd’hui :{" "}
          <strong>{STARTER_DAILY_LIMIT - usedToday}</strong>
        </div>
      )}

      {isLocked && (
        <div className={styles.badgeLock}>🔒 Réservé Starter / Pro</div>
      )}

      {error && (
        <div className={styles.error}>
          Impossible de récupérer les données ESP32.
        </div>
      )}

      {!error && data && !isLocked && (
        <div className={styles.content}>
          <div className={styles.row}>
            <span>Source</span>
            <strong>ESP32 physique (BlockPulse)</strong>
          </div>

          <div className={styles.row}>
            <span>Hashrate détecté</span>
            <strong>{data.hashrate}</strong>
          </div>

          <div className={styles.row}>
            <span>Dernière mise à jour</span>
            <strong>{age !== null ? `il y a ${age}s` : "—"}</strong>
          </div>

          <div className={styles.row}>
            <span>Plan</span>
            <strong>{plan.toUpperCase()}</strong>
          </div>

          {/* 💸 NOUVELLE SECTION FRAIS */}
          <div className={styles.row}>
            <span>Frais de transaction (estimation)</span>
            <strong>
              {feeEstimate.emoji} {feeEstimate.label}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Conseil</span>
            <strong>{feeEstimate.advice}</strong>
          </div>

          {(isStarter || isPro) && !isOnInsightPage && (
            <div className={styles.upgrade}>
              <a
                href="/tools/bitcoin-actif"
                className={styles.upgradeBtn}
                onClick={() => {
                  if (isStarter) consumeStarterCredit();
                }}
              >
                🚀 Accéder à l’analyse ESP32
              </a>
            </div>
          )}
        </div>
      )}

      {isLocked && (
        <div className={styles.upgrade}>
          <a href="/#abonnements" className={styles.upgradeBtn}>
            Choisir Starter / Pro
          </a>
        </div>
      )}

      <div className={styles.footer}>
        Estimation basée sur l’observation directe du réseau via un module ESP32
        (sans API tierce).
      </div>

      {showProof && (
  <div className={styles.proofOverlay} onClick={() => setShowProof(false)}>
    <div className={styles.proofModal} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={styles.proofClose}
        onClick={() => setShowProof(false)}
        aria-label="Fermer"
      >
        ✕
      </button>

      <img
        src={proofImg}
        alt="Capteur BlockPulse (preuve matérielle)"
        className={styles.proofImg}
      />

      <div className={styles.proofCaption}>
        Capteur BlockPulse — preuve matérielle (état en temps réel).
      </div>
    </div>
  </div>
)}

    </div>
    
  );
}








