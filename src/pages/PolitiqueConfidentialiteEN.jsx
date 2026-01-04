import { useEffect } from "react";
import styles from "./PolitiqueConfidentialite.module.css";

export default function PolitiqueConfidentialiteEN() {
  // 🔝 Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Privacy policy</h1>

        {/* ======================
            INTRODUCTION
        ====================== */}
        <section id="introduction">
          <p>
            This privacy policy aims to inform users of the
            <strong> BlockPulse.be</strong> website about how their personal data
            is collected, used and protected, in accordance with the General
            Data Protection Regulation (GDPR).
          </p>
        </section>

        {/* ======================
            DATA CONTROLLER
        ====================== */}
        <section id="controller">
          <h2>Data controller</h2>
          <p>
            The controller of personal data processing is:
          </p>
          <ul>
            <li><strong>Name:</strong> BlockPulse</li>
            <li><strong>Country:</strong> Belgium</li>
            <li><strong>Email:</strong> contact@blockpulse.be</li>
          </ul>
        </section>

        {/* ======================
            DATA COLLECTED
        ====================== */}
        <section id="data-collected">
          <h2>Data collected</h2>
          <p>
            BlockPulse may collect the following personal data:
          </p>
          <ul>
            <li>Email address</li>
            <li>Login data (user account)</li>
            <li>Payment-related data (processed by third-party providers)</li>
            <li>Technical browsing data</li>
          </ul>
        </section>

        {/* ======================
            PURPOSES
        ====================== */}
        <section id="purposes">
          <h2>Purposes of processing</h2>
          <p>
            The collected data is used exclusively to:
          </p>
          <ul>
            <li>Provide and manage access to the BlockPulse service</li>
            <li>Manage subscriptions and payments</li>
            <li>Ensure website and user security</li>
            <li>Improve the service and user experience</li>
          </ul>
        </section>

        {/* ======================
            LEGAL BASIS
        ====================== */}
        <section id="legal-basis">
          <h2>Legal basis for processing</h2>
          <p>
            Data processing is based on:
          </p>
          <ul>
            <li>Performance of a contract (service access)</li>
            <li>Compliance with legal obligations</li>
            <li>User consent when required</li>
            <li>The legitimate interest of the publisher</li>
          </ul>
        </section>

        {/* ======================
            DATA RETENTION
        ====================== */}
        <section id="retention">
          <h2>Data retention period</h2>
          <p>
            Personal data is retained only for as long as necessary to fulfill
            the purposes for which it was collected, or in accordance with
            applicable legal obligations.
          </p>
        </section>

        {/* ======================
            DATA SHARING
        ====================== */}
        <section id="sharing">
          <h2>Data sharing</h2>
          <p>
            Personal data may be shared with technical service providers strictly
            necessary for the operation of the service (hosting, payment,
            security).
          </p>
          <p>
            No personal data is sold to third parties.
          </p>
        </section>

        {/* ======================
            USER RIGHTS
        ====================== */}
        <section id="rights">
          <h2>User rights</h2>
          <p>
            In accordance with the GDPR, each user has the following rights:
          </p>
          <ul>
            <li>Right of access</li>
            <li>Right to rectification</li>
            <li>Right to erasure</li>
            <li>Right to restriction of processing</li>
            <li>Right to object</li>
            <li>Right to data portability</li>
          </ul>
          <p>
            Any request may be sent to:
            <br />
            <strong>contact@blockpulse.be</strong>
          </p>
        </section>

        {/* ======================
            COOKIES
        ====================== */}
        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            The BlockPulse website uses cookies necessary for its operation and,
            subject to consent, audience measurement cookies.
          </p>
          <p>
            For more information, please consult the
            <strong> Cookie policy</strong>.
          </p>
        </section>

        {/* ======================
            POLICY CHANGES
        ====================== */}
        <section id="changes">
          <h2>Policy changes</h2>
          <p>
            This privacy policy may be modified at any time to ensure compliance
            with applicable legislation.
          </p>
        </section>
      </div>
    </main>
  );
}
