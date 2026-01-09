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
            Move from the signal to the <span>explanation</span>
        </h2>

        <p className={styles.subtitle}>
        You’ve just seen the signal: good, neutral, or bad timing.
        <br />
        Pro access shows you <strong>why</strong> the network is in this state
        (congestion, stability, confirmations), so you can decide calmly and fast.
        </p>

        <ul className={styles.bullets}>
        <li>🧠 Understand the “why” behind the signal — not just a color</li>
        <li>📡 Independent Bitcoin network observation (24/7)</li>
        <li>🔎 Useful context: congestion, stability, confirmation behavior</li>
        <li>🕒 Time-based view to compare different network periods</li>
        <li className={styles.beLine}>
            <img src={beFlag} alt="Belgium" />
            Belgian service, transparent infrastructure
        </li>
        </ul>

        <div className={styles.actions}>
          <a href="/en/demande-acces" className={styles.primaryBtn}>
            Access detailed explanations
          </a>

          <span className={styles.note}>
            Subscription-based access · Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
