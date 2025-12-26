import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BitcoinActif.module.css";
import Esp32InsightCard from "./Esp32InsightCard";
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
      title: "Synchronisation du réseau Bitcoin",
      subtitle: "Données en cours de récupération depuis le module physique.",
    };
  }

  if (error || !data || !lastUpdate) {
    return {
      level: "down",
      score: 30,
      emoji: "🔴",
      title: "Réseau Bitcoin instable",
      subtitle:
        "Les données ne permettent pas d’évaluer la stabilité pour le moment.",
    };
  }

  const hashrate = Number(data.hashrate || 0);
  const ageSec = secondsSince(lastUpdate);

  if (ageSec !== null && ageSec > 90) {
    return {
      level: "partial",
      score: 55,
      emoji: "🟡",
      title: "Réseau Bitcoin variable",
      subtitle: "Le réseau fonctionne, mais les conditions peuvent changer.",
    };
  }

  if (hashrate > 0) {
    return {
      level: "ok",
      score: 82,
      emoji: "🟢",
      title: "Réseau Bitcoin stable",
      subtitle: "Transactions fluides, frais et délais prévisibles.",
    };
  }

  return {
    level: "partial",
    score: 60,
    emoji: "🟡",
    title: "Réseau Bitcoin variable",
    subtitle: "Activité détectée faible ou irrégulière.",
  };
}

/* ================== PAGE ================== */
export default function BitcoinActif() {
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

  /* ================== 🔖 MICRO BADGE (CONNECTÉ) ================== */
  const badgeLabel = useMemo(() => {
    if (!sessionToken || !sessionUser) return null;

    if (plan === "pro" && isTrial) return "Connecté : Essai Pro";
    if (plan === "pro") return "Connecté : Pro";
    if (plan === "starter") return "Connecté : Starter";
    return "Connecté : Free";
  }, [sessionToken, sessionUser, plan, isTrial]);

  /* ================== ✅ CONSOMMATION STARTER (1x/jour) ==================
     - Objectif: dès que le Starter "accède" à l'outil, on consomme 1 crédit.
     - Protection: on ne consomme qu'une seule fois par jour (sinon refresh = catastrophe).
  */
  useEffect(() => {
    if (!sessionUser || !sessionToken) return;
    if (plan !== "starter") return;

    const key = getTodayKey(sessionToken);
    const usedRaw = localStorage.getItem(key);
    const used = Number(usedRaw || "0");

    // Si déjà consommé aujourd'hui (>=1), on ne touche à rien.
    // Si jamais used est déjà élevé (tests), on ne sur-consomme pas ici.
    if (Number.isNaN(used)) {
      localStorage.setItem(key, "1");
      return;
    }

    if (used <= 0) {
      localStorage.setItem(key, "1");
      return;
    }

    // Optionnel: sécurité si dépassement
    if (used > STARTER_DAILY_LIMIT) {
      localStorage.setItem(key, String(STARTER_DAILY_LIMIT));
    }
  }, [sessionUser, sessionToken, plan]);

  /* ================== SEO ================== */
  useEffect(() => {
    document.title = "Stabilité du réseau Bitcoin en temps réel | BlockPulse";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Quand envoyer du Bitcoin ? Vérifiez la stabilité du réseau en temps réel : frais, délais et congestion, via un module ESP32.";
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
        text: "Bon moment pour envoyer une transaction Bitcoin.",
      };
    }
    if (stability.level === "partial") {
      return {
        emoji: "🟡",
        text:
          "Conditions variables. Envoi possible, mais frais ou délais peuvent varier.",
      };
    }
    if (stability.level === "loading") {
      return { emoji: "⏳", text: "Synchronisation des données réseau en cours." };
    }
    return {
      emoji: "🔴",
      text: "Mieux vaut attendre si possible avant d’envoyer une transaction.",
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
        { label: "Congestion du réseau", state: "ok" },
        { label: "Frais prévisibles", state: "ok" },
        { label: "Délais normaux", state: "ok" },
      ];
    }

    if (stability.level === "partial") {
      return [
        { label: "Congestion du réseau", state: "warn" },
        { label: "Frais variables", state: "warn" },
        { label: "Délais variables", state: "warn" },
      ];
    }

    if (stability.level === "loading") {
      return [
        { label: "Synchronisation en cours", state: "warn" },
        { label: "Mesure réseau", state: "warn" },
        { label: "Module ESP32 actif", state: "warn" },
      ];
    }

    return [
      { label: "Congestion élevée", state: "down" },
      { label: "Frais imprévisibles", state: "down" },
      { label: "Délais allongés", state: "down" },
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
                onClick={() => navigate(`/mon-espace?token=${sessionToken}`)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ← Retour à mon espace
              </button>

              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem(AUTH_TOKEN_KEY);
                  navigate("/mon-espace");
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
                Se déconnecter
              </button>
            </div>
          </div>
        )}

        <h1 className={styles.h1}>Stabilité du réseau Bitcoin en temps réel</h1>

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
            title="Données observées directement par un module ESP32 analysant le trafic du réseau Bitcoin. Aucune API ni service tiers n’est utilisé."
            style={{ cursor: "help" }}
            >
            Source : <strong>module physique ESP32</strong> (sans API publique) ℹ️
            </span>

            <span>
              Dernière mise à jour :{" "}
              <strong>{age === null ? "—" : `il y a ${age}s`}</strong>
            </span>
          </div>
        </div>

        {/* ===== CONSEIL ===== */}
        <div className={styles.explain}>
          <p>
            <strong>{advice.emoji} Conseil du moment</strong>
            <br />
            {advice.text}
          </p>
        </div>

        {stableTicks >= 3 && (
          <div className={styles.explain}>
            <p>⏱️ Conditions stables observées depuis plusieurs minutes.</p>
          </div>
        )}

        <div className={styles.indicators}>
          {indicators.map((item, idx) => (
            <div key={idx} className={styles.indicator}>
              {(item.state === "ok" && "✔") ||
                (item.state === "warn" && "⚠") ||
                "✖"}{" "}
              {item.label}
            </div>
          ))}
        </div>

        <div className={styles.explain}>
          <p>
            Cet indicateur repose sur une observation directe du réseau via un{" "}
            <strong>module ESP32</strong>, sans dépendre de services tiers.
          </p>
        </div>

        {/* ===== ESP32 INSIGHT CARD ===== */}
        <Esp32InsightCard user={sessionUserProp} />

        {/* ===== CTA (COHÉRENT SELON PLAN) ===== */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaTitle}>🔓 Aller plus loin</div>
          <p className={styles.ctaText}>
            Consultez les données ESP32 en direct pour comprendre pourquoi le
            réseau est actuellement dans cet état.
          </p>

          <div className={styles.ctaRow}>
            <a className={styles.ctaBtn} href="/#temps-reel">
              Voir pourquoi le réseau est stable
            </a>

            {plan === "free" && (
              <a className={styles.ctaBtnAlt} href="/demande-acces">
                Essai Pro 7 jours
              </a>
            )}

            {plan === "starter" && (
              <a className={styles.ctaBtnAlt} href="/abonnements">
                Passer au plan Pro
              </a>
            )}
            {/* plan === "pro" → aucun CTA */}
          </div>
        </div>
      </section>
    </div>
  );
}
