import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function Pricing() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Abonnements</h2>

       <p className={styles.subtitle}>
          Accédez à un flux Bitcoin <strong>fiable, continu et exploitable</strong>,
          mesuré par un module ESP32 physique indépendant.
          Conçu pour le monitoring, l’analyse et les projets longue durée,
          sans dépendre d’APIs centralisées.
       </p>

        <div className={styles.grid}>
          {/* ================= STARTER ================= */}
          <div className={styles.card}>
            <h3>Starter</h3>
            <p>Idéal pour tester le flux et explorer les données en continu</p>

            <p className={styles.price}>
              €4 <span>TTC / mois</span>
            </p>

            <ul>
              <li>🔓 Accès au flux Bitcoin en temps réel (ESP32 physique)</li>
              <li>📈 Suivi du hashrate et de l’état du réseau</li>
              <li>🌐 Pool de minage actuellement actif</li>
              <li>⚡ Données brutes, non filtrées, prêtes à être exploitées</li>
              <li>🔄 Rafraîchissement automatique toutes les 30 secondes</li>
              <li>🔐 Accès sécurisé via lien privé personnel</li>
              <li>🔒 Métriques avancées réservées au plan Pro</li>
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
            <p>Pour les usages avancés, l’analyse approfondie et le suivi long terme</p>
            <p className={styles.price}>
              €9 <span>TTC / mois</span>
            </p>

            <ul>
              <li>⭐ Tout le plan Starter inclus</li>
              <li>📊 Accès complet aux métriques avancées du module ESP32</li>
              <li>🕒 Historique étendu et statistiques détaillées</li>
              <li>🧱 Suivi complet des événements rares (bloc trouvé)</li>
              <li>🔓 Déverrouillage de toutes les cartes et vues ESP32</li>
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

        {/* ================= INFO RARE ================= */}
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




