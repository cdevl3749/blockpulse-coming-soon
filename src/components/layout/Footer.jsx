import styles from "./Footer.module.css";
import beFlag from "@/assets/be-flag.svg";
import paypal from "@/assets/icons/paypal.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    // Si on n'est pas sur la home, on navigue vers la home avec un hash
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    // Sinon scroll direct
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* COL 1 — BRAND */}
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

        {/* COL 2 — NAV */}
        <div className={styles.links}>
          <h4>Navigation</h4>

          {/* Sections sur Home */}
          <button type="button" onClick={() => goToSection("fonctionnement")}>
            Fonctionnement
          </button>

          <button type="button" onClick={() => goToSection("abonnements")}>
            Abonnements
          </button>

          <button type="button" onClick={() => goToSection("faq")}>
            FAQ
          </button>

          {/* Page dédiée */}
          <Link to="/contact">Contact</Link>
        </div>

        {/* COL 3 — SOCIAL */}
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

      {/* BOTTOM */}
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


