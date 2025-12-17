import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function Pricing() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Abonnements</h2>

        <p className={styles.subtitle}>
          Accédez aux données Bitcoin mesurées par un
          <strong> module ESP32 physique réel</strong>, sans API tierce,
          avec un accès sécurisé et continu.
        </p>

        <div className={styles.grid}>
          {/* ================= STARTER ================= */}
          <div className={styles.card}>
            <h3>Starter</h3>

            <p className={styles.price}>
              €4<span>/mois</span>
            </p>

            <ul>
              <li>🔓 Accès aux données ESP32 en temps réel</li>
              <li>📈 Hashrate & statut du mining</li>
              <li>🌐 Pool actif</li>
              <li>⚡ Données brutes, non modifiées</li>
              <li>🔄 Mise à jour automatique toutes les 30 secondes</li>
              <li>🔐 Accès sécurisé via lien privé</li>
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

            <p className={styles.price}>
              €9<span>/mois</span>
            </p>

            <ul>
              <li>⭐ Tout le plan Starter inclus</li>
              <li>📊 Accès étendu aux métriques ESP32</li>
              <li>🕒 Historique et statistiques avancées</li>
              <li>🧱 Suivi des événements rares (bloc trouvé)</li>
              <li>🚀 Accès prioritaire aux nouvelles fonctionnalités</li>
              <li>💬 Support prioritaire</li>
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

        {/* ================= INFO RARE ================= */}
        <div className={styles.infoBox}>
          <strong>🧱 Événement rare — Bloc trouvé</strong>
          <p>
            Le module ESP32 participe au processus de minage Bitcoin.
            Trouver un bloc est <strong>extrêmement rare</strong> mais
            techniquement possible.  
            Les abonnés <strong>Pro</strong> bénéficient d’un suivi
            dédié de ces événements exceptionnels.
          </p>
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



