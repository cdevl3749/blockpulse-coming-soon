import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function Pricing() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Abonnements</h2>

        <p className={styles.subtitle}>
          Accédez à <strong>BlockPulse Insight</strong>, un outil simple pour
          <strong> savoir s’il vaut mieux envoyer une transaction Bitcoin maintenant… ou attendre</strong>.
          <br />
          Un signal basé sur l’état réel du réseau, mesuré en temps réel de façon
          <strong> indépendante</strong>.
        </p>

        <div className={styles.grid}>
          {/* ================= STARTER ================= */}
          <div className={styles.card}>
            <h3>Starter</h3>
            <p>
              Idéal pour <strong>vérifier rapidement l’état du réseau Bitcoin</strong>
              avant d’envoyer une transaction, sans se perdre dans des données complexes.
            </p>

            <p className={styles.price}>
              €4 <span>TTC / mois</span>
            </p>

            <ul>
              <li>🟢 Signal BlockPulse Insight : état du réseau en temps réel</li>
              <li>🔓 Données issues d’une observation indépendante (sans API publique)</li>
              <li>📈 Vue globale de l’activité du réseau Bitcoin</li>
              <li>🌐 Informations sur le pool de minage actuellement actif</li>
              <li>⚡ Données brutes accessibles, sans filtrage artificiel</li>
              <li>🔄 Mise à jour automatique toutes les 60 secondes</li>
              <li>🔐 Accès sécurisé via lien personnel</li>
              <li>🔒 Certaines analyses avancées réservées au plan Pro</li>
            </ul>

            <a
              className={styles.cta}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0G424322CD2670054NFAF4BI&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              S’abonner au plan Starter
            </a>
          </div>

          {/* ================= PRO ================= */}
          <div className={`${styles.card} ${styles.highlight}`}>
            <span className={styles.badge}>Le plus complet</span>

            <h3>Pro</h3>
            <p>
              Un <strong>véritable outil de décision</strong> pour celles et ceux
              qui veulent comprendre les tendances du réseau Bitcoin et
              <strong> choisir le meilleur moment pour envoyer leurs transactions</strong>.
            </p>

            <p className={styles.price}>
              €9 <span>TTC / mois</span>
            </p>

            <ul>
              <li>⭐ Tout le contenu du plan Starter inclus</li>
              <li>📊 Analyse approfondie de la stabilité du réseau</li>
              <li>🕒 Historique étendu pour repérer les périodes favorables</li>
              <li>🧱 Suivi détaillé des événements réseau rares</li>
              <li>🔓 Accès complet à toutes les vues BlockPulse Insight</li>
              <li>🚀 Accès prioritaire aux nouvelles fonctionnalités</li>
              <li>💬 Support prioritaire pour les abonnés Pro</li>
            </ul>

            <a
              className={styles.ctaPrimary}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-34Y11557RE0109506NFAF74Q&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Passer au plan Pro
            </a>
          </div>
        </div>

        {/* ================= RASSURANCE ================= */}
        <p className={styles.note}>
          ✔ Paiement sécurisé via PayPal · ✔ Aucun compte PayPal requis
          <br />
          🔔 Accès activé manuellement sous 24h maximum après paiement.
        </p>
      </div>
    </section>
  );
}




