import styles from "./WhatYouGet.module.css";

export default function WhatYouGetEN() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>What you get with BlockPulse Insight</h2>
        <p className={styles.subtitle}>
          A simple and reliable indicator to know whether Bitcoin network conditions are good before sending a transaction.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Real-time Bitcoin stability indicator</h3>
            <p>
              Instantly see whether the Bitcoin network is smooth, congested, or under pressure — so you know if it’s a good time to send a transaction.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Independent physical measurement (ESP32)</h3>
            <p>
              Data is observed directly from the Bitcoin network by a dedicated physical ESP32 module — no public API, no software-only estimates.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Secure access to BlockPulse Insight</h3>
            <p>
              Private access to the BlockPulse Insight interface, for quick checks before any transaction or operational decision.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Belgian project & real support</h3>
            <p>
              Active Belgian project, data measured at the source, and real human support with an official and transparent presence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
