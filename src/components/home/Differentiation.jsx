import styles from "./Differentiation.module.css";

export default function Differentiation() {
  return (
    <section className={styles.diff}>
      <div className={styles.inner}>
        <h2>Pourquoi BlockPulse est différent</h2>
        <p className={styles.intro}>
          Contrairement aux services classiques basés sur des API, BlockPulse
          repose sur une source matérielle indépendante, garantissant des données
          plus fiables et non manipulées.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>❌ API classiques</h3>
            <ul>
              <li>Données issues de tiers</li>
              <li>Risque de manipulation ou filtrage</li>
              <li>Dépendance à des plateformes externes</li>
              <li>Sources souvent opaques</li>
            </ul>
          </div>

          <div className={styles.cardHighlight}>
            <h3>✅ BlockPulse</h3>
            <ul>
              <li>Données mesurées physiquement</li>
              <li>Source indépendante (ESP32)</li>
              <li>Aucune modification humaine</li>
              <li>Traçabilité et transparence</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
