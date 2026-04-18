import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to blog",
    title: "Why is your electricity bill so high?",
    intro:
      "A high electricity bill often comes from using appliances at the wrong time, without even realizing it.",

    h1: "Why does your electricity bill feel too high?",
    p1:
      "Electricity prices can change during the day depending on demand.",
    p2:
      "Many people use their appliances in the evening, when electricity is often more expensive.",

    h2: "Why timing matters",
    p3:
      "Using electricity at the wrong moment can increase your bill without changing how much you use.",
    p4:
      "This is especially true for appliances like washing machines, dishwashers, dryers, or water heaters.",

    h3: "Simple ways to reduce your bill",
    p5:
      "A few simple habits can already help you spend less:",

    list: [
      "Avoid peak hours when possible",
      "Run appliances later in the evening or early morning",
      "Use cheaper hours for high-consumption devices",
    ],

    conclusion:
      "You do not always need to use less electricity — sometimes you just need to use it at a better time.",

    seoTitle: "Why your electricity bill is so high | BlockPulse",
    seoDescription:
      "Learn why your electricity bill may be too high and how better timing can help you save money.",

    helper:
      "Most people overpay simply because they use electricity at the wrong moment.",

    likeTitle: "👍 Was this article helpful?",
    likeHelper: "Helps us create better content",
    likeButton: "Helpful",
    likeThanks: "Thanks!",

    cta: "👉 See how it works in 10 seconds",
  },

  fr: {
    back: "← Retour au blog",
    title: "Pourquoi votre facture d’électricité est-elle si élevée ?",
    intro:
      "Une facture d’électricité élevée vient souvent du fait d’utiliser ses appareils au mauvais moment, sans même s’en rendre compte.",

    h1: "Pourquoi votre facture semble trop élevée ?",
    p1:
      "Le prix de l’électricité peut varier au cours de la journée selon la demande.",
    p2:
      "Beaucoup de personnes utilisent leurs appareils le soir, au moment où l’électricité est souvent plus chère.",

    h2: "Pourquoi le moment compte",
    p3:
      "Utiliser l’électricité au mauvais moment peut augmenter votre facture sans changer votre consommation.",
    p4:
      "C’est particulièrement vrai pour la machine à laver, le lave-vaisselle, le sèche-linge ou le chauffe-eau.",

    h3: "Des façons simples de réduire votre facture",
    p5:
      "Quelques habitudes simples peuvent déjà vous aider à payer moins :", 

    list: [
      "Éviter les heures pleines quand c’est possible",
      "Lancer les appareils plus tard le soir ou tôt le matin",
      "Profiter des heures moins chères pour les appareils gourmands",
    ],

    conclusion:
      "Il ne faut pas toujours consommer moins — parfois, il suffit surtout de consommer au meilleur moment.",

    seoTitle: "Pourquoi votre facture d’électricité est si élevée | BlockPulse",
    seoDescription:
      "Découvrez pourquoi votre facture d’électricité peut être trop élevée et comment économiser grâce au bon timing.",

    helper:
      "Beaucoup de personnes paient trop cher simplement parce qu’elles utilisent l’électricité au mauvais moment.",

    likeTitle: "👍 Cet article vous a été utile ?",
    likeHelper: "Nous aide à créer du meilleur contenu",
    likeButton: "Utile",
    likeThanks: "Merci !",

    cta: "👉 Voir comment ça marche en 10 secondes",
  },
};

export default function BlogArticle3() {
  const [lang, setLang] = useState("en");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.startsWith("fr")) setLang("fr");
    else setLang("en");
  }, []);

  const t = TEXT[lang] || TEXT.en;

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

  useEffect(() => {
    fetch("/.netlify/functions/stat")
      .then((res) => res.json())
      .then((data) => {
        const count = data.blogLikes || 0;
        setLikes(count);
      })
      .catch(() => {});

    const saved = localStorage.getItem("blog_liked_3");
    if (saved === "true") setLiked(true);
  }, []);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setLikes((prev) => prev + 1);

    localStorage.setItem("blog_liked_3", "true");

    try {
      await fetch("/.netlify/functions/stat", {
        method: "POST",
        body: JSON.stringify({ type: "blog_like" }),
      });
    } catch (e) {
      console.log("like failed");
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
          <button
            onClick={goToProduct}
            className="text-emerald-700 font-semibold underline hover:text-emerald-900"
          >
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