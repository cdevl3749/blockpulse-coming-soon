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
          Passez du signal à <span>l’explication</span>
        </h2>

        <p className={styles.subtitle}>
          Vous venez de voir le signal “bon / neutre / mauvais moment”.
          <br />
          L’accès Pro vous montre <strong>pourquoi</strong> le réseau est dans cet état
          (congestion, stabilité, confirmations), pour décider vite et sans stress.
        </p>

        <ul className={styles.bullets}>
          <li>🧠 Comprendre le “pourquoi” derrière le signal (pas juste une couleur)</li>
          <li>📡 Observation indépendante du réseau Bitcoin (24/7)</li>
          <li>🔎 Détails utiles : congestion, stabilité, confirmations</li>
          <li>🕒 Suivi dans le temps pour comparer les périodes</li>
          <li className={styles.beLine}>
            <img src={beFlag} alt="Belgique" />
            Service belge, infrastructure transparente
          </li>
        </ul>

        <div className={styles.actions}>
         <a href="/demande-acces" className={styles.primaryBtn}>
          Accéder aux explications détaillées
         </a>

          <span className={styles.note}>
            Accès par abonnement · Annulation à tout moment
          </span>

        </div>
      </div>
    </section>
  );
}


