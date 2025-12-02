import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [btc, setBtc] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  async function fetchBTC() {
    try {
      const res = await fetch("https://blockchain.info/ticker");
      const json = await res.json();
      setBtc(json.EUR.last.toLocaleString("fr-FR"));
    } catch (e) {
      console.log("Erreur BTC :", e);
    }
  }

  useEffect(() => {
    fetchBTC();
    const i = setInterval(fetchBTC, 5000); // Toutes les 5 secondes
    return () => clearInterval(i);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMenuOpen(false);
    // Scroll vers le haut à chaque changement de page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className="bp-header">
      <div className="bp-header-inner">

        {/* LOGO */}
        <Link to="/" className="bp-header-logo">
          <div className="bp-logo-icon">#</div>
          <div className="bp-logo-label">BlockPulse</div>
        </Link>

        {/* NAVIGATION */}
        <nav className={`bp-nav ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/comment-ca-marche"
            className={location.pathname === '/comment-ca-marche' ? 'active' : ''}
          >
            Comment ça marche
          </Link>
          <Link 
            to="/bonus-potentiel"
            className={location.pathname === '/bonus-potentiel' ? 'active' : ''}
          >
            Bonus potentiel
          </Link>
          <Link 
            to="/temps-reel"
            className={location.pathname === '/temps-reel' ? 'active' : ''}
          >
            Temps réel
          </Link>
          <Link 
            to="/participer"
            className={location.pathname === '/participer' ? 'active' : ''}
          >
            Participer
          </Link>
          <Link 
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
          <Link 
            to="/faq"
            className={location.pathname === '/faq' ? 'active' : ''}
          >
            FAQ
          </Link>
        </nav>

        {/* BTC TICKER */}
        <div className="bp-ticker">
          <span className="bp-ticker-label">BTC</span>
          <span className="bp-ticker-value">
            {btc ? `${btc} €` : "…"}
          </span>
        </div>

        {/* MENU TOGGLE (mobile) */}
        <button 
          className="bp-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>
    </header>
  );
}