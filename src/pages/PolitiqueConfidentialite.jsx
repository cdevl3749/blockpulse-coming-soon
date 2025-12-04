export default function PolitiqueConfidentialite() {
  return (
    <div className="bp-legal-page">
      <div className="bp-container">

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
              module ESP32 connecté au pool ViaBTC.  
              Le site respecte votre vie privée et collecte uniquement les données
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
              BlockPulse collecte uniquement les données strictement
              nécessaires au fonctionnement du site et du système de contribution technique.
            </p>

            <p>Nous pouvons collecter :</p>

            <ul className="bp-legal-list">
              <li>
                Votre adresse e-mail (uniquement si vous nous contactez volontairement)
              </li>
              <li>
                Des données techniques anonymisées : type de navigateur, pages
                visitées, temps passé, etc.
              </li>
              <li>
                Les retours de paiement fournis par <strong>NOWPayments</strong>  
                (montant, statut, ID de transaction) —  
                <strong>aucune donnée bancaire</strong> n’est jamais collectée.
              </li>
            </ul>

            <p>
              BlockPulse ne collecte ni identité, ni adresse postale, ni numéro
              de téléphone, ni carte bancaire.
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
              Tous les paiements sont traités via la plateforme sécurisée{" "}
              <strong>NOWPayments</strong>.  
              BlockPulse ne reçoit et ne stocke aucune donnée de paiement.
            </p>

            <p>
              NOWPayments applique des standards stricts :  
              cryptage, conformité, anti-fraude, surveillance des transactions.
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
              <li>Assurer le fonctionnement du site et du tableau de bord</li>
              <li>Gérer les paiements via NOWPayments</li>
              <li>Analyser l’utilisation du site (statistiques anonymisées)</li>
              <li>Déclencher et gérer les tirages techniques</li>
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
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>

            <ul className="bp-legal-list">
              <li>Droit d’accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit d’opposition</li>
            </ul>

            <p>
              Pour exercer vos droits, contactez :  
              <br />
              📩{" "}
              <a href="mailto:support@blockpulse.be">
                support@blockpulse.be
              </a>
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

        <div className="bp-legal-footer">
          © {new Date().getFullYear()} BlockPulse.be — Tous droits réservés
        </div>
      </div>
    </div>
  );
}

