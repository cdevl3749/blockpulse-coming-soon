import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bp-footer">
      <div className="bp-footer-inner">
        
        {/* Logo et description */}
        <div className="bp-footer-brand">
          <div className="bp-footer-logo">
            <div className="bp-logo-icon">#</div>
            <span className="bp-logo-label">BlockPulse</span>
          </div>
          <p className="bp-footer-tagline">
            Projet expérimental de loterie Bitcoin sur ESP32
          </p>
        </div>

        {/* Liens principaux */}
        <div className="bp-footer-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-confidentialite">Confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        {/* Paiements sécurisés */}
        <div className="bp-footer-payment">
          <p className="bp-footer-section-title">Paiements sécurisés</p>

          <div className="bp-payment-logos">

            {/* VISA */}
            <div className="bp-payment-card">
              <svg
                viewBox="0 0 80 50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Visa"
              >
                <defs>
                  <linearGradient id="visaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A1F71" />
                    <stop offset="100%" stopColor="#1434CB" />
                  </linearGradient>
                </defs>
                <rect width="80" height="50" rx="6" fill="url(#visaGrad)" />
                
                {/* Logo VISA simplifié */}
                <text x="40" y="32" textAnchor="middle" fill="#FFF" fontSize="20" fontWeight="700" fontFamily="system-ui">
                  VISA
                </text>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="bp-payment-card">
              <svg
                viewBox="0 0 80 50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Mastercard"
              >
                <rect width="80" height="50" rx="6" fill="#000" />
                
                {/* Cercles Mastercard */}
                <circle cx="30" cy="25" r="11" fill="#EB001B" opacity="0.95" />
                <circle cx="50" cy="25" r="11" fill="#F79E1B" opacity="0.95" />
              </svg>
            </div>

            {/* NOWPayments - Crypto */}
            <div className="bp-payment-card">
              <svg
                viewBox="0 0 80 50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="NOWPayments - Crypto"
              >
                <defs>
                  <linearGradient id="cryptoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0A0F2B" />
                    <stop offset="100%" stopColor="#141B3D" />
                  </linearGradient>
                  <linearGradient id="cryptoIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                
                <rect width="80" height="50" rx="6" fill="url(#cryptoBg)" />
                <rect width="80" height="50" rx="6" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.4" />
                
                {/* Symbole Bitcoin */}
                <circle cx="22" cy="25" r="9" fill="url(#cryptoIcon)" />
                <text x="22" y="30" textAnchor="middle" fill="#0A0F2B" fontSize="13" fontWeight="700">
                  ₿
                </text>
                
                {/* Texte NOW Payments */}
                <text x="38" y="22" fill="#22D3EE" fontSize="10" fontWeight="700" fontFamily="system-ui">
                  NOW
                </text>
                <text x="38" y="32" fill="#64748B" fontSize="7" fontWeight="500" fontFamily="system-ui">
                  Payments
                </text>
              </svg>
            </div>

          </div>
        </div>

        {/* Badges de confiance */}
        <div className="bp-footer-trust">
          <p className="bp-footer-section-title">Sécurité & Conformité</p>
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
              <span>EU Host</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bp-footer-disclaimer">
          <p>
            Bitcoin, ViaBTC, NOWPayments et les autres marques citées sont la
            propriété de leurs détenteurs respectifs.
            Ce site est un projet indépendant et expérimental, sans garantie de gains.
          </p>
        </div>

        {/* Copyright */}
        <div className="bp-footer-bottom">
          <p>© {year} BlockPulse.be — Tous droits réservés</p>
        </div>

      </div>
    </footer>
  );
}