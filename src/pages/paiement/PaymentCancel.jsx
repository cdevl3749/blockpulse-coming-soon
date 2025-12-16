import { Link } from "react-router-dom";
import styles from "./Payment.module.css";

export default function PaymentCancel() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>❌ Paiement annulé</h1>

        <p className={styles.text}>
          Le paiement n’a pas été finalisé. Aucun débit n’a été effectué.
        </p>

        <div className={styles.actions}>
          <Link className={styles.btn} to="/pricing">
            Revenir aux abonnements
          </Link>
          <Link className={styles.btnGhost} to="/">
            Retour accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

