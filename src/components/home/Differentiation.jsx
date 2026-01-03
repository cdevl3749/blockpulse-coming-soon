import styles from "./Differentiation.module.css";

export default function Differentiation() {
  return (
    <section className={styles.diff}>
      <div className={styles.inner}>
        <h2>Pourquoi BlockPulse est différent</h2>

        <p className={styles.intro}>
          La plupart des outils Bitcoin montrent des chiffres à interpréter.
          BlockPulse fait l’inverse&nbsp;: il vous aide à savoir rapidement
          s’il vaut mieux envoyer maintenant… ou attendre.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>❌ Outils classiques</h3>
            <ul>
              <li>Données issues de services tiers ou d’API publiques</li>
              <li>Estimations basées sur des modèles logiciels</li>
              <li>Résultats parfois en décalage avec la réalité du réseau</li>
              <li>Nécessitent de comprendre et d’interpréter les chiffres</li>
            </ul>
          </div>

          <div className={styles.cardHighlight}>
            <h3>✅ BlockPulse</h3>
            <ul>
              <li>Observation directe et indépendante du réseau Bitcoin</li>
              <li>Aucune dépendance à des API ou données externes</li>
              <li>Signal simple basé sur l’état réel du réseau</li>
              <li>Décision claire avant d’envoyer une transaction</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
