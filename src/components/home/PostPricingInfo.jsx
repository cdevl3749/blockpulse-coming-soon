import styles from "./PostPricingInfo.module.css";

export default function PostPricingInfo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3>Que recevez-vous avec votre abonnement&nbsp;?</h3>

        <p className={styles.intro}>
          BlockPulse ne propose pas de promesses de rendement ni de conseils
          financiers. Vous accédez à des <strong>données crypto réelles</strong>,
          mesurées par un dispositif physique indépendant, que vous pouvez
          exploiter librement dans vos propres analyses.
        </p>

        <ul className={styles.list}>
          <li>Données mesurées par un module ESP32 physique réel</li>
          <li>Collecte automatique 24/7, sans API externe</li>
          <li>Source indépendante, non modifiable manuellement</li>
          <li>Accès sécurisé à l’interface de données</li>
          <li>Historique des données consultable</li>
          <li>Projet belge, infrastructure transparente</li>
        </ul>

        <p className={styles.note}>
          Vous gardez le contrôle total de l’utilisation des données.
        </p>
      </div>
    </section>
  );
}
