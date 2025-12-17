import { useSearchParams, Link } from "react-router-dom";
import styles from "./Payment.module.css";

export default function Success() {
  const [params] = useSearchParams();
  const plan = params.get("plan");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Paiement confirmé ✅</h1>

          <p className={styles.text}>
            Merci pour votre abonnement
            {plan ? (
              <>
                {" "}
                <strong>{plan.toUpperCase()}</strong>
              </>
            ) : (
              ""
            )}.
          </p>

          <p className={styles.text}>
            🔐 <strong>Votre accès BlockPulse</strong> va vous être envoyé par email
            dans les prochaines minutes.
          </p>

          <p className={styles.small}>
            Si vous ne recevez rien, pensez à vérifier vos spams ou contactez le
            support.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/" className={styles.secondaryBtn}>
              Retour à l’accueil
            </Link>
            <Link to="/contact" className={styles.primaryBtn}>
              Contacter le support
            </Link>
          </div>

          <p className={styles.note}>
            ℹ️ Pour des raisons de sécurité, l’accès n’est pas affiché
            automatiquement sur cette page.
          </p>
        </div>
      </div>
    </main>
  );
}

