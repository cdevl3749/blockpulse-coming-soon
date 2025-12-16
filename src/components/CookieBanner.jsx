import { useState } from "react";
import styles from "./CookieBanner.module.css";
import { getConsent, setConsent } from "../consent/cookieConsent";

export default function CookieBanner() {
  const existing = getConsent();
  const [open, setOpen] = useState(!existing);
  const [settings, setSettings] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!open) return null;

  const acceptAll = () => {
    setConsent({ choice: "accepted", analytics: true, marketing: true });
    setOpen(false);
  };

  const rejectAll = () => {
    setConsent({ choice: "rejected", analytics: false, marketing: false });
    setOpen(false);
  };

  const saveSettings = () => {
    setConsent({
      choice: analytics || marketing ? "accepted" : "rejected",
      analytics,
      marketing,
    });
    setSettings(false);
    setOpen(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <p>
          Nous utilisons des cookies nécessaires au fonctionnement du site.
          Avec votre accord, des cookies de mesure d’audience ou marketing
          peuvent être utilisés.
        </p>

        {!settings ? (
          <div className={styles.actions}>
            <button onClick={rejectAll} className={styles.secondary}>
              Refuser
            </button>
            <button onClick={() => setSettings(true)} className={styles.secondary}>
              Paramétrer
            </button>
            <button onClick={acceptAll} className={styles.primary}>
              Accepter
            </button>
          </div>
        ) : (
          <>
            <div className={styles.settings}>
              <label>
                <input type="checkbox" checked disabled />
                Cookies nécessaires
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                Mesure d’audience
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                Marketing
              </label>
            </div>

            <div className={styles.actions}>
              <button onClick={rejectAll} className={styles.secondary}>
                Tout refuser
              </button>
              <button onClick={saveSettings} className={styles.primary}>
                Enregistrer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
