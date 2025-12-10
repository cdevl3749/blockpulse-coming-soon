import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bp-footer">
      <div className="bp-footer-inner" style={{ paddingTop: "40px" }}>

        {/* Section haute compacte */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div className="bp-footer-logo" style={{ justifyContent: "center" }}>
            <div className="bp-logo-icon">#</div>
            <span className="bp-logo-label">BlockPulse</span>
          </div>

          <p
            style={{
              marginTop: "10px",
              fontSize: "0.95rem",
              color: "var(--bp-muted)",
              marginBottom: "8px",
              maxWidth: "620px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Projet technique basé sur un module <strong>ESP32 réel</strong>,
            relié au pool ViaBTC.  
            Tirages symboliques déclenchés par l’activité du réseau.
          </p>

          <Link
            to="/temps-reel"
            style={{
              display: "inline-block",
              color: "var(--bp-accent)",
              marginTop: "4px",
              fontSize: "0.9rem",
              opacity: 0.9,
            }}
          >
            🔍 Preuve : voir l’activité en temps réel
          </Link>
        </div>

        {/* Ligne discrète */}
        <div
          style={{
            height: "1px",
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            margin: "25px auto",
          }}
        ></div>

        {/* Liens principaux */}
        <div
          className="bp-footer-links"
          style={{ marginBottom: "25px", textAlign: "center" }}
        >
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-confidentialite">Confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        {/* Paiements */}
        <div className="bp-footer-payment" style={{ marginBottom: "35px" }}>
          <p className="bp-footer-section-title">Paiements acceptés</p>

          <div className="bp-payment-logos">

            {/* BTC */}
            <div className="bp-payment-card">
              <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="50" rx="6" fill="#0A0F2B" />
                <text
                  x="40"
                  y="32"
                  textAnchor="middle"
                  fill="#F7931A"
                  fontSize="26"
                  fontWeight="700"
                >
                  ₿
                </text>
              </svg>
            </div>

            {/* ETH */}
            <div className="bp-payment-card">
              <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="50" rx="6" fill="#0A0F2B" />
                <text
                  x="40"
                  y="30"
                  textAnchor="middle"
                  fill="#9b59b6"
                  fontSize="22"
                  fontWeight="700"
                >
                  Ξ
                </text>
              </svg>
            </div>

            {/* SEPA */}
            <div className="bp-payment-card">
              <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="50" rx="6" fill="#0A0F2B" />
                <text
                  x="40"
                  y="32"
                  textAnchor="middle"
                  fill="#4da3ff"
                  fontSize="18"
                  fontWeight="700"
                >
                  SEPA
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bp-footer-trust" style={{ marginBottom: "35px" }}>
          <p className="bp-footer-section-title">Sécurité & conformité</p>
          <div className="bp-trust-badges">
            <div className="bp-trust-badge">
              <span>🔒</span>
              <span>SSL</span>
            </div>
            <div className="bp-trust-badge">
              <span>🛡️</span>
              <span>RGPD</span>
            </div>
            <div className="bp-trust-badge">
              <span>🇪🇺</span>
              <span>Hébergement UE</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="bp-footer-disclaimer"
          style={{ maxWidth: "700px", margin: "0 auto 28px" }}
        >
          <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            BlockPulse est un projet technique & pédagogique.  
            Aucun rendement financier n’est garanti.  
            Les marques Bitcoin, Ethereum, Ledger et ViaBTC appartiennent à leurs détenteurs respectifs.
          </p>
        </div>

        {/* Copyright */}
        <div className="bp-footer-bottom" style={{ marginTop: "10px" }}>
          <p>© {year} BlockPulse.be — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
