import { Link } from "react-router-dom";
import styles from "./Payment.module.css";

export default function PaymentSuccess() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>✅ Paiement confirmé</h1>

        <p className={styles.text}>
          Merci pour votre abonnement à <strong>BlockPulse</strong>.
        </p>

        <p className={styles.text}>
          Votre accès sera <strong>activé sous 24h</strong> (maximum) et vous recevrez un email de confirmation.
        </p>

        <p className={styles.note}>
          Si vous ne recevez rien, contactez :{" "}
          <strong>support@blockpulse.be</strong>
        </p>

        <div className={styles.actions}>
          <a className={styles.btn} href="/#abonnements">
            Retour aux abonnements
          </a>
          <Link className={styles.btnGhost} to="/">
            Retour accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
