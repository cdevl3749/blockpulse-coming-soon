import styles from "./PostPricingInfo.module.css";

export default function PostPricingInfo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3>Concrètement, qu’obtenez-vous avec votre abonnement&nbsp;?</h3>

        <p className={styles.intro}>
          BlockPulse ne donne ni conseils financiers ni promesses de gains.
          Vous accédez à <strong>un signal et des données réelles sur l’état du réseau Bitcoin</strong>,
          afin de décider plus sereinement <strong>quand envoyer vos transactions</strong>.
          <br />
          Les informations sont issues d’une source indépendante, mesurée
          en continu, que vous utilisez librement selon vos besoins.
        </p>

        <ul className={styles.list}>
          <li>Observation directe et continue du réseau Bitcoin (24/7)</li>
          <li>Données issues d’une source indépendante, sans API externe</li>
          <li>Signal clair pour évaluer l’état du réseau avant une transaction</li>
          <li>Accès sécurisé à l’interface BlockPulse</li>
          <li>Historique consultable pour comparer les périodes favorables</li>
          <li>Service européen, infrastructure transparente et maîtrisée</li>
        </ul>

        <p className={styles.note}>
          Vous restez libre de vos décisions&nbsp;: BlockPulse est un outil
          d’aide à la décision, pas un service de conseil.
        </p>
      </div>
    </section>
  );
}
