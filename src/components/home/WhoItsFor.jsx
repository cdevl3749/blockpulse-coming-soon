import styles from "./WhoItsFor.module.css";

export default function WhoItsFor() {
  return (
    <section className={styles.who}>
      <div className={styles.inner}>
        <h2>À qui s’adresse BlockPulse Insight ?</h2>

        <p className={styles.intro}>
        BlockPulse Insight s’adresse à celles et ceux qui veulent savoir si le réseau
        Bitcoin est dans de bonnes conditions avant d’envoyer une transaction.
        L’outil repose sur une observation physique et indépendante du réseau,
        sans API ni estimation logicielle.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Utilisateurs Bitcoin</h3>
            <p>
                Vérifier la stabilité du réseau avant d’envoyer une transaction,
                pour éviter les délais imprévisibles ou une congestion temporaire.
            </p>
          </div>

          <div className={`${styles.card} ${styles.highlight}`}>
            <h3>Développeurs crypto</h3>
            <p>
                Intégrer ou comparer des signaux de stabilité réseau issus
                d’une mesure physique réelle, indépendante des API classiques.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Chercheurs / makers</h3>
            <p>
                Étudier le comportement du réseau Bitcoin depuis l’extérieur,
                à partir de signaux mesurés physiquement et observables en temps réel.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Data analysts</h3>
            <p>
                Exploiter des signaux bruts de stabilité réseau pour l’analyse,
                la corrélation ou la recherche long terme.
            </p>
          </div>

          <div className={styles.card}>
           <h3>Monitoring Bitcoin personnel</h3>
            <p>
                Disposer d’un indicateur simple et lisible pour savoir quand
                le réseau est fluide avant une action opérationnelle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

