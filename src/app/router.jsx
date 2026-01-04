import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./App";

// Pages publiques FR
import Home from "../pages/Home";
import BonusPotentiel from "../pages/BonusPotentiel";
import TempsReel from "../pages/TempsReel";
import Participer from "../pages/Participer";
import Contact from "../pages/Contact";
import FAQPage from "../pages/FAQPage";
import MentionsLegales from "../pages/MentionsLegales";
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite";
import PolitiqueCookies from "../pages/PolitiqueCookies";
import Abonnements from "../pages/Abonnements";
import About from "@/pages/About";
import DemandeAcces from "@/pages/DemandeAcces";

// Pages publiques EN
import HomeEN from "../pages/HomeEN";
import DemandeAccesEN from "../pages/DemandeAccesEN";
import ContactEN from "../pages/ContactEN";
import AboutEN from "../pages/AboutEN";
import MentionsLegalesEN from "@/pages/MentionsLegalesEN";
import PolitiqueConfidentialiteEN from "@/pages/PolitiqueConfidentialiteEN";
import PolitiqueCookiesEN from "@/pages/PolitiqueCookiesEN";

// Tools
import BitcoinActif from "@/pages/tools/BitcoinActif";
import BitcoinNetworkStatus from "@/pages/tools/BitcoinNetworkStatus";

// Callbacks / paiement
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import PaymentSuccess from "../pages/paiement/PaymentSuccess";
import PaymentCancel from "../pages/paiement/PaymentCancel";

// Espaces internes
import MonEspace from "../pages/MonEspace";
import MonEspaceEN from "@/pages/MonEspaceEN";
import AdminClients from "../pages/AdminClients";
import DashboardSecure from "../pages/DashboardSecure";

/**
 * Pages réellement partagées FR / EN
 * ⚠️ PAS de tools ici
 */
const sharedChildren = [
  // Callbacks legacy
  { path: "success", element: <Success /> },
  { path: "cancel", element: <Cancel /> },

  // Paiement
  {
    path: "paiement",
    children: [
      { path: "success", element: <PaymentSuccess /> },
      { path: "cancel", element: <PaymentCancel /> },
    ],
  },

  // Admin / interne
  { path: "admin-clients", element: <AdminClients /> },
  {
    path: "dashboard-admin-blockpulse-8921",
    element: <DashboardSecure />,
  },
];

export const router = createBrowserRouter([
  // 🇫🇷 FR
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },

      // Pages FR
      { path: "bonus-potentiel", element: <BonusPotentiel /> },
      { path: "temps-reel", element: <TempsReel /> },
      { path: "participer", element: <Participer /> },
      { path: "abonnements", element: <Abonnements /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQPage /> },
      { path: "a-propos", element: <About /> },
      { path: "demande-acces", element: <DemandeAcces /> },

      // Tool FR
      { path: "tools/bitcoin-actif", element: <BitcoinActif /> },

      // Redirect tool EN → FR (sécurité)
      {
        path: "tools/bitcoin-network-status",
        element: <Navigate to="/tools/bitcoin-actif" replace />,
      },

      // Légal FR
      { path: "mentions-legales", element: <MentionsLegales /> },
      { path: "politique-confidentialite", element: <PolitiqueConfidentialite /> },
      { path: "cookies", element: <PolitiqueCookies /> },

      // Legacy redirect
      {
        path: "confidentialite",
        element: <Navigate to="/politique-confidentialite" replace />,
      },

      // Espace client FR
      { path: "mon-espace", element: <MonEspace /> },

      ...sharedChildren,
    ],
  },

  // 🇬🇧 EN
  {
    path: "/en",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeEN /> },

      // Pages EN
      { path: "demande-acces", element: <DemandeAccesEN /> },
      { path: "a-propos", element: <AboutEN /> },
      { path: "contact", element: <ContactEN /> },

      // Tool EN
      { path: "tools/bitcoin-network-status", element: <BitcoinNetworkStatus /> },

      // Redirect tool FR → EN
      {
        path: "tools/bitcoin-actif",
        element: <Navigate to="/en/tools/bitcoin-network-status" replace />,
      },

      // Légal EN
      { path: "mentions-legales", element: <MentionsLegalesEN /> },
      { path: "politique-confidentialite", element: <PolitiqueConfidentialiteEN /> },
      { path: "cookies", element: <PolitiqueCookiesEN /> },

      // Espace client EN
      { path: "mon-espace", element: <MonEspaceEN /> },

      ...sharedChildren,
    ],
  },
]);

