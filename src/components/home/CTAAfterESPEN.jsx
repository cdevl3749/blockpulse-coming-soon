import styles from "./CTAAfterESP.module.css";
import beFlag from "@/assets/be-flag.svg";

export default function CTAAfterESPEN() {
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
          Move from preview to a <span>confident decision</span>
        </h2>

        <p className={styles.subtitle}>
          You’ve just seen how BlockPulse observes the real state of the Bitcoin
          network.
          <br />
          With a subscription, you get continuous access to quickly decide
          whether it’s better to send a transaction… or wait.
        </p>

        <ul className={styles.bullets}>
          <li>🚦 Clear signal to evaluate the right moment before a transaction</li>
          <li>📡 Independent observation of the Bitcoin network (24/7)</li>
          <li>🕒 History and continuous monitoring to compare periods</li>
          <li>🔒 Secure access, with no dependency on external APIs</li>
          <li className={styles.beLine}>
            <img src={beFlag} alt="Belgium" />
            Belgian service, transparent infrastructure
          </li>
        </ul>

        <div className={styles.actions}>
          <a href="/en/demande-acces" className={styles.primaryBtn}>
            Try free for 7 days
          </a>

          <span className={styles.note}>
            Secure PayPal payment · Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
