import styles from "./WhatYouGet.module.css";

export default function WhatYouGet() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>Ce que vous recevez avec BlockPulse</h2>
        <p className={styles.subtitle}>
          Un accès simple, transparent et sécurisé à des données crypto mesurées physiquement.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Données crypto en temps réel</h3>
            <p>
              Accédez aux données mesurées 24/7 par un module ESP32 physique,
              sans dépendance à une API externe.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Source physique indépendante</h3>
            <p>
              Données issues d’un dispositif réel, sans modification humaine,
              garantissant fiabilité et transparence.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Accès sécurisé par abonnement</h3>
            <p>
              Interface privée, accès contrôlé, paiement simple et sécurisé via PayPal.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Projet belge & support réel</h3>
            <p>
              Projet belge actif avec support humain et présence officielle sur LinkedIn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
