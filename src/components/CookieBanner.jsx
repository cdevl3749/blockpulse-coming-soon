import { useEffect, useState } from "react";

const STORAGE_KEY = "bp_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function refuse() {
    window.localStorage.setItem(STORAGE_KEY, "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="bp-cookie-banner">
      <div className="bp-cookie-text">
        Nous utilisons des cookies essentiels pour le bon fonctionnement du site
        et pour améliorer ton expérience. Tu peux accepter ou refuser les
        cookies non essentiels.
      </div>
      <div className="bp-cookie-actions">
        <button onClick={refuse} className="bp-btn-secondary">
          Refuser
        </button>
        <button onClick={accept} className="bp-btn-primary">
          Accepter
        </button>
      </div>
    </div>
  );
}
