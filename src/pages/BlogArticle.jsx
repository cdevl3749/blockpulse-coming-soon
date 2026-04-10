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
      "Renewable energy like solar and wind also affects prices.",
    h3: "How to save money easily",
    p5:
      "You don’t need to change everything. Just shifting a few habits can make a difference:",
    list: [
      "Run washing machines at night",
      "Charge devices during cheap hours",
      "Avoid heavy usage during peak hours",
    ],
    conclusion:
      "The key is simple: use electricity when it's cheaper.",
    seoTitle: "What is the cheapest time to use electricity? | BlockPulse",
    seoDescription:
      "Discover when electricity is cheapest and how to reduce your bill.",
    helper:
      "Most people don’t know when it's the right moment to use electricity.",

    likeTitle: "👍 This article was helpful?",
    likeHelper: "Helps us create better content",
    likeButton: "Helpful",
    likeThanks: "Thanks!",
    cta: "👉 See how it works in 10 seconds",
  },

  fr: {
    back: "← Retour au blog",
    title: "Quel est le meilleur moment pour utiliser l’électricité ?",
    intro:
      "Le prix de l’électricité varie au cours de la journée.",
    h1: "Quand l’électricité est-elle la moins chère ?",
    p1: "Souvent la nuit (22h – 7h).",
    p2: "Plus cher le soir (17h – 21h).",
    h2: "Pourquoi le prix change ?",
    p3: "Offre et demande.",
    p4: "Les renouvelables influencent aussi.",
    h3: "Comment économiser",
    p5: "Quelques habitudes suffisent :",
    list: [
      "Machines la nuit",
      "Charger hors pointe",
      "Éviter le soir",
    ],
    conclusion: "Consommer au bon moment est la clé.",
    seoTitle: "Quel est le meilleur moment pour utiliser l’électricité ? | BlockPulse",
    seoDescription: "Réduisez votre facture avec des gestes simples.",
    helper: "Un signal simple peut tout changer.",

    likeTitle: "👍 Cet article vous a été utile ?",
    likeHelper: "Nous aide à créer du meilleur contenu",
    likeButton: "Utile",
    likeThanks: "Merci !",
    cta: "👉 Voir comment ça marche en 10 secondes",
  },
};

export default function BlogArticle() {
  const [lang, setLang] = useState("en");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.startsWith("fr")) setLang("fr");
    else setLang("en");
  }, []);

  const t = TEXT[lang] || TEXT.en;

  // SEO
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

  // 👉 LOAD GLOBAL LIKES
  useEffect(() => {
    fetch("/.netlify/functions/stat")
      .then(res => res.json())
      .then(data => {
        const count = data.blogLikes || 0;
        setLikes(count);
      })
      .catch(() => {});

    const saved = localStorage.getItem("blog_liked");
    if (saved === "true") setLiked(true);
  }, []);

  // 👉 CLICK LIKE (GLOBAL)
  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setLikes(prev => prev + 1);

    localStorage.setItem("blog_liked", "true");

    try {
      await fetch("/.netlify/functions/stat", {
        method: "POST",
        body: JSON.stringify({ type: "blog_like" }),
      });
    } catch (e) {
      console.log("like failed (offline)");
    }
  };

  const goToProduct = () => {
    window.location.href = "/#v2lite";
  };

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
          <Link to="/blog" className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow">
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
        <p className="mt-4">{t.p1}</p>
        <p className="mt-2">{t.p2}</p>

        <h2 className="mt-8 text-2xl font-bold text-emerald-900">{t.h2}</h2>
        <p className="mt-4">{t.p3}</p>
        <p className="mt-2">{t.p4}</p>

        <h2 className="mt-8 text-2xl font-bold text-emerald-900">{t.h3}</h2>
        <p className="mt-4">{t.p5}</p>

        <ul className="mt-4 list-disc pl-6">
          {t.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-8 font-semibold text-emerald-900">
          {t.conclusion}
        </p>

        <p className="mt-6 text-sm text-slate-600">
          {t.helper}
        </p>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button onClick={goToProduct} className="text-emerald-700 font-semibold underline hover:text-emerald-900">
            {t.cta}
          </button>
        </div>

        {/* LIKE */}
        <div className="mt-10 p-6 border rounded-xl text-center">
          <p className="text-sm text-slate-500 mb-2">{t.likeHelper}</p>

          {likes > 0 && (
                <p className="text-xs text-slate-500 mb-2">
                {lang === "fr"
                    ? `${likes} personnes trouvent cela utile`
                    : `${likes} people found this helpful`}
                </p>
            )}

          <p className="font-semibold text-emerald-900 mb-3">{t.likeTitle}</p>

          <button
            onClick={handleLike}
            disabled={liked}
            className={`px-5 py-2 rounded-full text-white font-semibold ${
              liked ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            👍 {liked ? t.likeThanks : t.likeButton} ({likes})
          </button>
        </div>
      </section>
    </div>
  );
}