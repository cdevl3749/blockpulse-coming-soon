import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./App";

// Pages
import Home from "../pages/Home";
import BonusPotentiel from "../pages/BonusPotentiel";
import TempsReel from "../pages/TempsReel";
import Participer from "../pages/Participer";
import Contact from "../pages/Contact";
import FAQPage from "../pages/FAQPage";
import MentionsLegales from "../pages/MentionsLegales";
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite";
import PolitiqueCookies from "../pages/PolitiqueCookies";

// Anciens callbacks (conservés)
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

// Nouveaux retours PayPal propres
import PaymentSuccess from "../pages/paiement/PaymentSuccess";
import PaymentCancel from "../pages/paiement/PaymentCancel";

// Espaces internes
import MonEspace from "../pages/MonEspace";
import AdminClients from "../pages/AdminClients";
import DashboardSecure from "../pages/DashboardSecure";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "bonus-potentiel", element: <BonusPotentiel /> },
      { path: "temps-reel", element: <TempsReel /> },
      { path: "participer", element: <Participer /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQPage /> },
      { path: "mentions-legales", element: <MentionsLegales /> },
      {
        path: "politique-confidentialite",
        element: <PolitiqueConfidentialite />,
      },
      { path: "cookies", element: <PolitiqueCookies /> },

      // Anciens callbacks PayPal (toujours valides)
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },

      // Nouveaux callbacks PayPal (config actuelle)
      {
        path: "paiement",
        children: [
          { path: "success", element: <PaymentSuccess /> },
          { path: "cancel", element: <PaymentCancel /> },
        ],
      },

      // Espaces internes
      { path: "mon-espace", element: <MonEspace /> },
      { path: "admin-clients", element: <AdminClients /> },
      {
        path: "dashboard-admin-blockpulse-8921",
        element: <DashboardSecure />,
      },
    ],
  },
]);

