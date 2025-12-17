import { Link } from "react-router-dom";
import styles from "./Payment.module.css";

export default function Cancel() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Paiement annulé ❌</h1>

          <p className={styles.text}>
            Le paiement a été annulé et <strong>aucun montant n’a été débité</strong>.
          </p>

          <p className={styles.text}>
            Vous pouvez réessayer à tout moment ou choisir un autre abonnement.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/abonnements" className={styles.primaryBtn}>
              Reprendre un abonnement
            </Link>
            <Link to="/" className={styles.secondaryBtn}>
              Retour à l’accueil
            </Link>
          </div>

          <p className={styles.note}>
            ℹ️ Si vous avez rencontré un problème lors du paiement, n’hésitez pas à
            contacter le support.
          </p>
        </div>
      </div>
    </main>
  );
}

