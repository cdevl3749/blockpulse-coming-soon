import styles from "./MicroFAQ.module.css";

export default function MicroFAQ() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.inner}>
        <h3>Questions fréquentes</h3>

        <div className={styles.faqList}>
          <div className={styles.item}>
            <h4>Est-ce un investissement ou un conseil financier ?</h4>
            <p>
              Non. BlockPulse ne fournit <strong>aucun conseil financier</strong>
              ni promesse de rendement. Vous achetez un{" "}
              <strong>accès à des données crypto réelles</strong>, mesurées
              physiquement, que vous exploitez librement dans vos analyses.
            </p>
          </div>

          <div className={styles.item}>
            <h4>D’où proviennent exactement les données ?</h4>
            <p>
              Les données proviennent d’un{" "}
              <strong>module ESP32 physique réel</strong>, fonctionnant 24/7,
              sans API externe et sans modification humaine.
            </p>
          </div>

          <div className={styles.item}>
            <h4>Puis-je annuler mon abonnement à tout moment ?</h4>
            <p>
              Oui. Le paiement est géré par <strong>PayPal</strong> et
              l’abonnement peut être annulé à tout moment, sans engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
