import styles from "./MicroFAQ.module.css";

export default function MicroFAQEN() {
  return (
    <section className={styles.faqSection}>
      {/* 🔹 Anchor for scroll */}
      <span id="faq" className={styles.scrollAnchor} />

      <div className={styles.inner}>
        <h3 className={styles.anchorTitle}>Frequently asked questions</h3>

        <div className={styles.faqList}>
          <div className={styles.item}>
            <h4>Is this an investment or financial advice?</h4>
            <p>
              No. BlockPulse provides <strong>no financial advice</strong> and
              makes no promise of returns. It is a{" "}
              <strong>decision-support tool</strong> that helps you determine
              whether the Bitcoin network is in good condition before sending
              a transaction.
            </p>
          </div>

          <div className={styles.item}>
            <h4>Where does the data come from?</h4>
            <p>
              The data comes from an{" "}
              <strong>independent physical module</strong> that directly
              observes the Bitcoin network 24/7,{" "}
              <strong>without relying on external APIs</strong>.
            </p>
          </div>

          <div className={styles.item}>
            <h4>Can I cancel my subscription at any time?</h4>
            <p>
              Yes. Payments are handled by <strong>PayPal</strong>, and the
              subscription can be cancelled at any time, with no commitment
              or justification required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
