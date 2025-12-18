import styles from "./WhoItsFor.module.css";

export default function WhoItsFor() {
  return (
    <section className={styles.who}>
      <div className={styles.inner}>
        <h2>À qui s’adresse BlockPulse ?</h2>

        <p className={styles.intro}>
          BlockPulse s’adresse aux développeurs, chercheurs et passionnés Bitcoin
          qui veulent des données indépendantes des API, mesurées à la source.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Développeurs crypto</h3>
            <p>
              Tester, comparer et construire à partir de signaux mesurés par un
              matériel réel.
            </p>
          </div>

          <div className={`${styles.card} ${styles.highlight}`}>
            <h3>Chercheurs / makers</h3>
            <p>
              Expérimenter un monitoring indépendant sans dépendre d’API
              tierces.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Data analysts</h3>
            <p>
              Des signaux bruts et cohérents, exploitables pour l’analyse et la
              recherche.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Dashboards personnels</h3>
            <p>
              Une source propre et stable pour créer votre propre vue de
              monitoring Bitcoin.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Monitoring Bitcoin indépendant</h3>
            <p>
              Une approche plus proche de la source que le « temps réel basé sur
              des API ».
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

