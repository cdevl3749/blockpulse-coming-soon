import { useEffect } from "react";
import styles from "./MentionsLegales.module.css";

export default function MentionsLegalesEN() {
  // 🔝 Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Legal notice</h1>

        {/* ======================
            PUBLISHER
        ====================== */}
        <section id="publisher">
          <h2>Website publisher</h2>
          <p>
            The website <strong>BlockPulse.be</strong> is published by:
          </p>
          <ul>
            <li><strong>Name:</strong> BlockPulse</li>
            <li><strong>Status:</strong> Independent SaaS project</li>
            <li><strong>Country:</strong> Belgium</li>
            <li><strong>Email:</strong> contact@blockpulse.be</li>
          </ul>
        </section>

        {/* ======================
            HOSTING
        ====================== */}
        <section id="hosting">
          <h2>Hosting</h2>
          <p>
            The website is hosted by a professional provider ensuring security,
            availability and service continuity.
          </p>
        </section>

        {/* ======================
            SERVICE PURPOSE
        ====================== */}
        <section id="purpose">
          <h2>Service purpose</h2>
          <p>
            BlockPulse is a SaaS platform providing
            <strong> real-time Bitcoin data</strong>, measured using a physical
            ESP32 hardware module.
          </p>
          <p>
            The information provided is intended for informational and technical use only.
          </p>
        </section>

        {/* ======================
            LIABILITY
        ====================== */}
        <section id="liability">
          <h2>Liability</h2>
          <p>
            The publisher makes every effort to ensure the accuracy and updating
            of the information published on the website. However, no guarantee
            is given regarding the accuracy, completeness or timeliness of the data.
          </p>
          <p>
            The content provided does not constitute financial, legal or investment advice.
          </p>
        </section>

        {/* ======================
            INTELLECTUAL PROPERTY
        ====================== */}
        <section id="intellectual-property">
          <h2>Intellectual property</h2>
          <p>
            All elements of the BlockPulse website (texts, interface, graphics,
            logo, code, architecture) are protected by intellectual property laws.
          </p>
          <p>
            Any reproduction, distribution or use without prior written authorization
            is strictly prohibited.
          </p>
        </section>

        {/* ======================
            PERSONAL DATA
        ====================== */}
        <section id="personal-data">
          <h2>Personal data</h2>
          <p>
            The processing of personal data is described on the dedicated page:
            <br />
            <strong>Privacy policy</strong>.
          </p>
        </section>

        {/* ======================
            COOKIES
        ====================== */}
        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            The BlockPulse website uses cookies strictly necessary for its operation
            and, subject to consent, audience measurement cookies.
          </p>
          <p>
            Cookie management details are available on the page:
            <br />
            <strong>Cookie policy</strong>.
          </p>
        </section>

        {/* ======================
            APPLICABLE LAW
        ====================== */}
        <section id="applicable-law">
          <h2>Applicable law</h2>
          <p>
            This website is governed by Belgian law. In the event of a dispute,
            Belgian courts shall have exclusive jurisdiction, unless otherwise
            required by mandatory law.
          </p>
        </section>
      </div>
    </main>
  );
}
