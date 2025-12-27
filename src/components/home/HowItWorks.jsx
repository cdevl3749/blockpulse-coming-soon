import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    step: "01",
    title: "Observation physique du réseau Bitcoin",
    text: "Un module ESP32 dédié fonctionne 24/7 et observe le comportement du réseau Bitcoin depuis l’extérieur. Aucune API, aucun service tiers, uniquement une mesure physique indépendante.",
    variant: "neutral"
  },
  {
    step: "02",
    title: "Stabilité du réseau en temps réel",
    text: "BlockPulse Insight analyse en continu la stabilité du réseau Bitcoin. Vous savez si le réseau est fluide, congestionné ou sous tension avant d’envoyer une transaction.",
    variant: "signal"
  },
  {
    step: "03",
    title: "Accès direct à l’indicateur BlockPulse Insight",
    text: "Les abonnés accèdent à l’indicateur BlockPulse Insight via une interface sécurisée. Consultation immédiate avant toute transaction ou décision opérationnelle.",
    variant: "secure"
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Comment fonctionne <span>BlockPulse</span> ?
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
