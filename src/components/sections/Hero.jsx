import CONFIG from "../../config";

export default function Hero() {
  return (
    <section className="bp-hero">
      <div className="bp-container bp-hero-inner">

        {/* Texte principal */}
        <div className="bp-hero-text">

          <p className="bp-eyebrow">Bitcoin Compute Node</p>

          <h1>
            BlockPulse.be <span>Bitcoin Lottery Node*</span>
          </h1>

          <p className="bp-hero-sub">
            Un module ESP32 relié en temps réel au pool ViaBTC, un système de
            tirages basé sur l’activité de minage, et une expérience crypto
            futuriste accessible dès <strong>5,97 €</strong>.
          </p>

          <p className="bp-hero-small">
            *BlockPulse est une expérience ludique et pédagogique utilisant le
            protocole Stratum. Vous soutenez un nœud de calcul et obtenez des
            tickets de tirage selon l’activité du module. Il ne s’agit pas d’un
            investissement ou d’un jeu d’argent réglementé.
          </p>

          <div className="bp-hero-actions">
            <a href="/participer" className="bp-btn-primary bp-btn-large">
              Participer maintenant — dès 5,97 €
            </a>
            <a href="/comment-ca-marche" className="bp-btn-secondary">
              Voir le fonctionnement
            </a>
          </div>
        </div>

        {/* Carte système en direct */}
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
            Les données affichées plus bas proviennent directement de l’ESP32
            (ou du cloud si celui-ci est momentanément hors ligne).
          </p>
        </div>

      </div>
    </section>
  );
}
