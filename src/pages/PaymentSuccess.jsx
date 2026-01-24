import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Paiement confirmé</h1>
        <p className="text-gray-600 mb-6">
          Merci ! Ta précommande a bien été enregistrée. Tu vas recevoir un email de confirmation.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 text-white"
        >
          Retour au site
        </Link>
      </div>
    </div>
  );
}
