import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Home.module.css";
import beFlag from "../assets/be-flag.svg";

import HowItWorksEN from "@/components/home/HowItWorksEN";
import DifferentiationEN from "@/components/home/DifferentiationEN";
import WhatYouGetEN from "@/components/home/WhatYouGetEN";
import PricingEN from "@/components/home/PricingEN";
import PostPricingInfoEN from "@/components/home/PostPricingInfoEN";
import ESPPreviewEN from "@/components/esp/ESPPreviewEN";
import CTAAfterESPEN from "@/components/home/CTAAfterESPEN";
import MicroFAQEN from "@/components/home/MicroFAQEN";
import CookieBanner from "@/components/CookieBanner";
import WhoItsForEN from "@/components/home/WhoItsForEN";

export default function HomeEN() {
  const location = useLocation();

  // 🔢 Dynamic active users (same logic)
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

  // 📽 Scroll handling
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

  // 🔥 Scroll to ESP32 section
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
          {/* 🎯 7-day Pro trial */}
          <div
            style={{
              marginBottom: "20px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(255, 215, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            <span>
              🎯 <strong>7-day Pro access included</strong> — try it with no
              commitment
            </span>

            <a
              href="/en/demande-acces"
              style={{
                whiteSpace: "nowrap",
                padding: "6px 12px",
                borderRadius: "6px",
                background: "#FFD700",
                color: "#000",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "13px",
              }}
            >
              Try it for free
            </a>
          </div>

          <h1>
            BlockPulse simply tells you{" "}
            <span>if it’s a good time</span> to send a Bitcoin transaction
          </h1>

          <p className={styles.subtitle}>
            A clear signal — good, neutral or bad timing — to decide in seconds,
            without analyzing charts or technical data.
          </p>

          {/* Credibility badge */}
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
              🟢 <strong>Independent source</strong> : direct observation of the
              Bitcoin network
            </span>

            <a
              href="/en/tools/bitcoin-actif?utm_source=home&utm_medium=badge&utm_campaign=v3"
              style={{
                marginLeft: "8px",
                fontWeight: 600,
                color: "#00ff88",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              → View live
            </a>
          </div>

          <div className={styles.cta}>
            {/* PRIMARY CTA */}
            <a href="/en/demande-acces" className={styles.primaryBtn}>
              Try free for 7 days
            </a>

            {/* SECONDARY CTA */}
            <a
              href="#temps-reel"
              onClick={scrollToESP}
              style={{ marginTop: "10px", fontSize: "14px", opacity: 0.7 }}
            >
              View live data →
            </a>

            <span className={styles.note}>
              <img className={styles.flag} src={beFlag} alt="Belgium" />
              Belgian project · Real-time data · Subscription access · Cancel
              anytime
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="fonctionnement">
        <HowItWorksEN />
      </section>

      {/* DIFFERENTIATION */}
      <DifferentiationEN />

      {/* WHO IT'S FOR */}
      <WhoItsForEN />

      {/* WHAT YOU GET */}
      <WhatYouGetEN />

      {/* PRICING */}
      <section id="abonnements">
        <PricingEN />
        <PostPricingInfoEN />
      </section>

      {/* ESP32 LIVE */}
      <section id="temps-reel">
        <ESPPreviewEN />
      </section>

      {/* CTA */}
      <CTAAfterESPEN />

      {/* FAQ */}
      <section id="faq">
        <MicroFAQEN />
      </section>

      <CookieBanner />
    </>
  );
}
