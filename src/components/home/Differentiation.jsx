import styles from "./Differentiation.module.css";

export default function Differentiation() {
  return (
    <section className={styles.diff}>
      <div className={styles.inner}>
        <h2>Pourquoi BlockPulse Insight est différent</h2>
        <p className={styles.intro}>
        Contrairement aux services classiques basés sur des API ou des estimations
        indirectes, BlockPulse Insight repose sur une observation physique et
        indépendante du réseau Bitcoin. L’objectif : savoir si le réseau est stable
        avant d’envoyer une transaction.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>❌ API classiques</h3>
            <ul>
            <li>Données issues de services tiers</li>
            <li>Dépendance à des estimations logicielles</li>
            <li>Risque de filtrage, de retard ou de coupure</li>
            <li>Peu adaptées à une décision immédiate avant transaction</li>
            </ul>
        </div>

          <div className={styles.cardHighlight}>
            <h3>✅ BlockPulse Insight</h3>
            <ul>
            <li>Observation physique du réseau via ESP32</li>
            <li>Aucune API publique, aucune donnée tierce</li>
            <li>Analyse en temps réel de la stabilité réseau</li>
            <li>Consultation simple avant d’envoyer une transaction Bitcoin</li>
            </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
