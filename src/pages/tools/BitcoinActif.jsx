import React, { useEffect, useMemo, useState } from "react";
import styles from "./BitcoinActif.module.css";

/* ================== ENDPOINTS ================== */
const CLOUD_ENDPOINT = "https://blockpulse.be/.netlify/functions/status";
const LOCAL_ENDPOINT = import.meta.env.VITE_ESP32_LOCAL_STATUS || null;

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

/* ================== STABILITÉ RÉSEAU ================== */
function getStabilityFromData({ data, lastUpdate, error }) {
  if (error || !data || !lastUpdate) {
    return {
      level: "down",
      score: 30,
      emoji: "🔴",
      title: "Réseau Bitcoin instable",
      subtitle: "Les données ne permettent pas d’évaluer la stabilité pour le moment.",
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Compteur de stabilité (contexte temporel)
  const [stableTicks, setStableTicks] = useState(0);

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
      } catch {
        setError(true);
      }
    };

    load();
    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  /* ================== STABILITY ================== */
  const stability = useMemo(
    () => getStabilityFromData({ data, lastUpdate, error }),
    [data, lastUpdate, error]
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
        text: "Conditions variables. Envoi possible, mais frais ou délais peuvent varier.",
      };
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
        <h1 className={styles.h1}>Stabilité du réseau Bitcoin en temps réel</h1>

        {/* ===== STATUS CARD ===== */}
        <div className={`${styles.statusCard} ${styles[stability.level]}`}>
          <div className={styles.statusTop}>
            <span className={styles.emoji}>{stability.emoji}</span>
            <div>
              <div className={styles.statusTitle}>
                {stability.title} — {stability.score}/100
              </div>
              <div className={styles.statusSubtitle}>{stability.subtitle}</div>
            </div>
          </div>

          <div className={styles.meta}>
            <span>
              Source : <strong>module physique ESP32</strong> (sans API publique)
            </span>
            <span>
              Dernière mise à jour :{" "}
              <strong>{age === null ? "—" : `il y a ${age}s`}</strong>
            </span>
          </div>
        </div>

        {/* ===== CONSEIL DU MOMENT ===== */}
        <div className={styles.explain}>
          <p>
            <strong>{advice.emoji} Conseil du moment</strong>
            <br />
            {advice.text}
          </p>
        </div>

        {/* ===== CONTEXTE TEMPOREL ===== */}
        {stableTicks >= 3 && (
          <div className={styles.explain}>
            <p>⏱️ Conditions stables observées depuis plusieurs minutes.</p>
          </div>
        )}

        {/* ===== INDICATORS ===== */}
        <div className={styles.indicators}>
          {indicators.map((item, idx) => {
            let icon = "✔";
            if (item.state === "warn") icon = "⚠";
            if (item.state === "down") icon = "✖";

            return (
              <div key={idx} className={styles.indicator}>
                {icon} {item.label}
              </div>
            );
          })}
        </div>

        {/* ===== EXPLICATION ===== */}
        <div className={styles.explain}>
          <p>
            La <strong>stabilité du réseau Bitcoin</strong> permet de savoir
            s’il est préférable d’envoyer une transaction maintenant ou d’attendre.
          </p>
          <p>
            Cet indicateur repose sur une observation directe du réseau via
            un <strong>module ESP32</strong>, sans dépendre de services tiers.
          </p>
        </div>

        {/* ===== CTA ===== */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaTitle}>🔓 Aller plus loin</div>
          <p className={styles.ctaText}>
            Consultez les données ESP32 en direct pour comprendre
            pourquoi le réseau est actuellement dans cet état.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.ctaBtn} href="/#temps-reel">
              Voir pourquoi le réseau est stable
            </a>
            <a className={styles.ctaBtnAlt} href="/demande-acces">
              Essai Pro 7 jours
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

