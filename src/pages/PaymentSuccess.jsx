import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || "en";

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) return;

    const alreadyTracked = sessionStorage.getItem("bp_payment_" + sessionId);
    if (alreadyTracked) return;

    fetch("/.netlify/functions/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "payment_success",
        session_id: sessionId
      })
    })
      .then(() => {
        console.log("✅ Payment tracked");
      })
      .catch((err) => {
        console.error("❌ Tracking error:", err);
      });

    sessionStorage.setItem("bp_payment_" + sessionId, "true");
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">

        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-2xl font-bold mb-3">
          Order confirmed
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you! Your order has been successfully registered.
          <br /><br />
          You will receive a confirmation email with delivery details shortly.
        </p>

        <div className="mb-6 text-sm text-gray-500">
          🔒 Secure payment via Stripe<br/>
          📦 Shipping processed shortly
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Back to website
        </Link>

      </div>
    </div>
  );
}