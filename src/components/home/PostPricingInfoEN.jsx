import styles from "./PostPricingInfo.module.css";

export default function PostPricingInfoEN() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3>What do you actually get with your subscription?</h3>

        <p className={styles.intro}>
          BlockPulse provides no financial advice and makes no promises of profit.
          You get access to <strong>a clear signal and real data about the state of the Bitcoin network</strong>,
          allowing you to make more confident decisions about <strong>when to send transactions</strong>.
          <br />
          The information comes from an independent source, measured continuously,
          and can be used freely according to your needs.
        </p>

        <ul className={styles.list}>
          <li>Direct and continuous observation of the Bitcoin network (24/7)</li>
          <li>Data from an independent source, with no external API</li>
          <li>Clear signal to assess network conditions before a transaction</li>
          <li>Secure access to the BlockPulse interface</li>
          <li>Browsable history to compare favorable periods</li>
          <li>European service with transparent and controlled infrastructure</li>
        </ul>

        <p className={styles.note}>
          You remain fully in control of your decisions: BlockPulse is a
          decision-support tool, not an advisory service.
        </p>
      </div>
    </section>
  );
}
