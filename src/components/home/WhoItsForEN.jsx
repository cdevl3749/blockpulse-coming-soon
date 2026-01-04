import styles from "./WhoItsFor.module.css";

export default function WhoItsForEN() {
  return (
    <section className={styles.who}>
      <div className={styles.inner}>
        <h2>Who is BlockPulse Insight for?</h2>

        <p className={styles.intro}>
          BlockPulse Insight is designed for people who want to know whether
          the Bitcoin network is in good condition before sending a transaction.
          The tool relies on independent, physical observation of the network,
          with no API and no software-only estimates.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Bitcoin users</h3>
            <p>
              Check network stability before sending a transaction to avoid
              unpredictable delays or temporary congestion.
            </p>
          </div>

          <div className={`${styles.card} ${styles.highlight}`}>
            <h3>Crypto developers</h3>
            <p>
              Integrate or compare network stability signals based on real
              physical measurements, independent from standard APIs.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Researchers / makers</h3>
            <p>
              Study Bitcoin network behavior from the outside using physically
              measured signals observed in real time.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Data analysts</h3>
            <p>
              Use raw network stability signals for analysis, correlation,
              or long-term research.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Personal Bitcoin monitoring</h3>
            <p>
              Get a simple, readable indicator to know when the network is smooth
              before taking operational action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
