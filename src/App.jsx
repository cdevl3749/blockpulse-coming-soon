import React, { useState, useEffect } from "react";
import energyBg from "./assets/energy.png";
import wind from "./assets/wind.png";

import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Blog from "./pages/Blog";

import BlogArticle from "./pages/BlogArticle";
import BlogArticle2 from "./pages/BlogArticle2";
import BlogArticle3 from "./pages/BlogArticle3";
import BlogArticle4 from "./pages/BlogArticle4";
import FAQ from "./pages/FAQ";

import deviceLite from "./assets/blockpulse-screen.png";
import deviceScreen from "./assets/blockpulse-v2lite.png";

const sendStat = (type) => {
  const lang = navigator.language || "";

  let country = "BE"; // 👈 défaut Belgique

  if (lang.startsWith("nl")) country = "NL";
  else if (lang.startsWith("de")) country = "DE";
  else if (lang.startsWith("en")) country = "GB";
  else if (lang.startsWith("fr")) country = "BE"; // 👈 IMPORTANT

fetch("/.netlify/functions/stats", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type,
    country,
  }),
}).catch(() => {});
};

const COOKIE_STORAGE_KEY = "blockpulse_cookie_consent";
const VISIT_STORAGE_KEY = "blockpulse_visit_tracked";

const TEXT = {
  en: {
  heroTitle: "Stop overpaying electricity. Just follow the color.",
  heroDesc: "A simple physical device that tells you the best moment to use electricity.",
  cta: "Get mine now — €29",
  how: "How does it work?",

  // ✅ IMPORTANT (manquait → crash)
  legendCheap: "Cheap",
  legendNormal: "Normal",
  legendExpensive: "Expensive",

  noApp: "No app. No setup. No complicated dashboard. Just look at the color and decide in seconds.",

  badges: [
    "Secure checkout",
    "Free shipping",
    "14-day returns",
    "2-year warranty"
  ],

  trustedLine: "Trusted checkout with Stripe • Clear legal pages • Cookie choice",
  ideal: "Ideal for people who want a simple signal instead of another app.",
  heroClarify: "Does not control appliances — it simply shows when it’s a better time to use electricity.",

  productLiteTitle: "V2 Lite",
  productLiteDesc: "See instantly when it’s a good time to use electricity.",
  productLitePoints: [
    "Green / Yellow / Red signal",
    "No app needed",
    "Simple for everyday use"
  ],
  productLiteOptions: [
  {
    label: "☀️ Solar panel (+9€)",
    desc: "works without outlet"
  },
  {
    label: "🔋 Powerbank (+15€)",
    desc: "works at night"
  }
],
  productLiteButton: "Get my V2 Lite",
  productLiteSub: "Best choice for most homes",
  productLiteUrgency: "⚡ Limited launch price",

  productScreenTitle: "Screen",
  productScreenDesc: "See real-time price, time and status — in your language.",
  productScreenPoints: [
    "Live price display",
    "Time + status",
    "More detailed view"
  ],
  usageLine: "Perfect for running your washing machine, dishwasher or dryer at the right time.",
  productScreenButton: "Get my Screen",
  productScreenSub: "For people who want more detail",

  shipping: "Free shipping • EU: 2–3 days • Worldwide: 5–7 days",

  trustTitle: "Why people trust BlockPulse",

  trust1Title: "Real physical product",
  trust1Desc: "This is a real working device designed to make electricity decisions simpler.",

  trust2Title: "Simple and transparent",
  trust2Desc: "No account, no app, no complicated setup. Just a direct visual signal.",

  trust3Title: "Safer checkout",
  trust3Desc: "Payments are handled through Stripe, with legal pages and cookie choices clearly available.",

  cookieTitle: "Cookie choice",
  cookieDesc: "We only use cookies or tracking if you accept. You can refuse and continue browsing normally.",
  cookieAccept: "Accept",
  cookieRefuse: "Refuse",

  footerTagline: "Smart energy for a simpler home.",

  footerProduct: "Product",
  footerHow: "How it works",
  footerOrderLite: "Order V2 Lite",
  footerOrderScreen: "Order Screen",

  footerLegal: "Legal",
  footerLegalNotice: "Legal notice",
  footerPrivacy: "Privacy",
  footerCookies: "Cookies",
  footerManageCookies: "Manage cookies",

  footerContact: "Contact",

  footerBottom: "Secure payment • Powered by Stripe • 14-day guarantee",
  footerBlog: "Energy tips & electricity prices",

  howTitle: "How it works",
  howDesc: "BlockPulse is made to be understood immediately. You do not need to open an app or read graphs.",

  howExplain1: "BlockPulse reads electricity price signals and turns them into a simple color:",
  howExplainGreen: "Green → good time to use electricity",
  howExplainYellow: "Yellow → normal",
  howExplainRed: "Red → expensive",
  howExplain2: "No app. No data to check. Just a quick glance.",

  step1Title: "Look",
  step1Text: "Check the color in one second.",

  step2Title: "Decide",
  step2Text: "Use electricity when the signal is better.",

  step3Title: "Save",
  step3Text: "Build a better habit without effort.",

  legalTitle: "Legal notice",
  privacyTitle: "Privacy",
  cookiesTitle: "Cookies",

  legalText1: "This website is published by BlockPulse.",
  legalText2: "Owner / publisher: Christophe.D",
  legalText3: "Address: 4850 Montzen",
  legalText4: "Email: contact@blockpulse.be",
  legalText5: "This website presents and sells BlockPulse devices.",
  legalText6: "Hosting provider: Netlify",
  legalText7: "Payments are handled securely by Stripe.",

  privacyText1: "We respect your privacy and only collect data necessary to process orders or improve the site.",
  privacyText2: "Data may include name, email and delivery details.",
  privacyText3: "Payments are processed securely by Stripe.",
  privacyText4: "You can request access or deletion of your data at contact@blockpulse.be.",

  cookiesText1: "This website gives you control over cookies.",
  cookiesText2: "Necessary cookies are used for basic functionality.",
  cookiesText3: "Analytics cookies are only used if you accept.",
  cookiesChange: "Change my cookie choice",

  footerFAQ: "FAQ",

  close: "Close",
},
  fr: {
  heroTitle: "Arrêtez de payer trop cher l’électricité. Suivez la couleur.",
  heroDesc: "Un appareil simple qui vous indique le meilleur moment pour utiliser l’électricité.",
  cta: "Commander — 29€",
  how: "Comment ça marche ?",

  productLiteTitle: "V2 Lite",
  productLiteDesc: "Voyez instantanément quand utiliser l’électricité.",
  productLitePoints: [
    "Signal vert / jaune / rouge",
    "Pas d’application",
    "Simple à utiliser"
  ],
  usageLine: "Parfait pour lancer machine à laver, lave-vaisselle ou sèche-linge au bon moment.",
    productLiteOptions: [
  {
    label: "☀️ Panneau solaire (+9€)",
    desc: "fonctionne sans prise"
  },
  {
    label: "🔋 Powerbank (+15€)",
    desc: "autonomie la nuit"
  }
],
  productLiteButton: "Commander V2 Lite",
  productLiteSub: "Le meilleur choix pour la plupart des foyers",
  productLiteUrgency: "⚡ Prix de lancement limité",

  productScreenTitle: "Écran",
  productScreenDesc: "Voyez le prix en temps réel, l’heure et le statut — dans votre langue.",
  productScreenPoints: [
    "Prix en temps réel",
    "Heure + statut",
    "Vue détaillée"
  ],
  productScreenButton: "Commander écran",
  productScreenSub: "Pour ceux qui veulent plus de détails",

  shipping: "Livraison gratuite • Europe: 2–3 jours • Monde: 5–7 jours",

  trustTitle: "Pourquoi les gens font confiance à BlockPulse",

  trust1Title: "Produit réel",
  trust1Desc: "C’est un appareil réel conçu pour simplifier les décisions liées à l’électricité.",

  trust2Title: "Simple et transparent",
  trust2Desc: "Pas de compte, pas d’application, pas de configuration compliquée.",

  trust3Title: "Paiement sécurisé",
  trust3Desc: "Les paiements sont gérés via Stripe avec des pages légales et un choix de cookies clair.",

  cookieTitle: "Choix des cookies",
  cookieDesc: "Nous utilisons des cookies uniquement si vous acceptez. Vous pouvez refuser et continuer normalement.",
  cookieAccept: "Accepter",
  cookieRefuse: "Refuser",

  footerTagline: "Une énergie intelligente pour un foyer plus simple.",

  footerProduct: "Produit",
  footerHow: "Comment ça marche",
  footerOrderLite: "Commander V2 Lite",
  footerOrderScreen: "Commander écran",

  footerLegal: "Légal",
  footerLegalNotice: "Mentions légales",
  footerPrivacy: "Confidentialité",
  footerCookies: "Cookies",
  footerManageCookies: "Gérer les cookies",

  footerContact: "Contact",

  footerBottom: "Paiement sécurisé • Propulsé par Stripe • Garantie 14 jours",
  footerBlog: "Conseils énergie et prix de l’électricité",

  // ✅ IMPORTANT (utilisé dans le hero)
  legendCheap: "Pas cher",
  legendNormal: "Normal",
  legendExpensive: "Cher",

  noApp: "Pas d’application. Pas de configuration. Aucun tableau compliqué. Regardez la couleur et décidez en quelques secondes.",

  badges: [
    "Paiement sécurisé",
    "Livraison gratuite",
    "Retour 14 jours",
    "Garantie 2 ans"
  ],

  trustedLine: "Paiement sécurisé avec Stripe • Pages légales claires • Choix des cookies",

  ideal: "Idéal pour ceux qui veulent un signal simple sans application.",
  heroClarify: "Ne contrôle pas vos appareils — il indique simplement quand c’est un meilleur moment pour utiliser l’électricité.",

  howTitle: "Comment ça marche",
  howDesc: "BlockPulse est conçu pour être compris immédiatement. Pas besoin d’application ni de graphiques.",

  howExplain1: "BlockPulse lit les signaux de prix de l’électricité et les transforme en une couleur simple :",
  howExplainGreen: "Vert → bon moment pour utiliser l’électricité",
  howExplainYellow: "Jaune → normal",
  howExplainRed: "Rouge → cher",
  howExplain2: "Pas d’application. Aucune donnée à vérifier. Un simple coup d’œil suffit.",

  step1Title: "Regarder",
  step1Text: "Regardez la couleur en une seconde.",

  step2Title: "Décider",
  step2Text: "Utilisez l’électricité au bon moment.",

  step3Title: "Économiser",
  step3Text: "Adoptez une meilleure habitude sans effort.",

  legalTitle: "Mentions légales",
  privacyTitle: "Confidentialité",
  cookiesTitle: "Cookies",

  legalText1: "Ce site est publié par BlockPulse.",
  legalText2: "Responsable : Christophe.D",
  legalText3: "Adresse : 4850 Montzen",
  legalText4: "Email : contact@blockpulse.be",
  legalText5: "Ce site présente et vend les appareils BlockPulse.",
  legalText6: "Hébergement : Netlify",
  legalText7: "Paiements sécurisés via Stripe.",

  privacyText1: "Nous respectons votre vie privée et collectons uniquement les données nécessaires.",
  privacyText2: "Les données peuvent inclure nom, email et livraison.",
  privacyText3: "Paiements sécurisés via Stripe.",
  privacyText4: "Vous pouvez demander l’accès ou suppression via contact@blockpulse.be.",

  cookiesText1: "Ce site vous laisse le contrôle des cookies.",
  cookiesText2: "Les cookies nécessaires sont utilisés pour le fonctionnement.",
  cookiesText3: "Les cookies analytiques sont activés uniquement avec votre consentement.",
  cookiesChange: "Modifier mon choix",

  footerFAQ: "Questions fréquentes",

  close: "Fermer",
},

  de: {
    heroTitle: "Zahlen Sie nicht zu viel für Strom. Folgen Sie einfach der Farbe.",
    heroDesc: "Ein einfaches Gerät, das Ihnen zeigt, wann Strom am günstigsten ist.",
    cta: "Jetzt bestellen — 29€",
    how: "Wie funktioniert es?",
    productLiteTitle: "V2 Lite",
    productLiteDesc: "Sehen Sie sofort, wann Strom am günstigsten ist.",
    productLitePoints: [
      "Grün / Gelb / Rot Signal",
      "Keine App nötig",
      "Einfach zu bedienen"
    ],
    usageLine: "Perfekt für Waschmaschine, Geschirrspüler oder Trockner zum richtigen Zeitpunkt.",
    productLiteOptions: [
  {
    label: "☀️ Solarpanel (+9€)",
    desc: "funktioniert ohne Steckdose"
  },
  {
    label: "🔋 Powerbank (+15€)",
    desc: "funktioniert nachts"
  }
],
    productLiteButton: "V2 Lite bestellen",
    productLiteSub: "Beste Wahl für die meisten Haushalte",
    productLiteUrgency: "⚡ Begrenzter Einführungspreis",

    productScreenTitle: "Display",
    productScreenDesc: "Preis, Zeit und Status in Echtzeit — in Ihrer Sprache.",
    productScreenPoints: [
      "Live Preis",
      "Zeit + Status",
      "Mehr Details"
    ],
    productScreenButton: "Display bestellen",
    productScreenSub: "Für mehr Details",

    shipping: "Kostenloser Versand • EU: 2–3 Tage • Weltweit: 5–7 Tage",

    trustTitle: "Warum Menschen BlockPulse vertrauen",

    trust1Title: "Echtes Produkt",
    trust1Desc: "Dies ist ein echtes Gerät, das Entscheidungen beim Stromverbrauch vereinfacht.",

    trust2Title: "Einfach und transparent",
    trust2Desc: "Kein Konto, keine App, keine komplizierte Einrichtung.",

    trust3Title: "Sichere Zahlung",
    trust3Desc: "Zahlungen werden über Stripe abgewickelt mit klaren rechtlichen Informationen.",
    cookieTitle: "Cookie-Einstellungen",
    cookieDesc: "Wir verwenden Cookies nur, wenn Sie zustimmen. Sie können ablehnen und normal weiter surfen.",
    cookieAccept: "Akzeptieren",
    cookieRefuse: "Ablehnen",
    footerTagline: "Intelligente Energie für ein einfacheres Zuhause.",

    footerProduct: "Produkt",
    footerHow: "Wie funktioniert es",
    footerOrderLite: "V2 Lite bestellen",
    footerOrderScreen: "Display bestellen",

    footerLegal: "Rechtliches",
    footerLegalNotice: "Impressum",
    footerPrivacy: "Datenschutz",
    footerCookies: "Cookies",
    footerManageCookies: "Cookies verwalten",

    footerContact: "Kontakt",

    footerBottom: "Sichere Zahlung • Powered by Stripe • 14 Tage Garantie",
    footerBlog: "Energietipps und Strompreise",
    legendCheap: "Günstig",
    legendNormal: "Normal",
    legendExpensive: "Teuer",

    noApp: "Keine App. Keine Einrichtung. Kein kompliziertes Dashboard. Einfach Farbe ansehen und entscheiden.",

    badges: [
      "Sichere Zahlung",
      "Kostenloser Versand",
      "14 Tage Rückgabe",
      "2 Jahre Garantie"
    ],

    trustedLine: "Sichere Zahlung mit Stripe • Klare rechtliche Seiten • Cookie-Auswahl",

    ideal: "Ideal für Menschen, die ein einfaches Signal statt einer App wollen.",
    heroClarify: "Steuert keine Geräte — es zeigt einfach, wann ein besserer Zeitpunkt für den Stromverbrauch ist.",
    howTitle: "Wie funktioniert es",
    howDesc: "BlockPulse ist so konzipiert, dass es sofort verstanden wird. Keine App oder Diagramme nötig.",

    howExplain1: "BlockPulse liest Strompreissignale und wandelt sie in eine einfache Farbe um:",
    howExplainGreen: "Grün → guter Zeitpunkt, um Strom zu nutzen",
    howExplainYellow: "Gelb → normal",
    howExplainRed: "Rot → teuer",
    howExplain2: "Keine App. Keine Daten zu prüfen. Nur ein kurzer Blick.",

    step1Title: "Schauen",
    step1Text: "Sehen Sie die Farbe in einer Sekunde.",

    step2Title: "Entscheiden",
    step2Text: "Nutzen Sie Strom zum richtigen Zeitpunkt.",

    step3Title: "Sparen",
    step3Text: "Gewöhnen Sie sich ohne Aufwand bessere Nutzung an.",
    legalTitle: "Impressum",
    privacyTitle: "Datenschutz",
    cookiesTitle: "Cookies",

    legalText1: "Diese Website wird von BlockPulse betrieben.",
    legalText2: "Inhaber: Christophe.D",
    legalText3: "Adresse: 4850 Montzen",
    legalText4: "Email: contact@blockpulse.be",
    legalText5: "Diese Website verkauft BlockPulse Geräte.",
    legalText6: "Hosting: Netlify",
    legalText7: "Zahlungen über Stripe.",

    privacyText1: "Wir respektieren Ihre Privatsphäre.",
    privacyText2: "Daten können Name, Email und Lieferung enthalten.",
    privacyText3: "Zahlungen über Stripe.",
    privacyText4: "Sie können Ihre Daten anfordern oder löschen.",

    cookiesText1: "Diese Website gibt Ihnen Kontrolle über Cookies.",
    cookiesText2: "Notwendige Cookies sind erforderlich.",
    cookiesText3: "Analyse nur nach Zustimmung.",
    cookiesChange: "Cookie-Einstellung ändern",

    footerFAQ: "FAQ",

    close: "Schließen",
          },

  nl: {
    heroTitle: "Betaal niet te veel voor elektriciteit. Volg gewoon de kleur.",
    heroDesc: "Een eenvoudig apparaat dat je laat zien wanneer stroom het goedkoopst is.",
    cta: "Bestel nu — €29",
    how: "Hoe werkt het?",
    productLiteTitle: "V2 Lite",
    productLiteDesc: "Zie meteen wanneer elektriciteit het goedkoopst is.",
    productLitePoints: [
      "Groen / geel / rood signaal",
      "Geen app nodig",
      "Eenvoudig in gebruik"
    ],
    usageLine: "Perfect om je wasmachine, vaatwasser of droger op het juiste moment te gebruiken.",
    productLiteOptions: [
  {
    label: "☀️ Zonnepaneel (+9€)",
    desc: "werkt zonder stopcontact"
  },
  {
    label: "🔋 Powerbank (+15€)",
    desc: "werkt 's nachts"
  }
],
    productLiteButton: "Bestel V2 Lite",
    productLiteSub: "Beste keuze voor de meeste huizen",
    productLiteUrgency: "⚡ Tijdelijke lanceringsprijs",

    productScreenTitle: "Scherm",
    productScreenDesc: "Zie prijs, tijd en status in realtime — in jouw taal.",
    productScreenPoints: [
      "Live prijs",
      "Tijd + status",
      "Meer details"
    ],
    productScreenButton: "Bestel scherm",
    productScreenSub: "Voor wie meer details wil",

    shipping: "Gratis verzending • EU: 2–3 dagen • Wereldwijd: 5–7 dagen",

    trustTitle: "Waarom mensen BlockPulse vertrouwen",

    trust1Title: "Echt fysiek product",
    trust1Desc: "Dit is een echt werkend apparaat dat energiekeuzes eenvoudiger maakt.",

    trust2Title: "Eenvoudig en transparant",
    trust2Desc: "Geen account, geen app, geen ingewikkelde installatie.",

    trust3Title: "Veilige betaling",
    trust3Desc: "Betalingen verlopen via Stripe met duidelijke wettelijke informatie.",
    cookieTitle: "Cookie keuze",
    cookieDesc: "We gebruiken alleen cookies als je accepteert. Je kunt weigeren en gewoon verder browsen.",
    cookieAccept: "Accepteren",
    cookieRefuse: "Weigeren",
    footerTagline: "Slim energiegebruik voor een eenvoudiger huis.",

    footerProduct: "Product",
    footerHow: "Hoe werkt het",
    footerOrderLite: "Bestel V2 Lite",
    footerOrderScreen: "Bestel scherm",

    footerLegal: "Juridisch",
    footerLegalNotice: "Juridische info",
    footerPrivacy: "Privacy",
    footerCookies: "Cookies",
    footerManageCookies: "Cookies beheren",

    footerContact: "Contact",

    footerBottom: "Veilige betaling • Powered by Stripe • 14 dagen garantie",
    footerBlog: "Energietips en elektriciteitsprijzen",
    legendCheap: "Goedkoop",
    legendNormal: "Normaal",
    legendExpensive: "Duur",

    noApp: "Geen app. Geen installatie. Geen ingewikkeld dashboard. Kijk gewoon naar de kleur en beslis direct.",

    badges: [
      "Veilige betaling",
      "Gratis verzending",
      "14 dagen retour",
      "2 jaar garantie"
    ],

    trustedLine: "Veilige betaling met Stripe • Duidelijke juridische pagina’s • Cookie keuze",

    ideal: "Ideaal voor mensen die een simpel signaal willen zonder app.",
    heroClarify: "Stuurt geen apparaten aan — het toont gewoon wanneer het een beter moment is om elektriciteit te gebruiken.",
    howTitle: "Hoe werkt het",
    howDesc: "BlockPulse is ontworpen om meteen begrepen te worden. Geen app of grafieken nodig.",

    howExplain1: "BlockPulse leest elektriciteitsprijssignalen en zet die om in een eenvoudige kleur:",
    howExplainGreen: "Groen → goed moment om elektriciteit te gebruiken",
    howExplainYellow: "Geel → normaal",
    howExplainRed: "Rood → duur",
    howExplain2: "Geen app. Geen data om te controleren. Eén snelle blik is genoeg.",

    step1Title: "Kijken",
    step1Text: "Bekijk de kleur in één seconde.",

    step2Title: "Beslissen",
    step2Text: "Gebruik stroom op het juiste moment.",

    step3Title: "Besparen",
    step3Text: "Bouw zonder moeite een betere gewoonte op.",
    legalTitle: "Juridische informatie",
    privacyTitle: "Privacy",
    cookiesTitle: "Cookies",

    legalText1: "Deze website wordt beheerd door BlockPulse.",
    legalText2: "Eigenaar: Christophe.D",
    legalText3: "Adres: 4850 Montzen",
    legalText4: "Email: contact@blockpulse.be",
    legalText5: "Deze website verkoopt BlockPulse apparaten.",
    legalText6: "Hosting: Netlify",
    legalText7: "Betalingen via Stripe.",

    privacyText1: "Wij respecteren uw privacy en verzamelen alleen noodzakelijke gegevens.",
    privacyText2: "Gegevens kunnen naam, email en levering bevatten.",
    privacyText3: "Betalingen via Stripe.",
    privacyText4: "U kunt uw gegevens opvragen of verwijderen via contact@blockpulse.be.",

    cookiesText1: "Deze website geeft u controle over cookies.",
    cookiesText2: "Noodzakelijke cookies zorgen voor werking.",
    cookiesText3: "Analytics cookies alleen na toestemming.",
    cookiesChange: "Cookie keuze wijzigen",

    footerFAQ: "Veelgestelde vragen",

    close: "Sluiten",
              },
    };

export default function App() {
  const [showTop, setShowTop] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [cookieConsent, setCookieConsent] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [lang, setLang] = useState("en");

  const t = TEXT[lang] || TEXT.en;

useEffect(() => {
  const browserLang = navigator.language.toLowerCase();

  const consent = localStorage.getItem("bp_cookie_consent") 
    || localStorage.getItem("blockpulse_cookie_consent")
    || localStorage.getItem("cookiesAccepted");

  if (consent === "accepted" || consent === "true") {
    if (!sessionStorage.getItem(VISIT_STORAGE_KEY)) {
      sendStat("visit");
      sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
    }
  }

  if (browserLang.startsWith("fr")) setLang("fr");
  else if (browserLang.startsWith("de")) setLang("de");
  else if (browserLang.startsWith("nl")) setLang("nl");
  else setLang("en");
}, []);

const startCheckout = async (product, options = []) => {
  sendStat("stripe");
  if (isLoading) return; // 🔥 anti double clic

  setIsLoading(true);

  try {
    const langToSend = lang; // simple pour l’instant

    const formattedOptions = {
    solar: options.includes(0),
    powerbank: options.includes(1),
  };

    // 👉 détecte pays (simple version)
   const browserLang = navigator.language || "";

    let country = "BE";

    // 🔥 on détecte le pays correctement
    if (browserLang.includes("-")) {
      country = browserLang.split("-")[1].toUpperCase();
    }

    // fallback simple
    if (!country) country = "BE";

    const res = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product, // "lite" ou "standard"
        lang: langToSend,
        country,
        source: "landing",
        options: formattedOptions,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout error");
      setIsLoading(false);
    }

  } catch (err) {
    console.error(err);
    alert("Error starting checkout");
    setIsLoading(false);
  }
};

  const scrollToHow = () => {
    document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const acceptCookies = () => {
  localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
  localStorage.setItem("bp_cookie_consent", "accepted"); // ✅ sync les deux clés
  setCookieConsent("accepted");
  if (!sessionStorage.getItem(VISIT_STORAGE_KEY)) {
    sendStat("visit");
    sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
  }
};

  const refuseCookies = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "refused");
    setCookieConsent("refused");
  };

  const reopenCookieBanner = () => {
    localStorage.removeItem(COOKIE_STORAGE_KEY);
    setCookieConsent(null);
    setActiveModal(null);
  };

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (savedConsent === "accepted" || savedConsent === "refused") {
      setCookieConsent(savedConsent);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  return (
  <Routes>
    <Route
    path="/"
    element={
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
  className="absolute inset-0 bg-cover"
 style={{
  backgroundImage: `url(${energyBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
}}
/>
<img
  src={wind}
  className="
    absolute 
    pointer-events-none

    right-[-20px] top-[120px] h-[200px] opacity-10

    md:right-[-120px] md:top-[-20px] md:h-[110%] md:opacity-60 md:blur-[1px]
  "
/>
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-white/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
           <div className="flex items-center gap-2 text-2xl font-extrabold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-bold shadow">
              ⚡
            </div>
            <span className="bg-gradient-to-r from-emerald-900 to-emerald-600 bg-clip-text text-transparent">
              BlockPulse
            </span>
          </div>

            <div className="hidden items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-900 shadow sm:inline-flex">
            <svg width="18" height="12" viewBox="0 0 3 2">
              <rect width="1" height="2" x="0" fill="#000"/>
              <rect width="1" height="2" x="1" fill="#FFD90C"/>
              <rect width="1" height="2" x="2" fill="#EF3340"/>
            </svg>
            Designed & tested in Belgium
          </div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[0.98fr_1.02fr]">
            {/* LEFT */}
            <div>
              <div className="mb-4 inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-900 shadow">
                🟢 Real working device — Not a concept
              </div>

              <h1 className="text-4xl font-extrabold leading-tight text-emerald-950 sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-800">
                {t.heroDesc}
              </p>

             <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white/90 p-3 shadow text-sm font-semibold text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  {t.legendCheap}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  {t.legendNormal}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  {t.legendExpensive}
                </div>
              </div>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                {t.noApp}
              </p>

              <div className="mt-3 inline-flex max-w-xl rounded-xl bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                ℹ️ {t.heroClarify}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
              {t.badges?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-2 text-sm font-medium shadow"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm font-medium text-slate-700">
                {t.trustedLine}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToProducts}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
                >
                  {t.cta}
                </button>

                <button
                  onClick={scrollToHow}
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow transition hover:bg-slate-50"
                >
                  {t.how}
                </button>
              </div>

              <div className="mt-4 text-sm text-slate-700">
                {t.ideal}
              </div>

              <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-900 shadow-sm">
                ⚡ {t.usageLine}
              </div>
            </div>

            {/* PRODUCTS */}
            <div id="products" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ProductCard
                image={deviceLite}
                title={t.productLiteTitle}
                badge="🔥 Most popular"
                desc={t.productLiteDesc}
                price="€29"
                oldPrice="€39"
                urgency={t.productLiteUrgency}
                points={t.productLitePoints}
                button={t.productLiteButton}
                subtext={t.productLiteSub}
                shipping={t.shipping}
                options={t.productLiteOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                onClick={() => {
                  sendStat("click");
                  startCheckout("lite", selectedOptions);
                }}
                isLoading={isLoading}
                featured
                isLite
              />

              <ProductCard
                image={deviceScreen}
                title={t.productScreenTitle}
                badge="💎 Advanced"
                desc={t.productScreenDesc}
                price="€69"
                points={t.productScreenPoints}
                button={t.productScreenButton}
                subtext={t.productScreenSub}
                shipping={t.shipping}
                onClick={() => {
                  sendStat("click");
                  startCheckout("standard");
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
<section id="how" className="bg-stone-50 pt-10 pb-6">
  <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

    {/* 🔥 NOUVEAU BLOC (explication claire) */}
    <div className="mb-6 mx-auto max-w-2xl rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-left shadow-sm">
      <div className="text-sm text-slate-700">
        {t.howExplain1}
      </div>

      <ul className="mt-2 space-y-1 text-sm text-slate-700">
        <li>🟢 {t.howExplainGreen}</li>
        <li>🟡 {t.howExplainYellow}</li>
        <li>🔴 {t.howExplainRed}</li>
      </ul>

      <div className="mt-2 text-sm text-slate-700">
        {t.howExplain2}
      </div>
    </div>

    {/* TON CONTENU EXISTANT */}
    <h2 className="text-3xl font-bold text-emerald-950">{t.howTitle}</h2>

    <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
      {t.howDesc}
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <Step number="1" title={t.step1Title} text={t.step1Text} />
      <Step number="2" title={t.step2Title} text={t.step2Text} />
      <Step number="3" title={t.step3Title} text={t.step3Text} />
    </div>

  </div>
</section>

      {/* TRUST */}
      <section className="pt-10 pb-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-950">
              {t.trustTitle}
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <TrustItem
                title={t.trust1Title}
                text={t.trust1Desc}
              />
              <TrustItem
                title={t.trust2Title}
                text={t.trust2Desc}
              />
              <TrustItem
                title={t.trust3Title}
                text={t.trust3Desc}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-6 bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">BlockPulse</div>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-emerald-100/80">
                {t.footerTagline}
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-3 text-base font-semibold">{t.footerProduct}</div>
              <div className="flex flex-col items-start gap-2 text-sm text-emerald-100/80">
                <button
                  onClick={scrollToHow}
                  className="text-left transition hover:text-white"
                >
                  {t.footerHow}
                </button>
                <Link
                  to="/blog"
                  className="text-left transition hover:text-white"
                >
                  {t.footerBlog}
                </Link>

                <Link
                  to="/faq"
                  className="text-left transition hover:text-white"
                >
                  {t.footerFAQ}
                </Link>

                <button
                  onClick={() => {
                  sendStat("click");
                  startCheckout("lite", selectedOptions);
                }}
                  className="text-left transition hover:text-white"
                >
                  {t.footerOrderLite}
                </button>
                <button
                  onClick={() => {
                  sendStat("click");
                  startCheckout("standard");
                }}
                  className="text-left transition hover:text-white"
                >
                  {t.footerOrderScreen}
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-3 text-base font-semibold">{t.footerLegal}</div>
              <div className="flex flex-col items-start gap-2 text-sm text-emerald-100/80">
                <button
                  onClick={() => openModal("legal")}
                  className="text-left transition hover:text-white"
                >
                  {t.footerLegalNotice}
                </button>
                <button
                  onClick={() => openModal("privacy")}
                  className="text-left transition hover:text-white"
                >
                  {t.footerPrivacy}
                </button>
                <button
                  onClick={() => openModal("cookies")}
                  className="text-left transition hover:text-white"
                >
                  {t.footerCookies}
                </button>
                <button
                  onClick={reopenCookieBanner}
                  className="text-left transition hover:text-white"
                >
                  {t.footerManageCookies}
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-3 text-base font-semibold">{t.footerContact}</div>
              <div className="flex flex-col items-start gap-2 text-sm text-emerald-100/80">
                <div>contact@blockpulse.be</div>
                <a
                  href="https://www.linkedin.com/in/christophe-devleeshouwer-882377399/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.tiktok.com/@blockpulse_be"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-4 text-center text-sm text-emerald-100/80">
            🔒 {t.footerBottom}
          </div>

          <div className="pt-6 text-center text-xs text-emerald-100/60">
            © 2026 BlockPulse
          </div>
        </div>
      </footer>

      {/* COOKIE BANNER */}
      {cookieConsent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-2xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-bold text-slate-900">
                {t.cookieTitle}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {t.cookieDesc}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={refuseCookies}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                {t.cookieRefuse}
              </button>
              <button
                onClick={acceptCookies}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t.cookieAccept}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEGAL MODALS */}
      <LegalModal
  isOpen={activeModal === "legal"}
  title={t.legalTitle}
  onClose={closeModal}
  closeText={t.close}
>
  <div className="space-y-4 text-sm leading-relaxed text-slate-700">
    <p>{t.legalText1}</p>

    <p>
      {t.legalText2}
      <br />
      {t.legalText3}
      <br />
      {t.legalText4}
    </p>

    <p>{t.legalText5}</p>

    <p>{t.legalText6}</p>

    <p>{t.legalText7}</p>
  </div>
</LegalModal>

<LegalModal
  isOpen={activeModal === "privacy"}
  title={t.privacyTitle}
  onClose={closeModal}
  closeText={t.close}
>
  <div className="space-y-4 text-sm leading-relaxed text-slate-700">
    <p>{t.privacyText1}</p>
    <p>{t.privacyText2}</p>
    <p>{t.privacyText3}</p>
    <p>{t.privacyText4}</p>
  </div>
</LegalModal>

<LegalModal
  isOpen={activeModal === "cookies"}
  title={t.cookiesTitle}
  onClose={closeModal}
  closeText={t.close}
>
  <div className="space-y-4 text-sm leading-relaxed text-slate-700">
    <p>{t.cookiesText1}</p>

    <p>
      <strong>{t.cookiesText2}</strong>
    </p>

    <p>
      <strong>{t.cookiesText3}</strong>
    </p>

    <p>
      <strong>
        {cookieConsent === "accepted"
          ? t.cookieAccept
          : cookieConsent === "refused"
          ? t.cookieRefuse
          : "..."}
      </strong>
    </p>

    <button
      onClick={reopenCookieBanner}
      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
    >
      {t.cookiesChange}
    </button>
  </div>
</LegalModal>

      {/* TOP BUTTON */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-lg transition hover:bg-emerald-700"
        >
          ↑ Top
        </button>
      )}
    </div>
}
/>

<Route path="/blog" element={<Blog />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/blog/electricity-cheapest-time" element={<BlogArticle />} />
<Route path="/blog/best-time-washing-machine" element={<BlogArticle2 />} />
<Route path="/blog/why-electricity-bill-high" element={<BlogArticle3 />} />
<Route path="/blog/best-time-coffee-machine" element={<BlogArticle4 />} />
<Route path="/dashboard" element={<Dashboard />} />

</Routes>
);
}

/* CARD */
function ProductCard({
  image,
  title,
  desc,
  points,
  options,
  selectedOptions,
  setSelectedOptions,
  button,
  onClick,
  featured,
  price,
  oldPrice,
  urgency,
  badge,
  subtext,
  isLoading,
  shipping,
  isLite
}) {
  const basePrice = 29;

const totalPrice =
  basePrice +
  (selectedOptions?.includes(0) ? 9 : 0) +
  (selectedOptions?.includes(1) ? 15 : 0);
  return (
    <div
      className={`rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-200 ${
        featured ? "border-2 border-emerald-600 sm:scale-[1.02]" : ""
      }`}
    >
      {badge && (
        <div className="mb-2 text-xs font-semibold text-emerald-700">
          {badge}
        </div>
      )}

    <div className="h-40 w-full flex items-center justify-center bg-white rounded-2xl p-2 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-center rounded-xl transition duration-300"
      />
    </div>

      <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 min-h-[40px] text-sm leading-relaxed text-slate-600">
        {desc}
      </p>

      <div className="mt-3">
        {urgency && (
          <div className="text-xs font-semibold text-orange-600">{urgency}</div>
        )}
        <div className="mt-1 flex items-center gap-2">
          <div className="text-2xl font-bold text-emerald-700">
            {isLite ? `€${totalPrice}` : price}
          </div>
          {oldPrice && (
            <div className="text-sm text-slate-400 line-through">
              {oldPrice}
            </div>
          )}
        </div>
      </div>

    <div className="mt-2 text-xs font-semibold text-emerald-700">
      🌍 {shipping}
    </div>

      <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>

    {options && (
  <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-slate-700 space-y-2">
    {options.map((o, i) => (
      <label key={i} className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedOptions?.includes(i)}
          onChange={() => {
            if (!selectedOptions || !setSelectedOptions) return;

            if (selectedOptions.includes(i)) {
              setSelectedOptions(selectedOptions.filter(x => x !== i));
            } else {
              setSelectedOptions([...selectedOptions, i]);
            }
          }}
        />
        <div>
          <div>{o.label}</div>
          <div className="text-slate-500 text-[11px]">→ {o.desc}</div>
        </div>
      </label>
    ))}
  </div>
)}

      {subtext && (
        <div className="mt-3 text-xs font-medium text-slate-500">{subtext}</div>
      )}

      <button
      onClick={onClick}
      disabled={isLoading}
      className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Loading..." : button}
      </button>
        </div>
      );
}

/* STEP */
function Step({ number, title, text }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
      <div className="text-lg font-bold text-slate-900">
        {number}. {title}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{text}</div>
    </div>
  );
}

/* TRUST ITEM */
function TrustItem({ title, text }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-5">
      <div className="text-base font-bold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{text}</div>
    </div>
  );
}

/* LEGAL MODAL */
function LegalModal({ isOpen, title, children, onClose, closeText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">{children}</div>

        <div className="border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
}