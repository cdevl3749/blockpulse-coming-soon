import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    step: "01",
    title: "Dispositif physique ESP32",
    text: "Un module ESP32 dédié fonctionne 24/7 et mesure des données crypto depuis une source matérielle indépendante, sans API externe."
  },
  {
    step: "02",
    title: "Données en temps réel",
    text: "Les données sont transmises automatiquement vers nos serveurs. Aucune intervention humaine, aucune modification manuelle."
  },
  {
    step: "03",
    title: "Accès sécurisé",
    text: "Les abonnés accèdent aux données via une interface sécurisée. Paiement simple et fiable via PayPal."
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
            <div key={item.step} className={styles.card}>
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
