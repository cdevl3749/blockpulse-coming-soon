import styles from "./WhatYouGet.module.css";

export default function WhatYouGet() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>Ce que vous obtenez avec BlockPulse</h2>

        <p className={styles.subtitle}>
          Tout ce qu’il vous faut pour décider rapidement s’il vaut mieux envoyer
          une transaction Bitcoin maintenant… ou attendre.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Un signal clair avant chaque transaction</h3>
            <p>
              Consultez en un coup d’œil si le moment est favorable, neutre ou
              défavorable pour envoyer une transaction Bitcoin, sans analyser
              des graphiques ou des indicateurs complexes.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Données indépendantes du réseau Bitcoin</h3>
            <p>
              Les informations sont issues d’une observation directe et
              indépendante du réseau Bitcoin, sans dépendre d’API publiques ni
              de données tierces.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Accès immédiat à l’outil BlockPulse</h3>
            <p>
              Accédez à l’interface BlockPulse avant chaque envoi, pour vérifier
              rapidement l’état du réseau et prendre une décision éclairée.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Un service sérieux, transparent et européen</h3>
            <p>
              Projet basé en Belgique, avec une infrastructure maîtrisée et un
              support humain réel en cas de question ou de besoin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

