import CONFIG from "../../config";

export default function Hero() {
  return (
    <section className="bp-hero">
      <div className="bp-container bp-hero-inner">
        <div className="bp-hero-text">
          <p className="bp-eyebrow">Bitcoin Compute Node</p>
          <h1>
            BlockPulse.be <span>Bitcoin Lottery Node*</span>
          </h1>
          <p className="bp-hero-sub">
            Un ESP32 connecté en temps réel au pool ViaBTC, une visualisation
            futuriste, et une participation à partir de <strong>{CONFIG.UNIT_PRICE.toFixed(2)} €</strong>{" "}
            pour soutenir la puissance de calcul.
          </p>
          <p className="bp-hero-small">
            *Ce système est un jeu expérimental basé sur le minage de pool
            Bitcoin. Il ne constitue pas un jeu d&apos;argent au sens légal :
            vous soutenez un nœud de calcul et recevez un bonus si le pool
            distribue une récompense.
          </p>
          <div className="bp-hero-actions">
            <a href="/participer" className="bp-btn-primary bp-btn-large">
              Participer maintenant — dès {CONFIG.UNIT_PRICE.toFixed(2)} €
            </a>
            <a href="/comment-ca-marche" className="bp-btn-secondary">
              Voir le fonctionnement
            </a>
          </div>
        </div>

        <div className="bp-hero-card">
          <h3>Système en direct</h3>
          <ul>
            <li>
              <span>Connexion au pool :</span> ViaBTC
            </li>
            <li>
              <span>Protocole :</span> Stratum
            </li>
            <li>
              <span>Rafraîchissement :</span> 5 secondes
            </li>
            <li>
              <span>Statut :</span>{" "}
              <span className="bp-status bp-status-on">ONLINE</span>
            </li>
          </ul>
          <p className="bp-hero-note">
            Les données temps réel sont affichées plus bas et mises à jour
            directement depuis l&apos;ESP32 via JSON.
          </p>
        </div>
      </div>
    </section>
  );
}
