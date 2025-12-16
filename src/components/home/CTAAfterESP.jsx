import styles from "./CTAAfterESP.module.css";
import { Link } from "react-router-dom";
import beFlag from "@/assets/be-flag.svg";

export default function CTAAfterESP() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.inner}>
        <h2>
          Accédez aux <span>données complètes</span> en continu
        </h2>

        <p className={styles.subtitle}>
          Vous venez de voir un aperçu des données mesurées par notre module
          ESP32 physique.
          <br />
          Avec un abonnement, vous accédez à l'interface complète et à
          l'historique des données.
        </p>

        <ul className={styles.bullets}>
          <li>📡 Données ESP32 en temps réel (24/7)</li>
          <li>🕒 Historique et suivi continu</li>
          <li>🔒 Accès sécurisé, sans API externe</li>
          <li className={styles.beLine}>
            <img src={beFlag} alt="Belgique" />
            Projet belge, infrastructure transparente
          </li>
        </ul>

        <div className={styles.actions}>
          <Link to="/#abonnements" className={styles.primaryBtn}>
            Voir les abonnements
          </Link>
          <span className={styles.note}>
            Paiement PayPal · Annulation à tout moment
          </span>
        </div>
      </div>
    </section>
  );
}
