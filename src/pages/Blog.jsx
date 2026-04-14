import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const BLOG_TEXT = {
  en: {
    backHome: "← Back to home",
    title: "Energy Tips & Electricity Prices",
    desc: "Learn when electricity is cheapest and how to reduce your energy bill easily.",

    articleTitle: "What is the cheapest time to use electricity?",
    articleDesc:
      "Discover the best hours to use electricity and save money without changing your habits.",

    // ✅ NOUVEL ARTICLE
    article2Title: "Best time to run a washing machine",
    article2Desc:
      "Find out when to use your washing machine to save electricity easily.",

    readMore: "Read article →",

    seoTitle: "Energy tips & electricity prices | BlockPulse",
    seoDescription:
      "Learn when electricity is cheapest and how to reduce your energy bill with simple habits.",
  },

  fr: {
    backHome: "← Retour à l’accueil",
    title: "Conseils énergie et prix de l’électricité",
    desc: "Découvrez quand l’électricité est la moins chère et comment réduire votre facture simplement.",

    articleTitle: "Quel est le meilleur moment pour utiliser l’électricité ?",
    articleDesc:
      "Découvrez les meilleures heures pour consommer l’électricité et faire des économies sans changer vos habitudes.",

    // ✅ NOUVEL ARTICLE
    article2Title: "Meilleur moment pour utiliser la machine à laver",
    article2Desc:
      "Découvrez quand lancer votre machine pour économiser de l’électricité facilement.",

    readMore: "Lire l’article →",

    seoTitle: "Conseils énergie et prix de l’électricité | BlockPulse",
    seoDescription:
      "Découvrez quand l’électricité est la moins chère et comment réduire votre facture facilement.",
  },

  de: {
    backHome: "← Zur Startseite",
    title: "Energietipps und Strompreise",
    desc: "Erfahren Sie, wann Strom am günstigsten ist und wie Sie Ihre Rechnung einfach senken können.",

    articleTitle: "Wann ist Strom am günstigsten?",
    articleDesc:
      "Entdecken Sie die besten Zeiten, um Strom zu nutzen und ohne großen Aufwand Geld zu sparen.",

    // ✅ NOUVEL ARTICLE
    article2Title: "Beste Zeit für die Waschmaschine",
    article2Desc:
      "Erfahren Sie, wann Sie Ihre Waschmaschine am besten nutzen, um Strom zu sparen.",

    readMore: "Artikel lesen →",

    seoTitle: "Energietipps und Strompreise | BlockPulse",
    seoDescription:
      "Erfahren Sie, wann Strom am günstigsten ist und wie Sie Ihre Stromkosten senken können.",
  },

  nl: {
    backHome: "← Terug naar home",
    title: "Energietips en elektriciteitsprijzen",
    desc: "Ontdek wanneer elektriciteit het goedkoopst is en hoe je eenvoudig je energiefactuur verlaagt.",

    articleTitle: "Wanneer is elektriciteit het goedkoopst?",
    articleDesc:
      "Ontdek de beste uren om elektriciteit te gebruiken en te besparen zonder je gewoontes te veranderen.",

    // ✅ NOUVEL ARTICLE
    article2Title: "Beste moment voor de wasmachine",
    article2Desc:
      "Ontdek wanneer je je wasmachine gebruikt om elektriciteit te besparen.",

    readMore: "Artikel lezen →",

    seoTitle: "Energietips en elektriciteitsprijzen | BlockPulse",
    seoDescription:
      "Ontdek wanneer elektriciteit het goedkoopst is en hoe je eenvoudig energie kunt besparen.",
  },
};

export default function Blog() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();

    if (browserLang.startsWith("fr")) setLang("fr");
    else if (browserLang.startsWith("de")) setLang("de");
    else if (browserLang.startsWith("nl")) setLang("nl");
    else setLang("en");
  }, []);

  const t = BLOG_TEXT[lang] || BLOG_TEXT.en;

  // ✅ SEO dynamique
  useEffect(() => {
    document.title = t.seoTitle;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", t.seoDescription);
  }, [t]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${energyBg})` }}
        />
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow transition hover:bg-white"
          >
            {t.backHome}
          </Link>

          <div className="mt-6 text-center">
            <h1 className="text-4xl font-extrabold text-emerald-950 sm:text-5xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
              {t.desc}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6">

          {/* ARTICLE 1 */}
          <Link
            to="/blog/electricity-cheapest-time"
            className="block rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:shadow-xl"
          >
            <h2 className="text-xl font-bold text-emerald-900">
              {t.articleTitle}
            </h2>

            <p className="mt-2 text-slate-600">
              {t.articleDesc}
            </p>

            <div className="mt-3 text-sm font-semibold text-emerald-700">
              {t.readMore}
            </div>
          </Link>

          {/* ARTICLE 2 */}
          <Link
            to="/blog/best-time-washing-machine"
            className="block rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:shadow-xl"
          >
            <h2 className="text-xl font-bold text-emerald-900">
              {t.article2Title}
            </h2>

            <p className="mt-2 text-slate-600">
              {t.article2Desc}
            </p>

            <div className="mt-3 text-sm font-semibold text-emerald-700">
              {t.readMore}
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}