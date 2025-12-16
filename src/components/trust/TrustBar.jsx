import styles from "./TrustBar.module.css";

import BeIcon from "@/assets/icons/be.svg?react";
import PaypalIcon from "@/assets/icons/paypal.svg?react";
import LockIcon from "@/assets/icons/lock.svg?react";
import LinkedinIcon from "@/assets/icons/linkedin.svg?react";

export default function TrustBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.trustBar}>
        <span className={styles.item}>
          <BeIcon className={styles.icon} />
          Projet belge
        </span>

        <span className={styles.item}>
          <PaypalIcon className={styles.icon} />
          Paiement sécurisé
        </span>

        <span className={styles.item}>
          <LockIcon className={styles.icon} />
          Données protégées
        </span>

        <a
          className={styles.item}
          href="https://www.linkedin.com/in/christophe-devleeshouwer-882377399/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className={styles.icon} />
          LinkedIn officiel
        </a>
      </div>
    </div>
  );
}