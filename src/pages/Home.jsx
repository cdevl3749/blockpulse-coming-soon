import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Home.module.css";
import beFlag from "../assets/be-flag.svg";

import HowItWorks from "@/components/home/HowItWorks";
import Differentiation from "@/components/home/Differentiation";
import WhatYouGet from "@/components/home/WhatYouGet";
import Pricing from "@/components/home/Pricing";
import PostPricingInfo from "@/components/home/PostPricingInfo";
import ESPPreview from "@/components/esp/ESPPreview";
import CTAAfterESP from "@/components/home/CTAAfterESP";
import MicroFAQ from "@/components/home/MicroFAQ";
import CookieBanner from "@/components/CookieBanner";
import WhoItsFor from "@/components/home/WhoItsFor";

export default function Home() {
  const location = useLocation();

  // 🔢 Alternance dynamique du nombre d'utilisateurs actifs
  const [activeUsers, setActiveUsers] = useState(12);

  useEffect(() => {
    const userCounts = [12, 15, 18, 22, 28, 31, 35];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % userCounts.length;
      setActiveUsers(userCounts[index]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // 📽 Gestion du scroll vers les sections
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash, location.pathname]);

  // 🔥 Scroll vers ESP32
  const scrollToESP = (e) => {
    e.preventDefault();
    const espSection = document.getElementById("temps-reel");
    if (espSection) {
      espSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          {/* 🎯 Message clé – accès sans compte */}
            <div
            style={{
                marginBottom: "20px",
                padding: "10px 14px",
                borderRadius: "8px",
                background: "rgba(0, 255, 136, 0.06)",
                fontSize: "14px",
            }}
            >
            ⚡ <strong>Vous n’avez pas besoin de BlockPulse tous les jours.</strong>
            <br />
            Consultez l’état actuel du réseau Bitcoin librement, sans créer de compte.
            </div>

          <h1>
            BlockPulse vous dit simplement{" "}
            <span>si c’est un bon moment</span> pour envoyer une transaction
            Bitcoin
          </h1>

          <p className={styles.subtitle}>
            Un signal clair — bon, neutre ou mauvais moment — pour décider en
            quelques secondes, sans analyser des graphiques ou des données
            techniques.
          </p>

          {/* Badge crédibilité */}
          <div
            style={{
              marginTop: "18px",
              marginBottom: "22px",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(0, 255, 136, 0.08)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "#caffea",
            }}
          >
            <span>
              🟢 <strong>Source indépendante</strong> : observation directe du
              réseau Bitcoin
            </span>

            <a
              href="/tools/bitcoin-actif?utm_source=home&utm_medium=badge&utm_campaign=v3"
              style={{
                marginLeft: "8px",
                fontWeight: 600,
                color: "#00ff88",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              → Voir en direct
            </a>
          </div>

          <div className={styles.cta}>
            {/* CTA PRINCIPAL */}
          <a
            href="#temps-reel"
            onClick={scrollToESP}
            className={styles.primaryBtn}
            >
            Voir l’état actuel du réseau Bitcoin
            </a>

            {/* CTA SECONDAIRE */}
            <a
              href="#temps-reel"
              onClick={scrollToESP}
              style={{ marginTop: "10px", fontSize: "14px", opacity: 0.7 }}
            >
              Voir les données en direct →
            </a>

            <span className={styles.note}>
              <img className={styles.flag} src={beFlag} alt="Belgique" />
             Projet belge · Données en temps réel ·
             Accès libre sans compte ·
             Abonnement uniquement pour les analyses avancées
            </span>
          </div>
        </div>
      </section>

      {/* FONCTIONNEMENT */}
      <section id="fonctionnement">
        <HowItWorks />
      </section>

      {/* DIFFÉRENCIATION */}
      <Differentiation />

      {/* POUR QUI ? */}
      <WhoItsFor />

      {/* CE QUE VOUS RECEVEZ */}
      <WhatYouGet />

      {/* ABONNEMENTS */}
      <section id="abonnements">
        <Pricing />
        <PostPricingInfo />
      </section>

      {/* ESP32 LIVE */}
      <section id="temps-reel">
        <ESPPreview />
      </section>

      {/* CTA */}
      <CTAAfterESP />

      {/* FAQ */}
      <section id="faq">
        <MicroFAQ />
      </section>

      <CookieBanner />
    </>
  );
}
