import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function Pricing() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Abonnements</h2>

       <p className={styles.subtitle}>
          Accédez à <strong>BlockPulse Insight</strong>, un indicateur simple et fiable
          pour <strong>savoir si le réseau Bitcoin est dans de bonnes conditions
          avant d’envoyer une transaction</strong>.
          <br />
          Données mesurées en temps réel par un <strong>module ESP32 physique indépendant</strong>,
          sans API ni estimation logicielle.
       </p>

        <div className={styles.grid}>
          {/* ================= STARTER ================= */}
          <div className={styles.card}>
            <h3>Starter</h3>
            <p>
              Idéal pour <strong>vérifier si le réseau Bitcoin est stable</strong>
              avant d’envoyer une transaction et comprendre son état en temps réel.
            </p>

            <p className={styles.price}>
              €4 <span>TTC / mois</span>
            </p>

            <ul>
              <li>🟢 Indicateur BlockPulse Insight : stabilité du réseau en temps réel</li>
              <li>🔓 Données observées via module ESP32 physique (sans API)</li>
              <li>📈 État global du réseau et hashrate</li>
              <li>🌐 Pool de minage actuellement actif</li>
              <li>⚡ Données brutes, non filtrées, prêtes à être exploitées</li>
              <li>🔄 Rafraîchissement automatique toutes les 60 secondes</li>
              <li>🔐 Accès sécurisé via lien privé personnel</li>
              <li>🔒 Certaines vues avancées réservées au plan Pro</li>
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
              Un <strong>outil de décision avancé</strong> pour analyser la stabilité
              du réseau Bitcoin avant toute transaction, avec historique et analyses
              approfondies.
            </p>

            <p className={styles.price}>
              €9 <span>TTC / mois</span>
            </p>

            <ul>
              <li>⭐ Tout le plan Starter inclus</li>
              <li>📊 Analyse avancée de la stabilité réseau (ESP32)</li>
              <li>🕒 Historique étendu pour comparer les périodes favorables</li>
              <li>🧱 Suivi détaillé des événements rares (bloc trouvé)</li>
              <li>🔓 Accès à toutes les cartes et vues BlockPulse Insight</li>
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

        {/* ================= INFO RARE =================
        <div className={styles.infoBox}>
          <strong>🧱 Événement rare — Bloc trouvé</strong>
          <p>
            Le module ESP32 interagit directement avec le réseau Bitcoin.
            Trouver un bloc est <strong>extrêmement rare</strong>, mais
            techniquement possible (probabilité globale toutes les ~10 minutes).
            <br />
            Les abonnés <strong>Pro</strong> bénéficient d’un suivi dédié,
            d’un historique complet et d’un affichage détaillé de ces événements exceptionnels.
          </p>
        </div>
        */}

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




