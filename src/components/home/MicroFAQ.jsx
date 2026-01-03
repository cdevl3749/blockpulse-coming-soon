import styles from "./MicroFAQ.module.css";

export default function MicroFAQ() {
  return (
    <section className={styles.faqSection}>
      {/* 🔹 Ancre dédiée au scroll */}
      <span id="faq" className={styles.scrollAnchor} />

      <div className={styles.inner}>
        <h3 className={styles.anchorTitle}>Questions fréquentes</h3>

        <div className={styles.faqList}>
          <div className={styles.item}>
            <h4>Est-ce un investissement ou un conseil financier&nbsp;?</h4>
            <p>
              Non. BlockPulse ne fournit <strong>aucun conseil financier</strong>{" "}
              ni promesse de rendement. Il s’agit d’un{" "}
              <strong>outil d’aide à la décision</strong> qui vous permet de savoir
              si le réseau Bitcoin est dans de bonnes conditions avant
              d’envoyer une transaction.
            </p>
          </div>

          <div className={styles.item}>
            <h4>D’où proviennent exactement les données&nbsp;?</h4>
            <p>
              Les informations sont issues d’un{" "}
              <strong>module physique indépendant</strong> qui observe
              directement le réseau Bitcoin, 24/7,{" "}
              <strong>sans dépendre d’API externes</strong>.
            </p>
          </div>

          <div className={styles.item}>
            <h4>Puis-je annuler mon abonnement à tout moment&nbsp;?</h4>
            <p>
              Oui. Le paiement est géré par <strong>PayPal</strong> et
              l’abonnement peut être annulé à tout moment, sans justification
              ni engagement de durée.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
