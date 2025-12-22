import styles from "./Footer.module.css";
import beFlag from "@/assets/be-flag.svg";
import paypal from "@/assets/icons/paypal.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempt < 10) setTimeout(() => tryScroll(attempt + 1), 50);
    };

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => tryScroll(0), 0);
      return;
    }

    tryScroll(0);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoLine}>
            <img src={beFlag} alt="Belgique" />
            <span>BlockPulse</span>
          </div>

          <p>
            Projet technique belge basé sur ESP32.<br />
            Données crypto en temps réel, sans API externe.
          </p>

          <div className={styles.payment}>
            <img src={paypal} alt="PayPal" />
            <span>Paiement sécurisé via PayPal</span>
          </div>
        </div>

        <div className={styles.links}>
          <h4>Navigation</h4>

          <button type="button" onClick={() => goToSection("fonctionnement")}>
            Fonctionnement
          </button>

          <button type="button" onClick={() => goToSection("abonnements")}>
            Abonnements
          </button>

          <button type="button" onClick={() => goToSection("faq")}>
            FAQ
          </button>

          <Link
            to="/tools/bitcoin-actif"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            🟢 État du réseau Bitcoin
          </Link>

          {/* ⚠️ Si ça va encore à la mauvaise section, l'ID n'est pas "temps-reel"
              Remplace "temps-reel" par l'ID exact de ta section ESP32 sur la home. */}
          <button type="button" onClick={() => goToSection("temps-reel")}>
            📡 Données Bitcoin en direct
          </button>

          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className={styles.social}>
          <h4>Réseaux</h4>
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

      <div className={styles.bottom}>
        <span>© 2025 BlockPulse.be</span>

        <div className={styles.legal}>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

