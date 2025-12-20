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
          exploiter librement dans vos propres analyses, outils et projets
          sur le long terme.
        </p>

        <ul className={styles.list}>
          <li>Données mesurées par un module ESP32 physique réel, connecté au réseau Bitcoin</li>
          <li>Collecte automatique 24/7, sans dépendre d’API externe</li>
          <li>Source indépendante, non modifiable manuellement</li>
          <li>Accès sécurisé à l’interface de données</li>
          <li>Historique des données consultable pour analyse et comparaison</li>
          <li>Projet belge, infrastructure transparente et documentée</li>
        </ul>

        <p className={styles.note}>
          Vous gardez le contrôle total de l’utilisation des données.
        </p>
      </div>
    </section>
  );
}
