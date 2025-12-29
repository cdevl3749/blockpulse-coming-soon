import { useEffect, useMemo, useState } from "react";
import styles from "./Esp32InsightCard.module.css";
import users from "../../data/users.json";

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
      label: "Unknown",
      emoji: "⏳",
      advice: "Not enough data to estimate fees.",
    };
  }

  // règles simples & lisibles
  if (hashrate > 5000 && age < 30) {
    return {
      level: "low",
      label: "Low",
      emoji: "🟢",
      advice: "Good time to broadcast a transaction.",
    };
  }

  if (hashrate > 2000 && age < 90) {
    return {
      level: "medium",
      label: "Medium",
      emoji: "🟡",
      advice: "Transaction possible, but not optimal.",
    };
  }

  return {
    level: "high",
    label: "High",
    emoji: "🔴",
    advice: "Better to wait if possible.",
    };
}

export default function Esp32InsightCardEN({ user }) {
  /* ================== USER ================== */
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
    window.location.pathname === "/tools/bitcoin-network-status";

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
        🧠 BlockPulse Insight — Live ESP32 analysis
      </div>

      {isStarter && (
        <div className={styles.badgeInfo}>
          🔢 Remaining accesses today :{" "}
          <strong>{STARTER_DAILY_LIMIT - usedToday}</strong>
        </div>
      )}

      {isLocked && (
        <div className={styles.badgeLock}>🔒 Reserved for Starter / Pro</div>
      )}

      {error && (
        <div className={styles.error}>
          Unable to fetch ESP32 data.
        </div>
      )}

      {!error && data && !isLocked && (
        <div className={styles.content}>
          <div className={styles.row}>
            <span>Source</span>
            <strong>ESP32 physique (BlockPulse)</strong>
          </div>

          <div className={styles.row}>
            <span>Detected hashrate</span>
            <strong>{data.hashrate}</strong>
          </div>

          <div className={styles.row}>
            <span>Last update</span>
            <strong>{age !== null ? `${age}s ago` : "—"}</strong>
          </div>

          <div className={styles.row}>
            <span>Plan</span>
            <strong>{plan.toUpperCase()}</strong>
          </div>

          {/* 💸 NOUVELLE SECTION FRAIS */}
          <div className={styles.row}>
            <span>Transaction fees (estimate)</span>
            <strong>
              {feeEstimate.emoji} {feeEstimate.label}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Recommendation</span>
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
                🚀 Open ESP32 analysis
              </a>
            </div>
          )}
        </div>
      )}

      {isLocked && (
        <div className={styles.upgrade}>
          <a href="/#abonnements" className={styles.upgradeBtn}>
            Choose Starter / Pro
          </a>
        </div>
      )}

      <div className={styles.footer}>
        Estimate based on direct network observation via an ESP32 module
        (no third-party API).
      </div>
    </div>
  );
}








