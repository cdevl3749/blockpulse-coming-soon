import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentCancel() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const lang = ["fr", "de", "en"].includes(params.get("lang"))
    ? params.get("lang")
    : "en";

  useEffect(() => {
    if (lang) {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const content = {
    en: {
      title: "Payment cancelled",
      text: "No worries — nothing was charged.",
      sub: "You can try again in seconds.",
      button: "Try again",
    },
    fr: {
      title: "Paiement annulé",
      text: "Pas de souci — aucun paiement n’a été effectué.",
      sub: "Tu peux réessayer en quelques secondes.",
      button: "Réessayer",
    },
    de: {
      title: "Zahlung abgebrochen",
      text: "Kein Problem — es wurde nichts abgebucht.",
      sub: "Du kannst es sofort erneut versuchen.",
      button: "Erneut versuchen",
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">

        <div className="text-5xl mb-4">⚠️</div>

        <h1 className="text-2xl font-bold mb-2">
          {t.title}
        </h1>

        <p className="text-gray-600 mb-2">
          {t.text}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          {t.sub}
        </p>

        <div className="mb-6 text-sm text-gray-500">
          🔒 Secure payment via Stripe<br/>
          💡 No account required
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {t.button}
        </Link>

      </div>
    </div>
  );
}