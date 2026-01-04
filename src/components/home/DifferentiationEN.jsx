import styles from "./Differentiation.module.css";

export default function DifferentiationEN() {
  return (
    <section className={styles.diff}>
      <div className={styles.inner}>
        <h2>Why BlockPulse is different</h2>

        <p className={styles.intro}>
          Most Bitcoin tools show numbers that require interpretation.
          BlockPulse does the opposite: it helps you quickly know
          whether it’s better to send now… or wait.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>❌ Traditional tools</h3>
            <ul>
              <li>Data coming from third-party services or public APIs</li>
              <li>Estimates based on software models</li>
              <li>Results sometimes disconnected from real network conditions</li>
              <li>Require analysis and interpretation of metrics</li>
            </ul>
          </div>

          <div className={styles.cardHighlight}>
            <h3>✅ BlockPulse</h3>
            <ul>
              <li>Direct and independent observation of the Bitcoin network</li>
              <li>No reliance on APIs or external data sources</li>
              <li>Simple signal based on the real state of the network</li>
              <li>Clear decision before sending a transaction</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
