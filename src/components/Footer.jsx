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
            Plateforme de contribution technique basée sur un module ESP32.  
            Tirages symboliques déclenchés par l’activité du pool ViaBTC.
          </p>
        </div>

        {/* Liens principaux */}
        <div className="bp-footer-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-confidentialite">Confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        {/* Paiements crypto réels */}
        <div className="bp-footer-payment">
          <p className="bp-footer-section-title">Paiements acceptés</p>

          <div className="bp-payment-logos">

            {/* Bitcoin */}
            <div className="bp-payment-card">
              <svg
                viewBox="0 0 80 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Bitcoin"
              >
                <rect width="80" height="50" rx="6" fill="#0A0F2B" />
                <text
                  x="40"
                  y="32"
                  textAnchor="middle"
                  fill="#F7931A"
                  fontSize="26"
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  ₿
                </text>
              </svg>
            </div>

            {/* Ethereum */}
            <div className="bp-payment-card">
              <svg
                viewBox="0 0 80 50"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Ethereum"
              >
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
  <svg
    viewBox="0 0 80 50"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="SEPA Bank Transfer"
  >
    <rect width="80" height="50" rx="6" fill="#0A0F2B" />

    <text
      x="40"
      y="32"
      textAnchor="middle"
      fill="#4da3ff"
      fontSize="18"
      fontWeight="700"
      fontFamily="system-ui"
    >
      SEPA
    </text>
  </svg>
</div>


          </div>
        </div>

        {/* Badges de confiance */}
        <div className="bp-footer-trust">
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
              <span>Hébergement EU</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bp-footer-disclaimer">
          <p>
            Bitcoin, Ethereum, Ledger et ViaBTC appartiennent à leurs détenteurs respectifs.  
            BlockPulse est un projet expérimental sans rendement garanti.  
            Les bonus attribués lors des tirages sont symboliques et dépendants
            de l’activité réelle du pool ViaBTC.
          </p>
        </div>

        {/* Réseaux sociaux */}
<div className="bp-footer-socials">
  <a
    href="https://www.linkedin.com/in/christophe-devleeshouwer-882377399/"
    target="_blank"
    rel="noopener noreferrer"
    className="bp-social-link"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 
      5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 
      0-1.75-.79-1.75-1.764s.784-1.764 
      1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 
      1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.113-4 
      0v5.604h-3v-10h3v1.765c1.396-2.586 7-2.777 
      7 2.476v5.759z"/>
    </svg>
  </a>
</div>


        {/* Copyright */}
        <div className="bp-footer-bottom">
          <p>© {year} BlockPulse.be — Tous droits réservés</p>
        </div>

      </div>
    </footer>
  );
}

