import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.css";

// Logo
import logo from "../../assets/logo-round.png";

/**
 * Route equivalence mapping (FR <-> EN)
 * Keep this minimal and explicit to avoid surprises.
 */
const ROUTE_EQUIV = {
  "/tools/bitcoin-actif": "/tools/bitcoin-network-status",
  "/tools/bitcoin-network-status": "/tools/bitcoin-actif",
};

function computeLangSwitchHref({ pathname, search, hash }, targetLang) {
  const isEN = pathname.startsWith("/en");
  const base = isEN ? pathname.replace(/^\/en/, "") || "/" : pathname;

  // Map specific routes (tools) to their equivalent.
  const mapped = ROUTE_EQUIV[base] ?? base;

  const nextPath =
    targetLang === "en"
      ? mapped === "/"
        ? "/en"
        : `/en${mapped}`
      : mapped; // fr

  return `${nextPath}${search || ""}${hash || ""}`;
}

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // ===============================
  // 🌍 LANG SWITCH (FR / EN) — robuste
  // ===============================
  const isEN = location.pathname.startsWith("/en");

  const switchToEN = computeLangSwitchHref(
    {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
    "en"
  );

  const switchToFR = computeLangSwitchHref(
    {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
    "fr"
  );

  // ===============================
  // 🏷️ Labels navigation (FR / EN)
  // ===============================
  const labels = isEN
    ? {
        how: "How it works",
        pricing: "Pricing",
        faq: "FAQ",
        contact: "Contact",
        client: "Client area",
      }
    : {
        how: "Fonctionnement",
        pricing: "Abonnements",
        faq: "FAQ",
        contact: "Contact",
        client: "Espace client",
      };

  // ===============================
  // ✅ Token client (dashboard)
  // ===============================
  const [bpToken, setBpToken] = useState(() => {
    try {
      return localStorage.getItem("bp_token") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    setMenuOpen(false);
    try {
      setBpToken(localStorage.getItem("bp_token") || "");
    } catch {
      setBpToken("");
    }
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // ===============================
  // ₿ BTC price
  // ===============================
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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // ✅ Client area must follow language + keep token
  const espaceClientBase = isEN ? "/en/mon-espace" : "/mon-espace";
  const espaceClientLink = bpToken
    ? `${espaceClientBase}?token=${encodeURIComponent(bpToken)}`
    : espaceClientBase;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link
          to={isEN ? "/en" : "/"}
          className={styles.logo}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="BlockPulse logo" className={styles.logoImg} />
          <span>BlockPulse</span>
        </Link>

        <div className={styles.right}>
          {/* BTC pill */}
          <div className={styles.btcPill} aria-label="Bitcoin price">
            <span className={styles.btcLabel}>BTC</span>
            <span className={styles.btcValue}>
              {btcEur ? formatter.format(btcEur) : btcStatus === "error" ? "—" : "…"}
            </span>
          </div>

          {/* 🌍 LANG SWITCH (desktop) */}
          <div style={{ marginLeft: "12px", fontSize: "14px", opacity: 0.8 }}>
            {isEN ? <Link to={switchToFR}>FR</Link> : <Link to={switchToEN}>EN</Link>}
          </div>

          {/* Navigation Desktop */}
          <nav className={styles.nav}>
            <Link to={isEN ? "/en#fonctionnement" : "/#fonctionnement"}>
              {labels.how}
            </Link>
            <Link to={isEN ? "/en#abonnements" : "/#abonnements"}>
              {labels.pricing}
            </Link>
            <Link to={isEN ? "/en#faq" : "/#faq"}>{labels.faq}</Link>
            <Link to={isEN ? "/en/contact" : "/contact"}>{labels.contact}</Link>

            <Link to={espaceClientLink}>{labels.client}</Link>
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

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Navigation Mobile */}
      <nav
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
      >
        {/* 🌍 LANG SWITCH (mobile) */}
        <div style={{ padding: "12px 16px", fontWeight: 600 }}>
          {isEN ? (
            <Link to={switchToFR}>🇫🇷 Français</Link>
          ) : (
            <Link to={switchToEN}>🇬🇧 English</Link>
          )}
        </div>

        <Link to={isEN ? "/en#fonctionnement" : "/#fonctionnement"}>
          🔧 {labels.how}
        </Link>

        {/* ✅ FIX: FR must be /#abonnements (not /abonnements) */}
        <Link to={isEN ? "/en#abonnements" : "/#abonnements"}>
          {labels.pricing}
        </Link>

        <Link to={isEN ? "/en#faq" : "/#faq"}>❓ {labels.faq}</Link>
        <Link to={isEN ? "/en/contact" : "/contact"}>✉️ {labels.contact}</Link>

        <Link to={espaceClientLink}>👤 {labels.client}</Link>
      </nav>
    </header>
  );
}




