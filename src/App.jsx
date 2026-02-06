import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import deviceImage from "./assets/blockpulse-device.png";

// ===== Tracking GA4 (respect cookiesAccepted) =====
const GA_MEASUREMENT_ID = "G-CYKGCBJS9C";

function trackEvent(eventName, params = {}) {
  try {
    const consent = window.localStorage.getItem("cookiesAccepted");
    if (consent !== "true") return; // pas de tracking sans consentement
    if (typeof window.gtag !== "function") return; // GA pas chargé / bloqueur

    window.gtag("event", eventName, {
      ...params,
      measurement_id: GA_MEASUREMENT_ID,
    });
  } catch (e) {
    // silence (on ne casse rien)
  }
}

// Track page views
function trackPageView(path) {
  try {
    const consent = window.localStorage.getItem("cookiesAccepted");
    if (consent !== "true") return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch (e) {
    // silence
  }
}


// Composant Cookie Banner
const CookieBanner = ({ onAccept, onRefuse }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Nous utilisons des cookies strictement nécessaires et des cookies de mesure d’audience. Vous pouvez accepter ou refuser.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onRefuse}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm transition-colors font-semibold"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Bouton CTA Flottant
const FloatingCTA = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 px-6 py-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-sm md:text-base flex items-center gap-2"
    >
      <span className="hidden md:inline">Précommander</span>
      <span className="md:hidden">⚡ Préco</span>
      <span className="text-xl">→</span>
    </button>
  );
};

// Composant Logo
const Logo = ({ clickable = false }) => {
  const handleClick = () => {
    if (clickable) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`flex items-center gap-2 ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-yellow-400 to-red-500 rounded-lg transform rotate-45"></div>
        <div className="absolute inset-1 bg-white rounded-lg transform rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
        BlockPulse
      </span>
    </div>
  );
};

// Composant Header
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white/90 backdrop-blur-md shadow-sm z-[60]">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo clickable={true} />
        </div>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          <button 
            onClick={() => scrollToSection('projet')} 
            className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group"
          >
            Fonctionnement
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
          </button>

          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-gray-700 hover:text-yellow-600 transition-all duration-300 font-medium relative group"
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
          </button>

          <button 
            onClick={() => {
              trackEvent("preorder_click", { placement: "header_desktop" });
              scrollToSection('offre');
            }} 
            className="px-4 py-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            Précommander
          </button>

        </div>

        {/* Bouton Menu Mobile */}
        <button 
          className="md:hidden text-gray-800 text-3xl relative z-[70]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
      
      {/* Menu Mobile */}
{mobileMenuOpen && (
  <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
    <div className="flex flex-col p-4 space-y-3">
      <button 
        onClick={() => scrollToSection('projet')} 
        className="text-left text-gray-700 hover:text-green-600 py-2 font-medium"
      >
        Fonctionnement
      </button>

      <button 
        onClick={() => scrollToSection('faq')} 
        className="text-left text-gray-700 hover:text-yellow-600 py-2 font-medium"
      >
        FAQ
      </button>
    </div>
  </div>
)}

    </header>
  );
};

// Composant Hero Section
const HeroSection = ({ fundingData, scrollToOffer }) => {

  return (
    <section className="pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="sr-only">
              BlockPulse, le boîtier intelligent pour économiser l'électricité
            </h1>

            <h2 className="font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              Réduisez votre facture d&apos;électricité
              <br />
              <span className="text-green-600">de 45%</span>{" "}
              <span className="text-orange-500">sans effort</span>
            </h2>

            {/* Ligne innovation belge */}
            <p className="text-sm sm:text-lg mt-4 text-gray-700 flex items-center justify-center md:justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3 2"
                width="18"
                height="12"
                className="inline-block"
              >
                <rect width="1" height="2" x="0" fill="#000000" />
                <rect width="1" height="2" x="1" fill="#FFD90C" />
                <rect width="1" height="2" x="2" fill="#EF3340" />
              </svg>
              <span>Innovation 100% belge • Sans changer vos habitudes</span>
            </p>

            {/* Offre de lancement - SANS ICÔNE */}
            <p className="text-sm sm:text-base mt-3 font-bold text-orange-600">
              Offre de lancement : -22% pour les 50 premiers
            </p>

              {/* Badges simplifiés */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-green-800">
                  Sans application
                </span>
                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-green-800">
                  Sans abonnement
                </span>
            </div>
            {/* CTA Principal - Précommande */}
            <div className="mt-8 flex flex-col items-center md:items-start gap-3">
              <a
                href="#offre"
                className="inline-block w-full sm:w-auto bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-lg text-base sm:text-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center"
              >
                ⚡ Je précommande maintenant
              </a>

              <p className="text-xs text-gray-500 text-center md:text-left">
                🔒 Paiement sécurisé • Annulation gratuite jusqu&apos;à la production
              </p>
            </div>

            {/* Bouton secondaire conservé */}
            <div className="mt-4">
              <button
                onClick={() =>
                  document
                    .getElementById("projet")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all hover:scale-105 text-center"
              >
                En savoir plus
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <img
              src={deviceImage}
              alt="Boîtier BlockPulse avec écran LED indiquant le bon moment pour consommer"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl shadow-lg"
            />
            <p className="text-center text-green-600 font-bold text-lg sm:text-xl">
              C&apos;est le moment idéal !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant FAQ
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Qu'est-ce que BlockPulse exactement ?",
      answer: "BlockPulse est un boîtier intelligent équipé d'un ESP32 qui analyse en temps réel les tarifs de l'électricité. Il vous indique via 3 LEDs colorées (vert, orange, rouge) le meilleur moment pour utiliser vos appareils énergivores comme la machine à laver, le lave-vaisselle ou le sèche-linge."
    },
    {
      question: "Comment fonctionne le système de LEDs ?",
      answer: "🟢 LED VERTE = C'est le moment idéal ! Tarif le plus bas, lancez vos appareils. 🟠 LED ORANGE = Tarif moyen, vous pouvez attendre un meilleur moment. 🔴 LED ROUGE = Tarif élevé, évitez d'utiliser vos appareils énergivores."
    },
    {
      question: "L'installation est-elle compliquée ?",
      answer: "Pas du tout ! Il suffit de brancher BlockPulse sur une prise électrique et de le connecter à votre Wi-Fi via l'application web incluse. Aucun outil nécessaire, aucune compétence technique requise. L'installation prend moins de 5 minutes."
    },
    {
      question: "Combien puis-je économiser réellement ?",
      answer: "En pratique, les économies dépendent de votre consommation et de votre capacité à déplacer certains usages vers les heures les plus avantageuses. En moyenne, les utilisateurs peuvent réduire leur facture d’électricité jusqu’à 25 à 30 %. Pour un foyer belge, cela représente généralement jusqu’à environ 300 € d’économies par an."
    },

    {
      question: "BlockPulse fonctionne-t-il avec mon fournisseur d'énergie ?",
      answer: "Oui ! BlockPulse est compatible avec tous les fournisseurs d'énergie en Belgique et dans l'Union Européenne. Il analyse les prix spot du marché de l'électricité et s'adapte automatiquement à votre région."
    },
    {
      question: "Ai-je besoin d'une application mobile ?",
      answer: "Non ! C'est la force de BlockPulse : tout est visible directement sur le boîtier grâce aux 3 LEDs. Pas besoin de sortir votre téléphone, un simple coup d'œil suffit. Simple et efficace !"
    },
    {
      question: "Quelle est la consommation électrique de BlockPulse ?",
      answer: "BlockPulse consomme moins de 2W en fonctionnement continu, soit environ 0,50€ par an en électricité. Les économies qu'il vous permet de réaliser sont largement supérieures à sa propre consommation !"
    },
    {
      question: "Quand vais-je recevoir mon BlockPulse ?",
      answer: "La livraison est prévue pour mi-mars 2026. Nos premiers utilisateurs recevront leur boîtier en priorité. Vous recevrez des mises à jour régulières sur l'avancement de la production par email."
    },
    {
      question: "Y a-t-il une garantie ?",
      answer: "Oui ! BlockPulse est garanti 2 ans contre tout défaut de fabrication. De plus, vous bénéficiez d'un droit de rétractation de 14 jours après réception. Si vous n'êtes pas satisfait, nous vous remboursons intégralement."
    },
    {
      question: "Que vais-je recevoir exactement ?",
      answer: "Le colis BlockPulse contiendra le boîtier prêt à l’emploi, une alimentation USB 5V (prise européenne), un câble USB et un guide de démarrage rapide. Le contenu est prévisionnel et pourra légèrement évoluer jusqu’à la version finale."
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">Questions fréquentes</h2>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12">
          Toutes les réponses à vos questions sur BlockPulse
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-green-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base pr-4">{faq.question}</span>
                <span className={`text-2xl text-green-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center p-4 sm:p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-md border-2 border-green-200">
          <p className="text-gray-700 mb-4 text-sm sm:text-base font-semibold">
            Vous avez une autre question ?
          </p>
          <a 
            href="mailto:contact@blockpulse.be" 
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            📧 Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

const ProofSection = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Pourquoi BlockPulse fonctionne
        </h2>

        <p className="mb-8 text-lg text-gray-600 max-w-3xl mx-auto">
          Le prix de l'électricité en Belgique peut varier de plus de <strong>200&nbsp;%</strong> au cours d’une même journée.
          BlockPulse vous indique automatiquement quand consommer pour payer le moins cher.
        </p>

       <div className="grid gap-8 md:grid-cols-3">
  {/* Carte 1 - Prix BAS */}
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
      <div className="h-8 w-8 rounded-full bg-green-500"></div>
    </div>
    <h3 className="mb-3 text-xl font-bold text-gray-800">
      💚 Prix BAS
    </h3>
    <p className="text-sm text-gray-500 mb-3">0,10-0,15€/kWh</p>
    <p className="text-gray-700 mb-4">
      BlockPulse active vos appareils énergivores :
    </p>
    <ul className="text-left text-sm text-gray-600 space-y-2">
      <li>✓ Machine à laver</li>
      <li>✓ Lave-vaisselle</li>
      <li>✓ Charge voiture électrique</li>
    </ul>
    <p className="mt-4 text-green-600 font-bold text-lg">
      Économie : ~200€/an
    </p>
  </div>

  {/* Carte 2 - Prix MOYEN */}
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
      <div className="h-8 w-8 rounded-full bg-yellow-500"></div>
    </div>
    <h3 className="mb-3 text-xl font-bold text-gray-800">
      🟡 Prix MOYEN
    </h3>
    <p className="text-sm text-gray-500 mb-3">0,20-0,25€/kWh</p>
    <p className="text-gray-700 mb-4">
      Vous pouvez utiliser vos appareils normalement
    </p>
    <ul className="text-left text-sm text-gray-600 space-y-2">
      <li>✓ Utilisation normale</li>
      <li>✓ Pas de restriction</li>
      <li>✓ Confort préservé</li>
    </ul>
    <p className="mt-4 text-yellow-600 font-bold text-lg">
      Économie : ~50€/an
    </p>
  </div>

        {/* Carte 3 - Prix ÉLEVÉ */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto">
            <div className="h-8 w-8 rounded-full bg-red-500"></div>
          </div>
          <h3 className="mb-3 text-xl font-bold text-gray-800">
            🔴 Prix ÉLEVÉ
          </h3>
          <p className="text-sm text-gray-500 mb-3">0,35-0,50€/kWh</p>
          <p className="text-gray-700 mb-4">
            BlockPulse coupe automatiquement :
          </p>
          <ul className="text-left text-sm text-gray-600 space-y-2">
            <li>✓ Appareils en veille</li>
            <li>✓ Chauffage d'appoint</li>
            <li>✓ Chargeurs inutiles</li>
          </ul>
          <p className="mt-4 text-red-600 font-bold text-lg">
            Surcoût évité : ~150€/an
          </p>
        </div>
      </div>

     {/* Résumé total */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-8 border-2 border-green-200">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          💰 Économie totale estimée : jusqu’à <strong>300&nbsp;€/an</strong>
        </p>
        <p className="text-gray-600">
          Soit environ <strong>25&nbsp;€</strong> d’économies par mois • BlockPulse rentabilisé en quelques mois
        </p>
      </div>

      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Indication en temps réel",
      description: "3 LEDs (vert, orange, rouge) vous indiquent instantanément le meilleur moment pour utiliser vos appareils.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: "💰",
      title: "Économies garanties",
      description: "Jusqu'à 45% d'économies sur votre facture d'électricité en utilisant l'énergie aux heures creuses.",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: "🌱",
      title: "Écologique",
      description: "Réduisez votre empreinte carbone en consommant l'électricité quand elle est la plus verte.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "📱",
      title: "Simple et intuitif",
      description: "Aucune application nécessaire. Installation en 5 minutes, il suffit de le brancher.",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: "🔌",
      title: "Compatible partout",
      description: "Fonctionne avec tous les fournisseurs d'énergie en Belgique et dans toute l'Europe.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: "🛡️",
      title: "Fiable et sécurisé",
      description: "Technologie ESP32 éprouvée. Garantie 2 ans et mises à jour gratuites.",
      color: "from-red-400 to-red-600"
    }
  ];

  return (
    <section id="projet" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">Comment ça fonctionne ?</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
          BlockPulse analyse en permanence les tarifs de l'électricité et vous guide pour optimiser votre consommation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-4 sm:p-6 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Offres
const PricingSection = () => {
  const handlePreorder = async () => {
    trackEvent("begin_checkout", { placement: "pricing", method: "stripe" });

  try {
    const res = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("Checkout error:", res.status, txt);
      alert("Erreur lors du paiement. Réessayez dans quelques secondes.");
      return;
    }

    const data = await res.json();
    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    alert("Erreur lors du paiement. Réessayez.");
  }
};


  return (
    <section id="offre"  className="scroll-mt-24 md:scroll-mt-28 py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 px-4">Offre de lancement exclusive</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-8 sm:mb-12 px-4">
          Profitez d’un tarif exceptionnel réservé aux premières précommandes
        </p>
        <div className="max-w-lg mx-auto px-4">
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 ring-4 ring-green-500 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
              ⭐ Offre Early Bird
            </div>
            
            <div className="mb-4 mt-4">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                🔥 Série de lancement – quantité limitée
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3 text-center">
              BlockPulse
            </h3>

            <div className="flex justify-center my-4">
              <img
                src={deviceImage}
                alt="Boîtier BlockPulse"
                className="w-28 sm:w-32 md:w-36 rounded-md shadow-sm"
              />
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
              Produit en cours de production – 📦 Livraison prévue : mi-mars 2026.
            </p>

            <div className="mb-6">
  {/* Badge urgence + Prix - Structure verticale centrée */}
  <div className="flex flex-col items-center gap-3">
    {/* Badge urgence */}
    <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
      ⚡ Plus que 42/50 places
    </div>
    
    {/* Prix */}
    <div className="flex items-baseline gap-2">
      <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
        69€
      </span>
      <span className="text-gray-400 line-through text-xl sm:text-2xl">89€</span>
    </div>
  </div>
  
  <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">TTC - Livraison incluse</p>
  
  <div className="text-center mt-3">
    <p className="mb-6 inline-block rounded-full bg-green-100 px-4 py-2 text-base font-bold text-green-700">
     🎯 -22% de réduction • Économisez 20€
    </p>
  </div>
</div>
            
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>1 BlockPulse</strong> - Boîtier intelligent</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>Livraison offerte</strong> en Belgique</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>Garantie 2 ans</strong> constructeur</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>Mises à jour gratuites</strong> à vie</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>Support prioritaire</strong> email</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-green-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700"><strong>Guide d'optimisation</strong> énergétique</span>
              </li>
            </ul>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-800 mb-2">
                📦 Contenu du colis (prévisionnel)
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1× BlockPulse</li>
                <li>• 1× Alimentation USB 5V (prise EU)</li>
                <li>• 1× Câble USB</li>
                <li>• 1× Guide de démarrage rapide</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Contenu susceptible d’évoluer légèrement jusqu’à la version finale.
              </p>
            </div>

            <p className="text-center text-gray-700 text-lg font-semibold mb-3">
              69 € TTC — Offre de lancement
              <span className="block text-sm font-normal text-gray-500">
                Livraison offerte en Belgique
              </span>
            </p>

            <button 
              onClick={handlePreorder}
              className="w-full py-4 sm:py-5 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 text-white hover:shadow-2xl text-base sm:text-lg"
            >
              ⚡ Je précommande
            </button>

            {/* AJOUTEZ ICI - Juste après le bouton </button> et avant le <p className="mt-3..."> */}

<div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
  <div className="flex items-center gap-1">
    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    <span className="font-medium">Paiement sécurisé</span>
  </div>
  <span className="text-gray-300">•</span>
  <div className="flex items-center gap-1">
    <svg className="w-12 h-5" viewBox="0 0 60 25" fill="none">
      <rect x="0" y="4" width="60" height="17" rx="3" fill="#6772E5"/>
      <text x="8" y="16" fill="white" fontSize="10" fontWeight="bold">stripe</text>
    </svg>
  </div>
</div>

            <p className="mt-3 text-xs sm:text-sm text-gray-500 text-center">
              🔹 <strong>Précommande</strong> – produit en cours de développement.
              <br />
              📦 Livraison prévue : <strong>mi-mars 2026</strong>.
            </p>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <p className="text-xs sm:text-sm text-gray-700 text-center">
                <strong>💡 Économisez jusqu'à 30%</strong> sur votre facture d'électricité dès la première année !
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 text-center space-y-2 px-4">
          <p className="text-xs sm:text-sm text-gray-500">
            🔒 Paiement 100% sécurisé par Stripe • Remboursement garanti si non satisfait
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            📦 Livraison prévue: <strong>mi-mars 2026</strong> 🔔 Vous serez informé à chaque étape
          </p>
        </div>
      </div>
    </section>
  );
};

// Composant Footer
const Footer = ({ onLegalClick, onPrivacyClick, onCGVClick }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <Logo clickable={true} />
            <p className="text-gray-400 mt-4 text-sm">
              L'énergie intelligente pour un avenir durable.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Projet</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => scrollToSection('projet')} className="hover:text-white transition-colors">Fonctionnement</button></li>
              <li><button onClick={() => scrollToSection('offre')} className="hover:text-white transition-colors">Précommander</button></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Légal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={onLegalClick} className="hover:text-white transition-colors">Mentions légales</button></li>
              <li><button onClick={onPrivacyClick} className="hover:text-white transition-colors">Politique de confidentialité</button></li>
              <li><button onClick={onCGVClick} className="hover:text-white transition-colors">CGV</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="mailto:contact@blockpulse.be" className="hover:text-white transition-colors">
                  contact@blockpulse.be
                </a>
              </li>
              <li>Liège, Belgique</li>
              <li className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/christophe-devleeshouwer-882377399/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Badges de confiance */}
<div className="border-t border-gray-800 pt-6 pb-4">
  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
    
    {/* Badge Paiement sécurisé */}
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <span>Paiement 100% sécurisé</span>
    </div>

    <span className="hidden sm:inline text-gray-700">•</span>

    {/* Badge Stripe */}
    <div className="flex items-center gap-2">
      <span>Propulsé par</span>
      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">stripe</span>
    </div>

    <span className="hidden sm:inline text-gray-700">•</span>

    {/* Badge Satisfait ou remboursé */}
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>Satisfait ou remboursé</span>
    </div>

  </div>
</div>
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>© 2026 BlockPulse. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Composant Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// =======================
// Page Mentions Légales
const LegalPage = () => {
  return (
    <div className="space-y-6 text-gray-700">
      <section>
        <h3 className="text-xl font-bold mb-3">Éditeur du site</h3>
        <p><strong>BlockPulse</strong></p>
        <p>Éditeur : Christophe Devleeshouwer</p>
        <p>Statut : Entrepreneur individuel (en cours de structuration)</p>
        <p>Adresse : Liège, Belgique</p>
        <p>
          Email :{" "}
          <a
            href="mailto:contact@blockpulse.be"
            className="text-green-600 hover:underline"
          >
            contact@blockpulse.be
          </a>
        </p>
        <p>
          Site web :{" "}
          <a
            href="https://blockpulse.be"
            className="text-green-600 hover:underline"
          >
            https://blockpulse.be
          </a>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Hébergement</h3>
        <p>
          Le site BlockPulse est hébergé par :
        </p>
        <p className="mt-2">
          <strong>one.com Group AB</strong><br />
          Société européenne d’hébergement web – Union Européenne
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Propriété intellectuelle</h3>
        <p>
          L’ensemble des contenus présents sur ce site (textes, images,
          illustrations, logos, design, code) est la propriété exclusive de
          BlockPulse, sauf mention contraire.
        </p>
        <p className="mt-2">
          Toute reproduction, représentation ou exploitation non autorisée,
          totale ou partielle, est strictement interdite.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Responsabilité</h3>
        <p>
          BlockPulse propose un service d’information et d’aide à la décision
          concernant l’optimisation de la consommation énergétique.
        </p>
        <p className="mt-2">
          BlockPulse ne saurait être tenu responsable des décisions prises par
          l’utilisateur sur base des informations fournies.
        </p>
      </section>
    </div>
  );
};

// =======================
// Page Politique de Confidentialité
const PrivacyPage = () => {
  return (
    <div className="space-y-6 text-gray-700">
      <section>
        <h3 className="text-xl font-bold mb-3">Collecte des données</h3>
        <p>
          Dans le cadre de la précommande du produit BlockPulse, nous collectons
          uniquement les données strictement nécessaires :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Adresse de livraison</li>
          <li>Données de paiement (traitées exclusivement par Stripe)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Utilisation des données</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Traitement des précommandes</li>
          <li>Livraison du produit</li>
          <li>Support client</li>
          <li>Informations liées à la commande</li>
          <li>Amélioration du service</li>
        </ul>
        <p className="mt-3 font-semibold">
          Aucune donnée personnelle n’est vendue ou cédée à des tiers.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Paiements et sécurité</h3>
        <p>
          Les paiements sont traités de manière sécurisée par Stripe.
          BlockPulse ne stocke aucune donnée bancaire.
        </p>
        <p className="mt-2">
          Les transactions sont protégées par des protocoles de sécurité
          conformes aux standards internationaux (SSL / TLS).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Cookies</h3>
        <p>
          Le site utilise des cookies strictement nécessaires au fonctionnement
          du site ainsi que des cookies de mesure d’audience anonymes.
        </p>
        <p className="mt-2">
          Vous pouvez accepter ou refuser les cookies via le bandeau prévu à cet
          effet.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Vos droits (RGPD)</h3>
        <p>
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Droit d’accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d’opposition</li>
        </ul>
        <p className="mt-3">
          Pour toute demande :{" "}
          <a
            href="mailto:contact@blockpulse.be"
            className="text-green-600 hover:underline"
          >
            contact@blockpulse.be
          </a>
        </p>
      </section>
    </div>
  );
};


// =======================
// Page CGV
const CGVPage = () => {
  return (
    <div className="space-y-6 text-gray-700">
      <section>
        <h3 className="text-xl font-bold mb-3">Article 1 – Objet</h3>
        <p>
          Les présentes Conditions Générales de Vente encadrent la vente en
          précommande du produit BlockPulse, proposé en tant que produit
          matériel en cours de développement.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 2 – Prix</h3>
        <p>
          Les prix sont exprimés en euros, toutes taxes comprises (TTC).
          La livraison en Belgique et dans l’Union Européenne est incluse.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 3 – Commande</h3>
        <p>
          Toute commande vaut acceptation pleine et entière des présentes CGV.
          Un email de confirmation est envoyé après validation du paiement.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 4 – Paiement</h3>
        <p>
          Le paiement est effectué en ligne via Stripe, par carte bancaire
          (Visa, Mastercard, American Express).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 5 – Livraison</h3>
        <p>
          La livraison du produit BlockPulse est prévue pour <strong>mi-mars 2026</strong>.
          Cette date est indicative et peut évoluer en fonction des contraintes
          de production.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 6 – Droit de rétractation</h3>
        <p>
          Conformément à la législation applicable, le droit de rétractation
          s’exerce dans un délai de 14 jours à compter de la réception du produit.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">Article 7 – Service client</h3>
        <p>
          Pour toute question :{" "}
          <a
            href="mailto:contact@blockpulse.be"
            className="text-green-600 hover:underline"
          >
            contact@blockpulse.be
          </a>
        </p>
      </section>
    </div>
  );
};


// App Principal
function Home() {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCGVModal, setShowCGVModal] = useState(false);

  // 🔔 Newsletter / notification lancement
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState("idle");
  const [notifyError, setNotifyError] = useState("");


  const [fundingData, setFundingData] = useState({
    current: 14580,
    goal: 25000,
    backers: 247,
    daysLeft: 28,
  });

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    setNotifyStatus("loading");
    setNotifyError("");

    try {
      const res = await fetch("/.netlify/functions/notify-launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: notifyEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Erreur");
      }

      setNotifyStatus("success");
      setNotifyEmail("");
    } catch (err) {
      setNotifyStatus("error");
      setNotifyError(
        "Une erreur est survenue. Merci de réessayer plus tard."
      );
    }
  };

  useEffect(() => {
  const savedCookies = window.localStorage.getItem("cookiesAccepted");
  if (savedCookies !== null) {
    const accepted = JSON.parse(savedCookies);
    setCookiesAccepted(accepted);
    
    // ✅ Si cookies déjà acceptés, tracker la page
    if (accepted) {
      trackPageView(window.location.pathname);
    }
  }
}, []);

const handleAcceptCookies = () => {
  // Sauvegarde du consentement
  localStorage.setItem("cookiesAccepted", "true");
  setCookiesAccepted(true);

  if (typeof window.gtag === "function") {
    // ✅ Autoriser Analytics
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });

    // ✅ ENVOYER LE PAGE_VIEW MANUELLEMENT
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

 const handleRefuseCookies = () => {
  window.localStorage.setItem("cookiesAccepted", "false");
  setCookiesAccepted(false);

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }
};

  const scrollToOffer = () => {
    const element = document.getElementById("offre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection fundingData={fundingData} scrollToOffer={scrollToOffer} />
      <ProofSection />
      <Features />
      <PricingSection />
      <FAQ />
      {/* 🔔 Newsletter – Notification de lancement */}
<section className="bg-green-50 border-t border-green-100 py-12 px-4">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">
      🔔 Vous hésitez encore ?
    </h2>

    <p className="text-gray-600 mb-6">
      Laissez-nous votre email pour être informé du lancement.
      <br className="hidden sm:block" />
      Un seul message, aucun spam.
    </p>

    <form
      onSubmit={handleNotifySubmit}
      className="mt-4 mb-5 flex flex-col sm:flex-row gap-3 w-full justify-center"
    >
      <input
        type="email"
        value={notifyEmail}
        onChange={(e) => setNotifyEmail(e.target.value)}
        placeholder="Votre adresse email"
        required
        className="flex-1 max-w-xs rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-green-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={notifyStatus === "loading"}
        className="whitespace-nowrap rounded-lg bg-gradient-to-r from-green-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
      >
        {notifyStatus === "loading" ? "Envoi..." : "Être informé du lancement"}
      </button>
    </form>

    {notifyStatus === "success" && (
      <p className="mt-2 text-sm text-green-700">
        ✅ Votre email ne sera jamais partagé. 1 message au lancement, rien de plus.
      </p>
    )}

    {notifyStatus === "error" && (
      <p className="mt-2 text-sm text-red-600">{notifyError}</p>
    )}
  </div>
</section>

      <Footer
        onLegalClick={() => setShowLegalModal(true)}
        onPrivacyClick={() => setShowPrivacyModal(true)}
        onCGVClick={() => setShowCGVModal(true)}
      />

      {cookiesAccepted === null && (
        <CookieBanner onAccept={handleAcceptCookies} onRefuse={handleRefuseCookies} />
      )}


    {/* ✅ AJOUTE CETTE LIGNE ICI */}
    <FloatingCTA onClick={() => {
      trackEvent("floating_cta_click", { placement: "floating_button" });
      scrollToOffer();
    }} />

      <Modal isOpen={showLegalModal} onClose={() => setShowLegalModal(false)} title="Mentions légales">
        <LegalPage />
      </Modal>

      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Politique de confidentialité">
        <PrivacyPage />
      </Modal>

      <Modal isOpen={showCGVModal} onClose={() => setShowCGVModal(false)} title="Conditions Générales de Vente">
        <CGVPage />
      </Modal>
    </div>
  );
}

// Tracker les changements de route
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const consent = window.localStorage.getItem("cookiesAccepted");
    if (consent === "true") {
      trackPageView(location.pathname);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paiement/success" element={<PaymentSuccess />} />
        <Route path="/paiement/cancel" element={<PaymentCancel />} />
      </Routes>
    </>
  );
}

