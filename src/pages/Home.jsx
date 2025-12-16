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
    }, 4500); // Change toutes les 4.5 secondes

    return () => clearInterval(interval);
  }, []);

  // 📽 Gestion du scroll vers les sections (footer / header)
  useEffect(() => {
    if (!location.hash) {
      // Si pas de hash, remonter en haut
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      // petit délai pour être sûr que tout est monté
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash, location.pathname]);

  // 🔥 Fonction pour scroller vers la section ESP32
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
          <h1>
            Accédez aux données Bitcoin <span>en temps réel</span> depuis un module physique
          </h1>

          <p className={styles.subtitle}>
            Recevez des alertes crypto instantanées et des données techniques mesurées par notre module ESP32 physique. Fiable, indépendant, et alimenté par le réseau Bitcoin.
          </p>

          <div className={styles.cta}>
            <button
            type="button"
            className={styles.primaryBtn}
            onClick={scrollToESP}
            >
            Voir les données en direct
            </button>

            <span className={styles.note}>
            <img className={styles.flag} src={beFlag} alt="Belgique" />
            Projet belge · {activeUsers} utilisateurs actifs · Annulez quand vous voulez
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

      {/* CE QUE VOUS RECEVEZ */}
      <WhatYouGet />

      {/* ABONNEMENTS */}
      <section id="abonnements">
        <Pricing />
        <PostPricingInfo />
      </section>

      {/* ESP32 LIVE */}
      <ESPPreview />

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