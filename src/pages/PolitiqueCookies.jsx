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
              Cette politique explique comment le site <strong>BlockPulse.be</strong> utilise 
              les cookies et technologies similaires.  
              BlockPulse étant un projet expérimental, notre utilisation des cookies est
              volontairement <strong>réduite au strict minimum</strong>.
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
              Un cookie est un petit fichier enregistré sur votre appareil pour permettre au
              site de fonctionner correctement ou d’améliorer l’expérience utilisateur.
            </p>
          </div>
        </section>

        {/* 03 — Cookies utilisés par BlockPulse */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">03</span>
            <h2>Cookies utilisés sur BlockPulse</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              BlockPulse utilise uniquement des cookies techniques essentiels.
              Aucun cookie publicitaire, aucun cookie de tracking personnel n'est utilisé.
            </p>

            <ul className="bp-legal-list">
              <li>
                <strong>Cookies techniques (obligatoires)</strong> — nécessaires au bon
                fonctionnement du site, tels que :
                <ul>
                  <li>Gestion de la navigation</li>
                  <li>Affichage des pages</li>
                  <li>Maintien de certaines préférences</li>
                </ul>
              </li>

              <li>
                <strong>Cookies de sécurité</strong> — utilisés pour protéger le site
                contre les abus ou attaques (ex : limitations de requêtes).
              </li>
            </ul>

            <p>
              BlockPulse <strong>ne stocke aucune information personnelle</strong> dans des cookies.
            </p>
          </div>
        </section>

        {/* 04 — Paiements et Cookies */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">04</span>
            <h2>Cookies liés aux paiements</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Les paiements sont gérés par le prestataire externe 
              <strong> NOWPayments</strong>.  
              Lors d’un paiement, certains cookies strictement techniques peuvent être
              utilisés par NOWPayments pour garantir :
            </p>

            <ul className="bp-legal-list">
              <li>la validation du paiement</li>
              <li>la sécurisation des transactions</li>
              <li>la détection de fraude</li>
            </ul>

            <p>
              Ces cookies ne contiennent aucune donnée personnelle
              et ne permettent pas de vous identifier.
            </p>
          </div>
        </section>

        {/* 05 — Désactivation */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">05</span>
            <h2>Comment gérer ou désactiver les cookies ?</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Vous pouvez désactiver les cookies non essentiels depuis les paramètres
              de votre navigateur :
            </p>

            <ul className="bp-legal-list">
              <li>Chrome — Paramètres &gt; Confidentialité &gt; Cookies</li>
              <li>Firefox — Options &gt; Vie privée &gt; Cookies</li>
              <li>Safari — Préférences &gt; Confidentialité</li>
              <li>Edge — Paramètres &gt; Cookies et autorisations</li>
            </ul>

            <p>
              Note : si vous désactivez les cookies essentiels, certaines fonctionnalités
              du site peuvent être limitées.
            </p>
          </div>
        </section>

        {/* 06 — Mises à jour */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">06</span>
            <h2>Mises à jour</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Cette politique peut être mise à jour en fonction de l’évolution 
              du projet BlockPulse ou de nouvelles exigences légales.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="bp-legal-footer">
          © {new Date().getFullYear()} BlockPulse.be — Tous droits réservés
        </div>

      </div>
    </div>
  );
}
