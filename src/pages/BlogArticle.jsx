import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to blog",
    title: "What is the cheapest time to use electricity?",
    intro:
      "Electricity prices change throughout the day. Knowing when to use energy can significantly reduce your bill without changing your lifestyle.",
    h1: "When is electricity the cheapest?",
    p1:
      "In most European countries, electricity is cheaper during off-peak hours. These typically occur at night (around 22:00 – 07:00) and sometimes during weekends.",
    p2:
      "The most expensive period is usually in the evening (around 17:00 – 21:00), when demand is highest.",
    h2: "Why does electricity price change?",
    p3:
      "Electricity prices depend on supply and demand. When many people use electricity at the same time, prices increase. When demand is low, prices drop.",
    p4:
      "Renewable energy like solar and wind also affects prices. For example, sunny afternoons or windy nights can make electricity cheaper.",
    h3: "How to save money easily",
    p5:
      "You don’t need to change everything. Just shifting a few habits can make a difference:",
    list: [
      "Run washing machines at night",
      "Charge devices during cheap hours",
      "Avoid heavy usage during peak hours",
    ],
    conclusion:
      "The key is simple: use electricity when it's cheaper. A simple visual signal can help you build that habit without effort.",

    // ✅ SEO
    seoTitle: "What is the cheapest time to use electricity? | BlockPulse",
    seoDescription:
      "Discover when electricity is cheapest, why prices change, and how to reduce your bill with simple habits.",
    
    // ✅ subtle conversion
    helper:
      "Most people don’t know when it's the right moment to use electricity. Having a simple signal can make it effortless.",
  },

  fr: {
    back: "← Retour au blog",
    title: "Quel est le meilleur moment pour utiliser l’électricité ?",
    intro:
      "Le prix de l’électricité varie au cours de la journée. Savoir quand consommer peut réduire votre facture sans changer votre mode de vie.",
    h1: "Quand l’électricité est-elle la moins chère ?",
    p1:
      "Dans la plupart des pays européens, l’électricité est moins chère pendant les heures creuses. Généralement la nuit (22h – 7h) et parfois le week-end.",
    p2:
      "La période la plus chère est souvent en soirée (17h – 21h), lorsque la demande est la plus forte.",
    h2: "Pourquoi le prix change ?",
    p3:
      "Le prix dépend de l’offre et de la demande. Quand beaucoup de personnes consomment en même temps, les prix augmentent.",
    p4:
      "Les énergies renouvelables influencent aussi les prix. Par exemple, beaucoup de soleil ou de vent peut faire baisser les coûts.",
    h3: "Comment économiser facilement",
    p5:
      "Pas besoin de tout changer. Quelques habitudes suffisent :",
    list: [
      "Lancer les machines la nuit",
      "Charger les appareils aux heures creuses",
      "Éviter les heures de pointe",
    ],
    conclusion:
      "Le plus important est simple : consommer au bon moment. Un signal visuel peut vous aider à adopter ce réflexe facilement.",

    // ✅ SEO
    seoTitle: "Quel est le meilleur moment pour utiliser l’électricité ? | BlockPulse",
    seoDescription:
      "Découvrez quand l’électricité est la moins chère et comment réduire votre facture avec des gestes simples.",

    helper:
      "Le plus difficile n’est pas de consommer moins, mais de savoir quand consommer. Un signal simple peut tout changer.",
  },
};

export default function BlogArticle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();

    if (browserLang.startsWith("fr")) setLang("fr");
    else if (browserLang.startsWith("de")) setLang("en"); // fallback propre
    else if (browserLang.startsWith("nl")) setLang("en");
    else setLang("en");
  }, []);

  const t = TEXT[lang] ? TEXT[lang] : TEXT.en;

    if (!t) return null;

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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${energyBg})` }}
        />
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16">
          <Link
            to="/blog"
            className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow"
          >
            {t.back}
          </Link>

          <h1 className="mt-6 text-4xl font-extrabold text-emerald-950">
            {t.title}
          </h1>

          <p className="mt-4 text-lg text-slate-700">
            {t.intro}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">{t.h1}</h2>
        <p className="mt-4 text-slate-700">{t.p1}</p>
        <p className="mt-2 text-slate-700">{t.p2}</p>

        <h2 className="mt-8 text-2xl font-bold text-emerald-900">{t.h2}</h2>
        <p className="mt-4 text-slate-700">{t.p3}</p>
        <p className="mt-2 text-slate-700">{t.p4}</p>

        <h2 className="mt-8 text-2xl font-bold text-emerald-900">{t.h3}</h2>
        <p className="mt-4 text-slate-700">{t.p5}</p>

        <ul className="mt-4 list-disc pl-6 text-slate-700">
          {t.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-8 text-lg font-semibold text-emerald-900">
          {t.conclusion}
        </p>

        {/* 🔥 BOOST CONVERSION DISCRET */}
        <p className="mt-6 text-sm text-slate-600">
          {t.helper}
        </p>
      </section>
    </div>
  );
}