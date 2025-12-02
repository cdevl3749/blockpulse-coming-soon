export default function MentionsLegales() {
  const year = new Date().getFullYear();

  return (
    <div className="bp-legal-page">
      <div className="bp-container">

        {/* Header */}
        <div className="bp-legal-header">
          <div className="bp-legal-icon">📘</div>
          <h1>Mentions légales</h1>
          <p className="bp-legal-subtitle">
            Informations légales concernant BlockPulse.be
          </p>
        </div>

        {/* 01 — Éditeur */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">01</span>
            <h2>Éditeur du site</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Le site <strong>BlockPulse.be</strong> est un projet expérimental et indépendant,
              développé dans le cadre d’un test technologique autour d’un système 
              de loterie Bitcoin basé sur microcontrôleur <strong>ESP32</strong>.
            </p>

            <p>
              Éditeur : <strong>Développeur indépendant</strong>  
              <br />
              Contact : <a href="mailto:support@blockpulse.be">support@blockpulse.be</a>
            </p>

            <p>
              Le site ne constitue ni un service financier, ni une plateforme 
              d’investissement, ni un jeu d’argent réglementé.
            </p>
          </div>
        </section>

        {/* 02 — Hébergement */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">02</span>
            <h2>Hébergement</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Le site est hébergé par un fournisseur de services européen conforme RGPD.
            </p>
            <p>
              Engagements de l’hébergeur :
            </p>
            <ul className="bp-legal-list">
              <li>Protection et confidentialité des données</li>
              <li>Aucune exploitation commerciale des données</li>
              <li>Infrastructure sécurisée</li>
            </ul>
          </div>
        </section>

        {/* 03 — Responsabilité */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">03</span>
            <h2>Limitation de responsabilité</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              BlockPulse est un <strong>prototype expérimental</strong>.  
              Aucune garantie de fonctionnement continu ou sans erreur n’est donnée.
            </p>
            <p>
              Les montants liés au Bitcoin peuvent fluctuer fortement.  
              BlockPulse ne fournit aucun conseil financier, et aucun gain 
              n’est garanti.
            </p>
          </div>
        </section>

        {/* 04 — Propriété intellectuelle */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">04</span>
            <h2>Propriété intellectuelle</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Le contenu du site (textes, visuels, interface, composants techniques)
              est la propriété de l’éditeur, sauf mentions contraires.
            </p>
            <p>
              Les marques <strong>Bitcoin</strong>, <strong>NOWPayments</strong>, 
              <strong>ViaBTC</strong> et autres restent la propriété exclusive de leurs 
              détenteurs respectifs.
            </p>
          </div>
        </section>

        {/* 05 — Contact */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">05</span>
            <h2>Contact</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Pour toute question concernant ces mentions, vous pouvez contacter :
            </p>
            <p>
              📩 <a href="mailto:support@blockpulse.be">support@blockpulse.be</a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="bp-legal-footer">
          © {year} BlockPulse.be – Tous droits réservés
        </div>

      </div>
    </div>
  );
}
