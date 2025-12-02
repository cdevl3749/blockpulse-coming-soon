export default function PolitiqueConfidentialite() {
  return (
    <div className="bp-legal-page">
      <div className="bp-container">

        <div className="bp-legal-header">
          <div className="bp-legal-icon">🔒</div>
          <h1>Politique de confidentialité</h1>
          <p className="bp-legal-subtitle">
            Comment BlockPulse gère vos données personnelles.
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
              BlockPulse.be respecte la confidentialité des utilisateurs.
              Ce projet étant expérimental, nous collectons le minimum
              de données nécessaires à son fonctionnement.
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
            <p>Aucune donnée personnelle sensible n’est collectée.</p>

            <p>BlockPulse peut collecter :</p>

            <ul className="bp-legal-list">
              <li>Votre adresse e-mail (si vous nous contactez volontairement)</li>
              <li>Des données techniques anonymisées : navigateur, pages visitées…</li>
              <li>Le statut du paiement via NOWPayments (aucune donnée bancaire)</li>
            </ul>

            <p>
              BlockPulse ne collecte ni carte bancaire, ni identité, ni adresse.
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
              Les paiements sont gérés exclusivement par <strong>NOWPayments</strong>.
              Aucune donnée de paiement n’est stockée par BlockPulse.
            </p>

            <p>
              NOWPayments est conforme aux standards de sécurité
              du secteur (cryptage, anti-fraude…).
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
            <ul className="bp-legal-list">
              <li>Assurer le fonctionnement technique du site</li>
              <li>Garantir la gestion des paiements</li>
              <li>Analyser l’utilisation du site (de manière anonyme)</li>
              <li>Améliorer l’expérience utilisateur</li>
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
            <p>Conformément au RGPD, vous disposez de :</p>

            <ul className="bp-legal-list">
              <li>Droit d’accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit d’opposition</li>
            </ul>

            <p>
              Pour exercer vos droits :  
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
              Cette politique peut être mise à jour en fonction des besoins du projet
              ou de l’évolution de la réglementation.
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
