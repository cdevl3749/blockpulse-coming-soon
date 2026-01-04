import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TrustBar from "../components/trust/TrustBar";

import CookieBanner from "../components/CookieBanner";
import CookieBannerEN from "../components/CookieBannerEN";

export default function AppLayout() {
  const location = useLocation();

  // 🌍 Lang detection
  const isEN = location.pathname.startsWith("/en");

  useEffect(() => {
    const baseUrl = "https://blockpulse.be";

    const pathname = location.pathname.replace(/\/$/, "") || "/";
    const pathWithoutEN = isEN
      ? pathname.replace(/^\/en/, "") || "/"
      : pathname;

    const frUrl = `${baseUrl}${pathWithoutEN === "/" ? "" : pathWithoutEN}`;
    const enUrl = `${baseUrl}/en${pathWithoutEN === "/" ? "" : pathWithoutEN}`;

    /* ===================== 🌍 HTML LANG ===================== */
    document.documentElement.lang = isEN ? "en" : "fr";

    /* ===================== 🔗 CANONICAL ===================== */
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = isEN ? enUrl : frUrl;

    /* ===================== 🔁 HREFLANG ===================== */
    document
      .querySelectorAll("link[rel='alternate'][hreflang]")
      .forEach((el) => el.remove());

    const addHreflang = (lang, href) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = href;
      document.head.appendChild(link);
    };

    addHreflang("fr", frUrl);
    addHreflang("en", enUrl);
    addHreflang("x-default", frUrl);

    /* ===================== 🚫 NOINDEX ===================== */
    const NOINDEX_ROUTES = [
      "/mon-espace",
      "/admin-clients",
      "/dashboard-admin-blockpulse-8921",
      "/paiement/success",
      "/paiement/cancel",
      "/success",
      "/cancel",
    ];

    let robots = document.querySelector("meta[name='robots']");
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }

    const cleanPath = pathWithoutEN;
    const hasToken = location.search.includes("token=");
    const shouldNoIndex =
      NOINDEX_ROUTES.includes(cleanPath) || hasToken;

    robots.content = shouldNoIndex
      ? "noindex, nofollow"
      : "index, follow";
  }, [location.pathname, location.search, isEN]);

  return (
    <>
      <Header />
      <TrustBar />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* 🍪 Cookie banner selon la langue */}
      {isEN ? <CookieBannerEN /> : <CookieBanner />}
    </>
  );
}



