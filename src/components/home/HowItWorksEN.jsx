import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    step: "01",
    title: "Physical observation of the Bitcoin network",
    text: "A dedicated ESP32 module runs 24/7 and observes the behavior of the Bitcoin network from the outside. No API, no third-party service — only independent physical measurement.",
    variant: "neutral",
  },
  {
    step: "02",
    title: "Real-time network stability",
    text: "BlockPulse Insight continuously analyzes the stability of the Bitcoin network. You instantly know whether the network is smooth, congested, or under pressure before sending a transaction.",
    variant: "signal",
  },
  {
    step: "03",
    title: "Direct access to the BlockPulse Insight indicator",
    text: "Subscribers access the BlockPulse Insight indicator through a secure interface. Immediate consultation before any transaction or operational decision.",
    variant: "secure",
  },
];

export default function HowItWorksEN() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          How does <span>BlockPulse</span> work?
        </h2>

        <div className={styles.grid}>
          {STEPS.map((item) => (
            <div
              key={item.step}
              className={`${styles.card} ${styles[item.variant]}`}
            >
              <div className={styles.step}>{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
