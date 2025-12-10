import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CookieBanner from "./components/CookieBanner.jsx";

import Home from "./pages/Home.jsx";
import CommentCaMarche from "./pages/CommentCaMarche.jsx";
import BonusPotentiel from "./pages/BonusPotentiel.jsx";
import TempsReel from "./pages/TempsReel.jsx";
import Participer from "./pages/Participer.jsx";
import Contact from "./pages/Contact.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite.jsx";
import PolitiqueCookies from "./pages/PolitiqueCookies.jsx";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import DashboardSecure from "./pages/DashboardSecure.jsx";
import MonEspace from "./pages/MonEspace.jsx";
import AdminClients from "./pages/AdminClients.jsx";



// Composant interne pour gérer le scroll
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="bp-app">
      <ScrollToTop />
      <Header />
      <main className="bp-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/bonus-potentiel" element={<BonusPotentiel />} />
          <Route path="/temps-reel" element={<TempsReel />} />
          <Route path="/participer" element={<Participer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route path="/cookies" element={<PolitiqueCookies />} />

          {/* 🔥 Redirections de NOWPayments */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="/dashboard-admin-blockpulse-8921" element={<DashboardSecure />} />
          <Route path="/mon-espace" element={<MonEspace />} />
          <Route path="/admin-clients" element={<AdminClients />} />

        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}