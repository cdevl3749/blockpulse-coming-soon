export default function PolitiqueCookies() {
  return (
    <div className="bp-legal-page">
      <div className="bp-container">

        <div className="bp-legal-header">
          <div className="bp-legal-icon">🍪</div>
          <h1>Politique des cookies</h1>
          <p className="bp-legal-subtitle">
            Comment BlockPulse utilise les cookies et technologies similaires.
          </p>
        </div>

        {/* 01 – Introduction */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">01</span>
            <h2>Introduction</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Le site <strong>BlockPulse.be</strong>, projet expérimental basé sur un ESP32,
              utilise des cookies uniquement dans le but d’assurer son fonctionnement
              technique et la stabilité des services liés aux tirages techniques.
            </p>

            <p>
              BlockPulse ne réalise aucun suivi publicitaire, aucun profilage utilisateur
              et ne collecte aucune donnée personnelle sensible via les cookies.
            </p>
          </div>
        </section>

        {/* 02 — Qu'est-ce qu'un cookie ? */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">02</span>
            <h2>Qu’est-ce qu’un cookie ?</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Un cookie est un petit fichier texte enregistré sur votre appareil.  
              Il permet à un site web de mémoriser certaines informations nécessaires
              pour fonctionner correctement ou améliorer votre expérience utilisateur.
            </p>
          </div>
        </section>

        {/* 03 — Cookies utilisés */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">03</span>
            <h2>Cookies utilisés sur BlockPulse</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              BlockPulse utilise exclusivement des cookies <strong>techniques essentiels</strong>.
              Aucun cookie publicitaire, de tracking comportemental ou de ciblage n’est utilisé.
            </p>

            <ul className="bp-legal-list">
              <li>
                <strong>Cookies techniques (obligatoires)</strong>
                <ul>
                  <li>Navigation interne du site</li>
                  <li>Affichage correcte des pages</li>
                  <li>Gestion de certaines préférences</li>
                </ul>
              </li>

              <li>
                <strong>Cookies de sécurité</strong>  
                Utilisés pour protéger le site contre les abus, attaques ou requêtes anormales.
              </li>
            </ul>

            <p>
              Aucune information personnelle identifiante n’est enregistrée dans ces cookies.
            </p>
          </div>
        </section>

        {/* 04 — Paiements */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">04</span>
            <h2>Cookies liés aux paiements</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Les paiements sont gérés par le prestataire externe{" "}
              <strong>NOWPayments</strong>.  
              Pendant un paiement, certains cookies techniques peuvent être créés par
              NOWPayments afin d’assurer :
            </p>

            <ul className="bp-legal-list">
              <li>la validation sécurisée du paiement</li>
              <li>le suivi temporaire de la transaction</li>
              <li>la détection d’activités suspectes ou frauduleuses</li>
            </ul>

            <p>
              Ces cookies ne contiennent aucune donnée sensible, et ne permettent pas
              de vous identifier personnellement.
            </p>
          </div>
        </section>

        {/* 05 — Gestion des cookies */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">05</span>
            <h2>Comment gérer ou désactiver les cookies ?</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Vous pouvez désactiver les cookies directement depuis les paramètres de
              votre navigateur :
            </p>

            <ul className="bp-legal-list">
              <li>Chrome — Paramètres &gt; Confidentialité &gt; Cookies</li>
              <li>Firefox — Vie privée &gt; Cookies</li>
              <li>Safari — Préférences &gt; Confidentialité</li>
              <li>Edge — Paramètres &gt; Cookies et autorisations</li>
            </ul>

            <p>
              Attention : la désactivation des cookies essentiels peut limiter
              certaines fonctionnalités.
            </p>
          </div>
        </section>

        {/* 06 — Mises à jour */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">06</span>
            <h2>Mises à jour de cette politique</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Cette politique pourra être mise à jour en fonction de l’évolution du
              projet BlockPulse ou des réglementations en vigueur.
            </p>
          </div>
        </section>

        <div className="bp-legal-footer">
          © {new Date().getFullYear()} BlockPulse.be — Tous droits réservés
        </div>
      </div>
    </div>
  );
}

