import styles from "./WhatYouGet.module.css";

export default function WhatYouGet() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>Ce que vous recevez avec BlockPulse Insight</h2>
        <p className={styles.subtitle}>
          Un indicateur simple et fiable pour savoir si le réseau Bitcoin est dans de bonnes conditions avant d’envoyer une transaction.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Indicateur de stabilité Bitcoin en temps réel</h3>
            <p>
              Visualisez instantanément si le réseau Bitcoin est fluide, congestionné ou sous tension, afin de savoir si c’est le bon moment pour envoyer une transaction.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Mesure physique indépendante (ESP32)</h3>
            <p>
              Les données sont observées directement depuis le réseau Bitcoin par un module ESP32 physique, sans API publique ni estimation logicielle.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Accès sécurisé à l’outil BlockPulse Insight</h3>
            <p>
              Accès privé à l’interface BlockPulse Insight, avec consultation immédiate avant toute transaction ou décision opérationnelle.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Projet belge & support réel</h3>
            <p>
              Projet belge actif, données mesurées à la source et support humain réel, avec présence officielle et transparente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
