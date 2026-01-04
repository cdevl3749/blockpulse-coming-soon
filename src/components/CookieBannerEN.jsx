import { useState } from "react";
import styles from "./CookieBanner.module.css";
import { getConsent, setConsent } from "../consent/cookieConsent";

export default function CookieBannerEN() {
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
          We use cookies that are necessary for the proper functioning of the
          website. With your consent, analytics or marketing cookies may also
          be used.
        </p>

        {!settings ? (
          <div className={styles.actions}>
            <button onClick={rejectAll} className={styles.secondary}>
              Reject
            </button>
            <button
              onClick={() => setSettings(true)}
              className={styles.secondary}
            >
              Settings
            </button>
            <button onClick={acceptAll} className={styles.primary}>
              Accept
            </button>
          </div>
        ) : (
          <>
            <div className={styles.settings}>
              <label>
                <input type="checkbox" checked disabled />
                Necessary cookies
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                Analytics
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
                Reject all
              </button>
              <button onClick={saveSettings} className={styles.primary}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
