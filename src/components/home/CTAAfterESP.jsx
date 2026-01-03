import styles from "./CTAAfterESP.module.css";
import beFlag from "@/assets/be-flag.svg";

export default function CTAAfterESP() {
  const scrollToPricing = (e) => {
    e.preventDefault();
    const section = document.getElementById("abonnements");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.inner}>
        <h2>
          Passez de l’aperçu à la <span>décision éclairée</span>
        </h2>

        <p className={styles.subtitle}>
          Vous venez de voir comment BlockPulse observe l’état réel du réseau
          Bitcoin.
          <br />
          Avec un abonnement, vous disposez d’un accès continu pour savoir
          rapidement s’il vaut mieux envoyer une transaction… ou attendre.
        </p>

        <ul className={styles.bullets}>
          <li>🚦 Signal clair pour évaluer le bon moment avant une transaction</li>
          <li>📡 Observation indépendante du réseau Bitcoin (24/7)</li>
          <li>🕒 Historique et suivi continu pour comparer les périodes</li>
          <li>🔒 Accès sécurisé, sans dépendance à des API externes</li>
          <li className={styles.beLine}>
            <img src={beFlag} alt="Belgique" />
            Service belge, infrastructure transparente
          </li>
        </ul>

        <div className={styles.actions}>
          <a
            href="/demande-acces"
            className={styles.primaryBtn}
          >
            Essayer gratuitement pendant 7 jours
          </a>

          <span className={styles.note}>
            Paiement sécurisé via PayPal · Annulation à tout moment
          </span>
        </div>
      </div>
    </section>
  );
}


