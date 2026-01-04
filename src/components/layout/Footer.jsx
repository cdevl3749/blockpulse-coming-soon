import styles from "./Footer.module.css";
import beFlag from "@/assets/be-flag.svg";
import paypal from "@/assets/icons/paypal.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEN = location.pathname.startsWith("/en");

  /**
   * Scroll to a section on the HOME page.
   * Works even if we are currently on another route.
   */
  const goToHomeSection = (id) => {
    const homePath = isEN ? "/en" : "/";

    // If not already on home, navigate first
    if (location.pathname !== homePath) {
      navigate(`${homePath}#${id}`);
      return;
    }

    // Already on home → scroll directly
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logoLine}>
            <img src={beFlag} alt="Belgium" />
            <span>BlockPulse</span>
          </div>

          <p>
            {isEN ? (
              <>
                Belgian technical project based on ESP32.
                <br />
                Real-time crypto data, no external API.
              </>
            ) : (
              <>
                Projet technique belge basé sur ESP32.
                <br />
                Données crypto en temps réel, sans API externe.
              </>
            )}
          </p>

          <div className={styles.payment}>
            <img src={paypal} alt="PayPal" />
            <span>
              {isEN ? "Secure payment via PayPal" : "Paiement sécurisé via PayPal"}
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className={styles.links}>
          <h4>Navigation</h4>

          <button type="button" onClick={() => goToHomeSection("fonctionnement")}>
            {isEN ? "How it works" : "Fonctionnement"}
          </button>

          <button type="button" onClick={() => goToHomeSection("abonnements")}>
            {isEN ? "Pricing" : "Abonnements"}
          </button>

          <button type="button" onClick={() => goToHomeSection("faq")}>
            FAQ
          </button>

          <Link
            to={
              isEN
                ? "/en/tools/bitcoin-network-status"
                : "/tools/bitcoin-actif"
            }
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            🟢 {isEN ? "Bitcoin network status" : "État du réseau Bitcoin"}
          </Link>

          <button type="button" onClick={() => goToHomeSection("temps-reel")}>
            📡 {isEN ? "Live Bitcoin data" : "Données Bitcoin en direct"}
          </button>

          <Link to={isEN ? "/en/a-propos" : "/a-propos"}>
            {isEN ? "About" : "À propos"}
          </Link>

          <Link to={isEN ? "/en/contact" : "/contact"}>
            {isEN ? "Contact" : "Contact"}
          </Link>
        </div>

        {/* SOCIAL */}
        <div className={styles.social}>
          <h4>{isEN ? "Social" : "Réseaux"}</h4>
          <a
            href="https://www.linkedin.com/in/christophe-devleeshouwer-882377399/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span>© 2025 BlockPulse.be</span>

        <div className={styles.legal}>
          <Link to={isEN ? "/en/mentions-legales" : "/mentions-legales"}>
            {isEN ? "Legal notice" : "Mentions légales"}
          </Link>

          <Link
            to={
              isEN
                ? "/en/politique-confidentialite"
                : "/politique-confidentialite"
            }
          >
            {isEN ? "Privacy policy" : "Confidentialité"}
          </Link>

          <Link to={isEN ? "/en/cookies" : "/cookies"}>Cookies</Link>
        </div>
      </div>
    </footer>
  );
}




