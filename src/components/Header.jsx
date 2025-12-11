import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [btc, setBtc] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitors, setVisitors] = useState(12); // valeur initiale réaliste
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

  // 🔵 Compteur visiteurs simulé
  useEffect(() => {
    const interval = setInterval(() => {
      const randomVisitors = Math.floor(Math.random() * (25 - 3 + 1)) + 3;
      setVisitors(randomVisitors);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBTC();
    const i = setInterval(fetchBTC, 5000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [menuOpen]);

  return (
    <header className="bp-header">
      <div className="bp-header-inner">

        {/* LOGO */}
        <Link to="/" className="bp-header-logo">
          <img
            src="/logo-round.png"
            alt="BlockPulse logo"
            className="bp-logo-round"
          />
          <div className="bp-logo-label">BlockPulse</div>
        </Link>

        {/* NAVIGATION */}
        <nav className={`bp-nav ${menuOpen ? "open" : ""}`}>
          <Link 
            to="/comment-ca-marche"
            className={location.pathname === "/comment-ca-marche" ? "active" : ""}
          >
            Comment ça marche
          </Link>
          <Link 
            to="/bonus-potentiel"
            className={location.pathname === "/bonus-potentiel" ? "active" : ""}
          >
            Bonus potentiel
          </Link>
          <Link 
            to="/temps-reel"
            className={location.pathname === "/temps-reel" ? "active" : ""}
          >
            Temps réel
          </Link>
          <Link 
            to="/participer"
            className={location.pathname === "/participer" ? "active" : ""}
          >
            Participer
          </Link>
          <Link 
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
          <Link 
            to="/faq"
            className={location.pathname === "/faq" ? "active" : ""}
          >
            FAQ
          </Link>
        </nav>

        {/* BADGE + VISITEURS + BTC */}
        <div className="bp-header-right">

          {/* 🟢 Visiteurs en direct */}
          <div className="bp-visitors">
            🟢 {visitors} en ce moment
          </div>

          {/* BTC TICKER */}
          <div className="bp-ticker">
            <span className="bp-ticker-label">BTC</span>
            <span className="bp-ticker-value">
              {btc ? `${btc} €` : "…"}
            </span>
          </div>
        </div>

        {/* MENU TOGGLE (mobile) */}
        <button
          className="bp-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </header>
  );
}
