import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from "./App";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/paiement/success" element={<PaymentSuccess />} />
        <Route path="/paiement/cancel" element={<PaymentCancel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);