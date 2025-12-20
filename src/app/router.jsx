import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./App";

// Pages publiques
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

// Nouveaux retours PayPal
import PaymentSuccess from "../pages/paiement/PaymentSuccess";
import PaymentCancel from "../pages/paiement/PaymentCancel";

// Espaces internes
import MonEspace from "../pages/MonEspace";
import AdminClients from "../pages/AdminClients";
import DashboardSecure from "../pages/DashboardSecure";
import Abonnements from "../pages/Abonnements";
import About from "@/pages/About";
import DemandeAcces from "@/pages/DemandeAcces";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },

      // Pages principales
      { path: "bonus-potentiel", element: <BonusPotentiel /> },
      { path: "temps-reel", element: <TempsReel /> },
      { path: "participer", element: <Participer /> },
      { path: "abonnements", element: <Abonnements /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQPage /> },
      { path: "a-propos", element: <About /> },
      { path: "demande-acces",element: <DemandeAcces /> },


      // Pages légales (URLs canoniques)
      { path: "mentions-legales", element: <MentionsLegales /> },
      {
        path: "politique-confidentialite",
        element: <PolitiqueConfidentialite />,
      },
      { path: "cookies", element: <PolitiqueCookies /> },

      // 🔁 Redirection legacy /confidentialite → bonne URL
      {
        path: "confidentialite",
        element: <Navigate to="/politique-confidentialite" replace />,
      },

      // Anciens callbacks PayPal (toujours valides)
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },

      // Nouveaux callbacks PayPal
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
