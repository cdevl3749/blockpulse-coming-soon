export default function PolitiqueConfidentialite() {
  return (
    <div className="bp-legal-page">
      <div className="bp-container">

        {/* Header */}
        <div className="bp-legal-header">
          <div className="bp-legal-icon">🔒</div>
          <h1>Politique de confidentialité</h1>
          <p className="bp-legal-subtitle">
            Comment BlockPulse gère et protège vos données personnelles.
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
              BlockPulse.be est un projet technologique expérimental basé sur un
              module <strong>ESP32</strong> connecté au pool <strong>ViaBTC</strong>.
              Le site respecte votre vie privée et ne collecte que les données
              nécessaires à son fonctionnement technique.
            </p>

            <p>
              BlockPulse ne propose aucun service financier et ne stocke aucune
              donnée bancaire ou sensible.
            </p>
          </div>
        </section>

        {/* 02 – Données collectées */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">02</span>
            <h2>Données collectées</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              BlockPulse collecte uniquement les données strictement nécessaires
              pour assurer le fonctionnement du site et du système de
              participation technique.
            </p>

            <p>Nous pouvons collecter :</p>

            <ul className="bp-legal-list">
              <li>
                Votre adresse e-mail (uniquement si vous nous contactez
                volontairement).
              </li>
              <li>
                Des données techniques anonymisées : type de navigateur,
                pages visitées, temps passé, erreurs éventuelles.
              </li>
              <li>
                Des données relatives aux interactions sur le site (clics,
                actions techniques, choix de packs).
              </li>
            </ul>

            <p>
              BlockPulse ne collecte <strong>aucune donnée de paiement</strong>, 
              aucune identité, aucun numéro de téléphone et aucune adresse physique.
            </p>
          </div>
        </section>

        {/* 03 – Paiements */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">03</span>
            <h2>Paiements et sécurité</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Les paiements sont envoyés <strong>directement</strong> vers les
              adresses officielles <strong>Ledger BTC</strong> et
              <strong> Ledger ETH</strong> de BlockPulse.
            </p>

            <p>
              Aucun prestataire tiers de paiement n’est utilisé.  
              Aucune information bancaire, aucune adresse IP liée à un paiement
              et aucune donnée sensible n’est collectée.
            </p>

            <p>
              Les utilisateurs conservent le contrôle total sur leurs fonds en
              utilisant leur propre portefeuille crypto.
            </p>
          </div>
        </section>

        {/* 04 – Finalités */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">04</span>
            <h2>Finalité de l’utilisation des données</h2>
          </div>

          <div className="bp-legal-card">
            <p>Les données collectées servent à :</p>

            <ul className="bp-legal-list">
              <li>Assurer le fonctionnement du site</li>
              <li>Assurer le fonctionnement du système de tirages techniques</li>
              <li>Analyser l’utilisation du site (statistiques anonymisées)</li>
              <li>Améliorer l’expérience utilisateur et la stabilité du projet</li>
            </ul>
          </div>
        </section>

        {/* 05 – Vos droits */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">05</span>
            <h2>Vos droits</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>

            <ul className="bp-legal-list">
              <li>Droit d’accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit d’opposition</li>
            </ul>

            <p>
              Pour exercer vos droits, contactez :  
              <br />
              📩 <a href="mailto:support@blockpulse.be">support@blockpulse.be</a>
            </p>
          </div>
        </section>

        {/* 06 – Mise à jour */}
        <section className="bp-legal-section">
          <div className="bp-legal-section-header">
            <span className="bp-legal-number">06</span>
            <h2>Mises à jour</h2>
          </div>

          <div className="bp-legal-card">
            <p>
              Cette politique pourra être modifiée en fonction des besoins du
              projet ou des évolutions réglementaires.
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
