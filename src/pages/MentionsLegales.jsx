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
              Le site <strong>BlockPulse.be</strong> est un projet expérimental et
              indépendant basé sur un module microcontrôleur <strong>ESP32</strong>.  
              Il propose un système de <strong>contribution technique</strong> donnant
              accès à des <strong>tirages techniques</strong> déclenchés par l’activité
              du pool ViaBTC.
            </p>

            <p>
              Éditeur : <strong>Développeur indépendant</strong>  
              <br />
              Contact : <a href="mailto:support@blockpulse.be">support@blockpulse.be</a>
            </p>

            <p>
              BlockPulse n’est ni un service financier, ni un jeu d’argent
              réglementé.  
              Aucun rendement ou gain garanti n’est proposé.
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
              Le site est hébergé par un prestataire européen conforme au RGPD.
            </p>
            <p>Engagements de l’hébergeur :</p>
            <ul className="bp-legal-list">
              <li>Infrastructure sécurisée</li>
              <li>Protection des données</li>
              <li>Aucune exploitation commerciale des données</li>
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
              Aucune garantie de fonctionnement continu, de disponibilité ou
              d’exactitude des données n’est fournie.
            </p>

            <p>
              Le prix du Bitcoin et les données de pool peuvent fluctuer
              fortement. BlockPulse ne fournit <strong>aucun conseil financier</strong>
              et ne garantit aucun résultat.
            </p>

            <p>
              Les bonus attribués lors des tirages techniques sont
              <strong>symboliques et non assurés</strong>.
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
              L’ensemble du contenu du site (textes, code, interface, éléments
              graphiques) est la propriété de son éditeur, sauf mentions
              contraires.
            </p>

            <p>
              Les marques <strong>Bitcoin</strong>, <strong>ViaBTC</strong>,
              <strong> NOWPayments</strong> et autres logos cités appartiennent à
              leurs détenteurs respectifs.
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
            <p>Pour toute question ou demande d’information :</p>
            <p>
              📩{" "}
              <a href="mailto:support@blockpulse.be">
                support@blockpulse.be
              </a>
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
