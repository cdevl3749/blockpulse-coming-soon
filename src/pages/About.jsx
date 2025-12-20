import { useEffect } from "react";

export default function About() {
  // 🔒 Scroll normal au chargement de la page (comme Mentions légales)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 20px" }}>
      <h1>À propos de BlockPulse</h1>

      <p>
        BlockPulse est un projet technique indépendant né d’un constat simple :
        la majorité des données Bitcoin dites “temps réel” reposent sur les mêmes
        APIs intermédiaires.
      </p>

      <p>
        Ces abstractions introduisent de la latence partagée, des pannes silencieuses
        et rendent difficile toute vérification de la provenance réelle des données.
      </p>

      <h2>Une approche différente</h2>

      <p>
        BlockPulse mesure directement certaines métriques Bitcoin à l’aide d’un
        module physique ESP32 connecté au réseau.
        Les données sont produites par le matériel lui-même, sans dépendre d’API
        tierces.
      </p>

      <p>
        L’objectif n’est pas le trading, ni la prédiction de prix.
        BlockPulse fournit une source de données technique, reproductible et
        indépendante, destinée aux développeurs, chercheurs et profils techniques.
      </p>

      <h2>Qui est derrière BlockPulse</h2>

      <p>
        Je m’appelle Christophe, développeur basé en Belgique.
        BlockPulse est un projet auto-financé, développé et maintenu de manière
        indépendante.
      </p>

      <p>
        Le service est proposé sous forme d’abonnement, sans engagement, et respecte
        les standards européens en matière de protection des données.
      </p>

      <h2>Ce que BlockPulse n’est pas</h2>

      <ul>
        <li>❌ Un outil de trading</li>
        <li>❌ Un service de signaux ou de prédictions financières</li>
        <li>❌ Une promesse de rendement</li>
      </ul>

      <p>
        Pour toute question technique ou demande spécifique, vous pouvez me contacter
        via la page Contact ou LinkedIn.
      </p>
    </main>
  );
}
