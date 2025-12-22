import React, { useEffect, useMemo, useState } from "react";
import styles from "./BitcoinActif.module.css";

/* ================== ENDPOINTS (IDENTIQUES À ESPPreview) ================== */
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

function getStatusFromData({ data, lastUpdate, error }) {
  if (error || !data || !lastUpdate) {
    return {
      level: "down",
      emoji: "🔴",
      title: "Données indisponibles",
      subtitle: "Impossible de vérifier l’activité du réseau pour le moment.",
    };
  }

  const hashrate = Number(data.hashrate || 0);
  const ageSec = secondsSince(lastUpdate);

  if (ageSec !== null && ageSec > 90) {
    return {
      level: "partial",
      emoji: "🟡",
      title: "Bitcoin partiellement actif",
      subtitle: "Le flux répond, mais la mise à jour semble irrégulière.",
    };
  }

  if (hashrate > 0) {
    return {
      level: "ok",
      emoji: "🟢",
      title: "Oui — Bitcoin est actif en ce moment",
      subtitle: "Le réseau répond et l’activité est détectée.",
    };
  }

  return {
    level: "partial",
    emoji: "🟡",
    title: "Bitcoin partiellement actif",
    subtitle: "Le flux répond, mais l’activité détectée est faible ou nulle.",
  };
}

/* ================== PAGE ================== */
export default function BitcoinActif() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  /* ================== SEO ================== */
  useEffect(() => {
    document.title = "Bitcoin est-il actif en ce moment ? | BlockPulse";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Vérifiez instantanément si le réseau Bitcoin est actif en ce moment. Indicateur simple, données en temps réel, sans API publique.";
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
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const status = useMemo(
    () => getStatusFromData({ data, lastUpdate, error }),
    [data, lastUpdate, error]
  );

  /* ================== INDICATEURS ================== */
  const indicators = useMemo(() => {
    if (status.level === "ok") {
      return [
        { label: "Réseau accessible", state: "ok" },
        { label: "Données continues", state: "ok" },
        { label: "Source physique (ESP32)", state: "ok" },
      ];
    }

    if (status.level === "partial") {
      return [
        { label: "Réseau accessible", state: "ok" },
        { label: "Données continues", state: "warn" },
        { label: "Source physique (ESP32)", state: "ok" },
      ];
    }

    return [
      { label: "Réseau accessible", state: "down" },
      { label: "Données continues", state: "down" },
      { label: "Source physique (ESP32)", state: "warn" },
    ];
  }, [status.level]);

  const age = secondsSince(lastUpdate);

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.h1}>Bitcoin est-il actif en ce moment ?</h1>

        <div className={`${styles.statusCard} ${styles[status.level]}`}>
          <div className={styles.statusTop}>
            <span className={styles.emoji}>{status.emoji}</span>
            <div>
              <div className={styles.statusTitle}>{status.title}</div>
              <div className={styles.statusSubtitle}>{status.subtitle}</div>
            </div>
          </div>

          <div className={styles.meta}>
            <span>
              Source : <strong>module physique ESP32</strong> (sans API publique)
            </span>
            <span>
              Dernière vérification :{" "}
              <strong>{age === null ? "—" : `il y a ${age}s`}</strong>
            </span>
          </div>
        </div>

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

        <div className={styles.explain}>
          <p>
            Cet outil donne un indicateur <strong>simple</strong> pour savoir si
            Bitcoin est actif, sans jargon et sans dépendre de services tiers.
          </p>
          <p>
            Les données proviennent d’un <strong>module ESP32</strong> connecté
            en continu au réseau, afin d’observer l’activité en temps réel.
          </p>
          <p>
            Cet indicateur permet aussi de vérifier si le réseau Bitcoin fonctionne
            normalement, s’il répond correctement et s’il est utilisable à l’instant présent.
          </p>
        </div>

        {/* ===== MINI FAQ ===== */}
        <div className={styles.explain}>
          <p>
            <strong>Que signifie “Bitcoin est actif” ?</strong>
            <br />
            Cela signifie que le réseau Bitcoin répond normalement et que de
            l’activité est détectée en temps réel.
            </p>

            <p>
            Nous proposons aussi un outil gratuit pour savoir si{" "}
            <a href="/tools/bitcoin-actif">
                Bitcoin est actif en ce moment
            </a>.
          </p>
          <p>
            <strong>Est-ce fiable ?</strong>
            <br />
            Oui. L’indicateur est basé sur une observation directe du réseau via
            un module physique ESP32, sans dépendre d’APIs publiques.
          </p>
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaTitle}>🔓 Aller plus loin</div>
          <p className={styles.ctaText}>
           Voir les données en temps réel et comprendre plus en détail
           comment le réseau Bitcoin se comporte.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.ctaBtn} href="/#temps-reel">
              Voir les données en direct
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
