import styles from "./Pricing.module.css";

const RETURN_URL = "https://blockpulse.be/paiement/success";
const CANCEL_URL = "https://blockpulse.be/paiement/cancel";

export default function PricingEN() {
  return (
    <section className={styles.section} id="abonnements">
      <div className={styles.inner}>
        <h2>Pricing</h2>

        <p className={styles.subtitle}>
          Get access to <strong>BlockPulse Insight</strong>, a simple tool to
          <strong> know whether it’s better to send a Bitcoin transaction now… or wait</strong>.
          <br />
          A signal based on the real state of the network, measured in real time in an
          <strong> independent way</strong>.
        </p>

        <div className={styles.grid}>
          {/* ================= STARTER ================= */}
          <div className={styles.card}>
            <h3>Starter</h3>
            <p>
              Ideal to <strong>quickly check Bitcoin network conditions</strong>
              before sending a transaction, without digging into complex data.
            </p>

            <p className={styles.price}>
              €4 <span>incl. VAT / month</span>
            </p>

            <ul>
              <li>🟢 BlockPulse Insight signal: real-time network status</li>
              <li>🔓 Data from independent observation (no public API)</li>
              <li>📈 Global overview of Bitcoin network activity</li>
              <li>🌐 Information about the currently active mining pool</li>
              <li>⚡ Raw data available, without artificial filtering</li>
              <li>🔄 Automatic refresh every 60 seconds</li>
              <li>🔐 Secure access via personal link</li>
              <li>🔒 Some advanced analyses reserved for the Pro plan</li>
            </ul>

            <a
              className={styles.cta}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0G424322CD2670054NFAF4BI&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe to Starter
            </a>
          </div>

          {/* ================= PRO ================= */}
          <div className={`${styles.card} ${styles.highlight}`}>
            <span className={styles.badge}>Most complete</span>

            <h3>Pro</h3>
            <p>
              A <strong>true decision-making tool</strong> for those who want
              to understand Bitcoin network trends and
              <strong> choose the best moment to send transactions</strong>.
            </p>

            <p className={styles.price}>
              €9 <span>incl. VAT / month</span>
            </p>

            <ul>
              <li>⭐ Everything included in the Starter plan</li>
              <li>📊 In-depth analysis of network stability</li>
              <li>🕒 Extended history to identify favorable periods</li>
              <li>🧱 Detailed tracking of rare network events</li>
              <li>🔓 Full access to all BlockPulse Insight views</li>
              <li>🚀 Priority access to new features</li>
              <li>💬 Priority support for Pro subscribers</li>
            </ul>

            <a
              className={styles.ctaPrimary}
              href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-34Y11557RE0109506NFAF74Q&return_url=${encodeURIComponent(
                RETURN_URL
              )}&cancel_url=${encodeURIComponent(CANCEL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>

        {/* ================= REASSURANCE ================= */}
        <p className={styles.note}>
          ✔ Secure payment via PayPal · ✔ No PayPal account required
          <br />
          🔔 Access is manually activated within 24 hours after payment.
        </p>
      </div>
    </section>
  );
}
