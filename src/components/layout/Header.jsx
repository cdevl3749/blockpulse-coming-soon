import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.css";

// Logo
import logo from "../../assets/logo-round.png";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Token client (dashboard)
  const [bpToken, setBpToken] = useState(() => {
    try {
      return localStorage.getItem("bp_token") || "";
    } catch {
      return "";
    }
  });

  // Fermer le menu quand on change de page
  useEffect(() => {
    setMenuOpen(false);

    // Rafraîchir le token à chaque navigation
    try {
      setBpToken(localStorage.getItem("bp_token") || "");
    } catch {
      setBpToken("");
    }
  }, [location.pathname, location.hash]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // ===== BTC price (temps réel, discret) =====
  const [btcEur, setBtcEur] = useState(null);
  const [btcStatus, setBtcStatus] = useState("idle");

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("fr-BE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    []
  );

  useEffect(() => {
    let mounted = true;

    const fetchBtc = async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("fetch error");

        const data = await res.json();
        const price = Number(data.price);

        if (mounted && Number.isFinite(price)) {
          setBtcEur(price);
          setBtcStatus("ok");
        }
      } catch {
        if (mounted) setBtcStatus("error");
      }
    };

    fetchBtc();
    const interval = setInterval(fetchBtc, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // 🔥 Scroll top logo
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // ✅ Lien espace client intelligent
  const espaceClientLink = bpToken
    ? `/mon-espace?token=${encodeURIComponent(bpToken)}`
    : "/mon-espace";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo → Accueil */}
        <Link to="/" className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="BlockPulse logo" className={styles.logoImg} />
          <span>BlockPulse</span>
        </Link>

        <div className={styles.right}>
          {/* BTC pill */}
          <div className={styles.btcPill} aria-label="Prix du Bitcoin">
            <span className={styles.btcLabel}>BTC</span>
            <span className={styles.btcValue}>
              {btcEur
                ? formatter.format(btcEur)
                : btcStatus === "error"
                ? "—"
                : "…"}
            </span>
          </div>

          {/* Navigation Desktop */}
          <nav className={styles.nav}>
            <Link to="/#fonctionnement">Fonctionnement</Link>
            <Link to="/#abonnements">Abonnements</Link>
            <Link to="/#faq">FAQ</Link>
            <Link to="/contact">Contact</Link>

            {/* ✅ Espace client */}
            <Link to={espaceClientLink}>Espace client</Link>
          </nav>

          {/* Burger */}
          <button
            className={styles.burgerBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? styles.burgerOpen : ""}></span>
            <span className={menuOpen ? styles.burgerOpen : ""}></span>
            <span className={menuOpen ? styles.burgerOpen : ""}></span>
          </button>
        </div>
      </div>

      {/* Overlay mobile */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Navigation Mobile */}
      <nav
        className={`${styles.mobileNav} ${
          menuOpen ? styles.mobileNavOpen : ""
        }`}
      >
        <Link to="/#fonctionnement">🔧 Fonctionnement</Link>
        <Link to="/#abonnements">💎 Abonnements</Link>
        <Link to="/#faq">❓ FAQ</Link>
        <Link to="/contact">✉️ Contact</Link>

        {/* ✅ Espace client */}
        <Link to={espaceClientLink}>👤 Espace client</Link>
      </nav>
    </header>
  );
}
