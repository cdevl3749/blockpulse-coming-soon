import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

// ===== IMPORTS CSS =====
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/responsive.css";
import "./styles/mobile-spacing-fix.css";
import "./styles/desktop-spacing-fix.css";

// ===== PAYPAL SDK LOADER =====
const PAYPAL_CLIENT_ID = "AVGkfN9X6Aq93ZUnhs_VDIaSAJ7PMNXh0VuTRPN58LGI";

function loadPayPalScript() {
  if (window.paypal) return;

  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
  script.async = true;
  document.body.appendChild(script);
}

// Charger PayPal une seule fois au démarrage
loadPayPalScript();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
