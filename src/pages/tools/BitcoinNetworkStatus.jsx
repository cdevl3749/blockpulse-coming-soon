import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BitcoinActif.module.css";
import Esp32InsightCardPhysicalEN from "./Esp32InsightCardPhysicalEN";
import users from "../../data/users.json";

/* ================== ENDPOINTS ================== */
const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";
const LOCAL_ENDPOINT = import.meta.env.VITE_ESP32_LOCAL_STATUS || null;

/* ================== AUTH SESSION ================== */
const AUTH_TOKEN_KEY = "bp_auth_token";

/* ================== STARTER ================== */
const STARTER_DAILY_LIMIT = 10;

function getTodayKey(token) {
  const d = new Date().toISOString().slice(0, 10);
  return `bp_insight_${token}_${d}`;
}

function consumeStarterCreditOnce(token) {
  if (!token) return;

  const key = getTodayKey(token);
  const usedRaw = localStorage.getItem(key);
  const used = Number(usedRaw || "0");

  if (Number.isNaN(used)) {
    localStorage.setItem(key, "1");
    return;
  }

  if (used >= STARTER_DAILY_LIMIT) return;

  localStorage.setItem(key, String(used + 1));
}

/* ================== UTILS ================== */
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

function secondsSince(date) {
  if (!date) return null;
  return Math.floor((Date.now() - date.getTime()) / 1000);
}

/* ================== SESSION TOKEN (SAFE) ================== */
function getSessionToken() {
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

/* ================== STABILITÉ RÉSEAU ================== */
function getStabilityFromData({ data, lastUpdate, error, isLoading }) {
  if (isLoading) {
    return {
      level: "loading",
      score: "—",
      emoji: "⏳",
      title: "Synchronizing the Bitcoin network",
      subtitle: "Fetching live measurements from the physical module.",
    };
  }

  if (error || !data || !lastUpdate) {
    return {
      level: "down",
      score: 30,
      emoji: "🔴",
      title: "Bitcoin network unstable",
      subtitle: "Network stability cannot be evaluated right now.",
    };
  }

  const hashrate = Number(data.hashrate || 0);
  const ageSec = secondsSince(lastUpdate);

  if (ageSec !== null && ageSec > 90) {
    return {
      level: "partial",
      score: 55,
      emoji: "🟡",
      title: "Bitcoin network fluctuating",
      subtitle: "Network is running, but conditions may change.",
    };
  }

  if (hashrate > 0) {
    return {
      level: "ok",
      score: 82,
      emoji: "🟢",
      title: "Bitcoin network stable",
      subtitle: "Smooth broadcasting, more predictable fees and confirmation times.",
    };
  }

  return {
    level: "partial",
    score: 60,
    emoji: "🟡",
    title: "Bitcoin network fluctuating",
    subtitle: "Low or irregular activity detected.",
  };
}

/* ================== PAGE ================== */
export default function BitcoinNetworkStatus() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stableTicks, setStableTicks] = useState(0);

  /* ================== USER SESSION ================== */
  const sessionToken = useMemo(() => getSessionToken(), []);
  const sessionUser = useMemo(() => {
    if (!sessionToken) return null;
    return users.find((u) => u.token === sessionToken) || null;
  }, [sessionToken]);

  const plan = sessionUser?.plan || "free";
  const isTrial = sessionUser?.trial === true;

  const sessionUserProp = useMemo(
    () => (sessionToken ? { token: sessionToken } : null),
    [sessionToken]
  );

  /* ================== 📖 MICRO BADGE (CONNECTÉ) ================== */
  const badgeLabel = useMemo(() => {
    if (!sessionToken || !sessionUser) return null;

    if (plan === "pro" && isTrial) return "Connected: Pro Trial";
    if (plan === "pro") return "Connected: Pro";
    if (plan === "starter") return "Connected: Starter";
    return "Connected: Free";
  }, [sessionToken, sessionUser, plan, isTrial]);

 /* ================== ✅ STARTER : consommer 1 accès à l’entrée de l’outil ================== */
    useEffect(() => {
    if (!sessionUser || !sessionToken) return;
    if (plan !== "starter") return;

    consumeStarterCreditOnce(sessionToken);
    }, [sessionUser, sessionToken, plan]);

  /* ================== SEO ================== */
  useEffect(() => {
    document.title = "Bitcoin network status in real time | BlockPulse";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Check the current Bitcoin network status before sending a transaction. Real-time stability measured via independent ESP32 hardware (no third-party APIs).";
  }, []);

  /* ================== DATA LOAD ================== */
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
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ================== STABILITY ================== */
  const stability = useMemo(
    () => getStabilityFromData({ data, lastUpdate, error, isLoading }),
    [data, lastUpdate, error, isLoading]
  );

  /* ================== CONSEIL DU MOMENT ================== */
  const advice = useMemo(() => {
    if (stability.level === "ok" && stability.score >= 75) {
      return {
        emoji: "🟢",
        text: "Good time to broadcast a Bitcoin transaction.",
      };
    }
    if (stability.level === "partial") {
      return {
        emoji: "🟡",
        text:
          "Conditions are variable. Transaction is possible, but fees or confirmation time may vary.",
      };
    }
    if (stability.level === "loading") {
      return { emoji: "⏳", text: "Synchronizing network data." };
    }
    return {
      emoji: "🔴",
      text: "Better to wait if possible before sending a transaction.",
    };
  }, [stability]);

  /* ================== CONTEXTE TEMPOREL ================== */
  useEffect(() => {
    if (stability.level === "ok") {
      setStableTicks((v) => v + 1);
    } else {
      setStableTicks(0);
    }
  }, [stability.level]);

  /* ================== INDICATEURS ================== */
  const indicators = useMemo(() => {
    if (stability.level === "ok") {
      return [
        { label: "Network congestion", state: "ok" },
        { label: "Predictable fees", state: "ok" },
        { label: "Normal confirmation times", state: "ok" },
      ];
    }

    if (stability.level === "partial") {
      return [
        { label: "Network congestion", state: "warn" },
        { label: "Variable fees", state: "warn" },
        { label: "Variable confirmation times", state: "warn" },
      ];
    }

    if (stability.level === "loading") {
      return [
        { label: "Synchronizing", state: "warn" },
        { label: "Network measurement", state: "warn" },
        { label: "ESP32 module active", state: "warn" },
      ];
    }

    return [
      { label: "High congestion", state: "down" },
      { label: "Unpredictable fees", state: "down" },
      { label: "Extended confirmation times", state: "down" },
    ];
  }, [stability.level]);

  const age = secondsSince(lastUpdate);

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        {/* ===== TOP BAR (badge + retour + logout) ===== */}
        {sessionToken && sessionUser && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Micro-badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: "14px",
              }}
              title={sessionUser?.email || ""}
            >
              <span>🟢</span>
              <span>{badgeLabel}</span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => navigate(`/en/mon-espace?token=${sessionToken}`)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ← Back to my space
              </button>

              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem(AUTH_TOKEN_KEY);
                  navigate("/en/mon-espace");
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}

        <h1 className={styles.h1}>Bitcoin network status in real time</h1>

        {/* ===== INTRO TEXT ===== */}
        <div className={styles.explain} style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
            This tool tells you{" "}
            <strong>when the Bitcoin network is favorable for broadcasting a transaction</strong>,
            based on{" "}
            <strong>real-time physical observation</strong>, not on public APIs.
          </p>
        </div>

        {/* ===== STATUS CARD ===== */}
        <div className={`${styles.statusCard} ${styles[stability.level]}`}>
          <div className={styles.statusTop}>
            <span className={styles.emoji}>{stability.emoji}</span>
            <div>
              <div className={styles.statusTitle}>
                {stability.title}{" "}
                {stability.score !== "—" && `— ${stability.score}/100`}
              </div>
              <div className={styles.statusSubtitle}>{stability.subtitle}</div>
            </div>
          </div>

          <div className={styles.meta}>
            <span
              title="Data observed directly by a physical ESP32 module analyzing Bitcoin network traffic. No third-party APIs or services are used."
              style={{ cursor: "help" }}
            >
              Source: <strong>physical ESP32 module</strong> (no public API) ℹ️
            </span>

            <span>
              Last update:{" "}
              <strong>{age === null ? "—" : `${age}s ago`}</strong>
            </span>
          </div>
        </div>

                {/* ===== TRAFFIC LIGHT — DECISION GUIDE ===== */}
        <div className={styles.explain} style={{ marginTop: "12px" }}>
          <p>
            <strong>Think of BlockPulse like a traffic light:</strong>
            <br />
            🟢 <strong>Stable</strong> → favorable moment to send
            <br />
            🟡 <strong>Unstable</strong> → proceed with caution
            <br />
            🔴 <strong>Congested</strong> → better to wait
          </p>
        </div>


        {/* ===== CONSEIL ===== */}
        <div className={styles.explain}>
          <p>
            <strong>{advice.emoji} Recommendation</strong>
            <br />
            {advice.text}
          </p>
        </div>

        {stableTicks >= 3 && (
          <div className={styles.explain}>
            <p>⏱️ Stable conditions observed for several minutes.</p>
          </div>
        )}

        <div className={styles.indicators}>
          {indicators.map((item, idx) => (
            <div key={idx} className={styles.indicator}>
              {(item.state === "ok" && "✓") ||
                (item.state === "warn" && "⚠ ") ||
                "✖"}{" "}
              {item.label}
            </div>
          ))}
        </div>

        <div className={styles.explain}>
          <p>
            This indicator is based on direct observation of the Bitcoin network via a{" "}
            <strong>physical ESP32 module</strong>, without relying on third-party services.
          </p>
        </div>

        {/* ===== ESP32 INSIGHT CARD ===== */}
        <Esp32InsightCardPhysicalEN user={sessionUserProp} />

        {/* ===== CTA (COHÉRENT SELON PLAN) ===== */}
<div
  className={styles.ctaBox}
  style={{
    paddingTop: "24px",
    paddingBottom: "24px",
  }}
>
  <div
    className={styles.ctaTitle}
    style={{ marginBottom: "12px !important" }}
  >
    🔍 Go further
  </div>

  <p
    style={{
      margin: "0 !important",
      marginBottom: "8px !important",
      lineHeight: "1.5",
    }}
  >
    The indicators shown above are calculated from{" "}
    <strong>real-time physical data observations</strong>, not from theoretical
    estimates or third-party services.
  </p>

  <p
    style={{
      margin: "0 !important",
      marginBottom: "8px !important",
      lineHeight: "1.5",
    }}
  >
    By accessing the ESP32 analysis, you can view{" "}
    <strong>raw Bitcoin network signals</strong> (activity, stability, global
    conditions) and understand{" "}
    <strong>why the network is currently in this state</strong>.
  </p>

  <p
    style={{
      margin: "0 !important",
      marginBottom: "16px !important",
      opacity: 0.85,
      lineHeight: "1.5",
    }}
  >
    This access is reserved for users with a BlockPulse account.
  </p>

  <div className={styles.ctaRow}>
    <a className={styles.ctaBtn} href="/#temps-reel">
      See why the network is stable
    </a>

    {plan === "free" && (
      <a className={styles.ctaBtnAlt} href="/demande-acces">
        Try Pro for 7 days
      </a>
    )}

    {plan === "starter" && (
      <a className={styles.ctaBtnAlt} href="/abonnements">
        Upgrade to Pro
      </a>
    )}
  </div>
</div>

      </section>
    </div>
  );
}
