import { useEffect } from "react";
import styles from "./PolitiqueCookies.module.css";

export default function PolitiqueCookiesEN() {
  // 🔝 Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Cookie policy</h1>

        {/* ======================
            INTRODUCTION
        ====================== */}
        <section id="introduction">
          <p>
            This cookie policy explains how the
            <strong> BlockPulse.be</strong> website uses cookies and similar
            tracking technologies, in accordance with European regulations
            (GDPR and ePrivacy Directive).
          </p>
        </section>

        {/* ======================
            WHAT IS A COOKIE
        ====================== */}
        <section id="definition">
          <h2>What is a cookie?</h2>
          <p>
            A cookie is a small text file stored on your device when you visit a
            website. It allows, among other things, user recognition, preference
            storage, or the collection of statistical information.
          </p>
        </section>

        {/* ======================
            TYPES OF COOKIES
        ====================== */}
        <section id="types">
          <h2>Types of cookies used</h2>
          <p>
            The BlockPulse website uses the following categories of cookies:
          </p>
          <ul>
            <li>
              <strong>Strictly necessary cookies:</strong> essential for the
              proper functioning of the website (navigation, security, access
              to protected areas).
            </li>
            <li>
              <strong>Audience measurement cookies:</strong> used to analyze
              website usage and improve performance, only with your consent.
            </li>
            <li>
              <strong>Marketing cookies:</strong> may be used for advertising or
              remarketing campaigns, only with your consent.
            </li>
          </ul>
        </section>

        {/* ======================
            CONSENT
        ====================== */}
        <section id="consent">
          <h2>Consent</h2>
          <p>
            During your first visit to the website, a cookie management banner
            allows you to accept, refuse, or customize the use of non-essential
            cookies.
          </p>
          <p>
            No non-essential cookies are placed without your prior consent.
          </p>
        </section>

        {/* ======================
            RETENTION PERIOD
        ====================== */}
        <section id="duration">
          <h2>Retention period</h2>
          <p>
            Cookies are stored for a maximum period of
            <strong> 13 months</strong>, in accordance with European authority
            recommendations, unless a legal obligation requires otherwise.
          </p>
        </section>

        {/* ======================
            COOKIE MANAGEMENT
        ====================== */}
        <section id="management">
          <h2>Managing cookies</h2>
          <p>
            You can modify your cookie preferences at any time via the cookie
            management module available on the website or by configuring your
            browser settings.
          </p>
        </section>

        {/* ======================
            POLICY CHANGES
        ====================== */}
        <section id="changes">
          <h2>Policy changes</h2>
          <p>
            This cookie policy may be updated at any time to reflect legal,
            technical, or functional changes to the website.
          </p>
        </section>
      </div>
    </main>
  );
}
