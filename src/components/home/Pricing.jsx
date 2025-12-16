import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function Pricing() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Abonnements</h2>
        <p className={styles.subtitle}>
          Accédez aux données crypto réelles mesurées par matériel physique indépendant.
        </p>

        <div className={styles.grid}>
          {/* OFFRE STARTER */}
          <div className={styles.card}>
            <h3>Starter</h3>
            <p className={styles.price}>
              €4<span>/mois</span>
            </p>

            <ul>
              <li>Accès aux données crypto en temps réel</li>
              <li>Source matérielle ESP32</li>
              <li>Données non modifiées</li>
              <li>Accès sécurisé</li>
            </ul>

            <a
              className={styles.cta}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0G424322CD2670054NFAF4BI&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              S’abonner via PayPal
            </a>
          </div>

          {/* OFFRE PRO */}
          <div className={`${styles.card} ${styles.highlight}`}>
            <span className={styles.badge}>Recommandé</span>

            <h3>Pro</h3>
            <p className={styles.price}>
              €9<span>/mois</span>
            </p>

            <ul>
              <li>Tout Starter inclus</li>
              <li>Accès étendu aux données</li>
              <li>Priorité de consultation</li>
              <li>Support prioritaire</li>
            </ul>

            <a
              className={styles.ctaPrimary}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-34Y11557RE0109506NFAF74Q&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              S’abonner via PayPal
            </a>
          </div>
        </div>

        {/* RASSURANCE */}
        <p className={styles.note}>
          ✔ Paiement sécurisé via PayPal · ✔ Aucun compte PayPal requis<br />
          Accès activé automatiquement sous 24h maximum par email.
        </p>
      </div>
    </section>
  );
}


