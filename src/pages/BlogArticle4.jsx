import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to blog",
    title: "When should you use a coffee machine?",
    intro:
      "Even small appliances like a coffee machine can impact your electricity bill — especially when used at the wrong time.",

    h1: "Does a coffee machine really consume electricity?",
    p1:
      "A coffee machine doesn’t use a lot of electricity, but it heats water very quickly, which creates short power peaks.",
    p2:
      "When used during peak hours, even small devices can cost more than expected.",

    h2: "Why timing still matters",
    p3:
      "Electricity prices change throughout the day depending on demand and energy supply.",
    p4:
      "Morning hours are often more expensive because many people use appliances at the same time.",

    h3: "A simple habit to save",
    p5:
      "Instead of guessing, a simple visual signal can tell you instantly if it’s a good time to use electricity or not.",

    list: [
      "Avoid peak hours when possible",
      "Delay usage by a few minutes when prices are high",
      "Be aware of morning peak times",
    ],

    conclusion:
      "It’s not about using less — it’s about using electricity at the right time, even for small devices.",

    seoTitle: "Best time to use a coffee machine | BlockPulse",
    seoDescription:
      "Learn when to use your coffee machine to avoid peak electricity prices and reduce your bill.",

    helper:
      "Small devices add up over time — timing makes the difference.",

    likeTitle: "👍 Was this article helpful?",
    likeHelper: "Helps us create better content",
    likeButton: "Helpful",
    likeThanks: "Thanks!",

    cta: "👉 See how it works in 10 seconds",
  },

  fr: {
    back: "← Retour au blog",
    title: "Quand utiliser une machine à café ?",
    intro:
      "Même un petit appareil comme une machine à café peut impacter votre facture — surtout utilisé au mauvais moment.",

    h1: "Une machine à café consomme-t-elle vraiment ?",
    p1:
      "Une machine à café ne consomme pas énormément, mais elle chauffe l’eau très rapidement, ce qui crée des pics de puissance.",
    p2:
      "Utilisée pendant les heures chères, même un petit appareil peut coûter plus que prévu.",

    h2: "Pourquoi le timing reste important",
    p3:
      "Le prix de l’électricité varie selon la demande et la production.",
    p4:
      "Le matin est souvent plus cher car tout le monde utilise ses appareils en même temps.",

    h3: "Une habitude simple pour économiser",
    p5:
      "Un signal simple permet de savoir instantanément si c’est un bon moment pour utiliser l’électricité.",

    list: [
      "Éviter les heures pleines si possible",
      "Décaler de quelques minutes si le prix est élevé",
      "Faire attention aux pics du matin",
    ],

    conclusion:
      "Il ne s’agit pas de consommer moins, mais de consommer au bon moment, même pour les petits appareils.",

    seoTitle: "Meilleur moment pour utiliser une machine à café | BlockPulse",
    seoDescription:
      "Découvrez quand utiliser votre machine à café pour éviter les heures chères et réduire votre facture.",

    helper:
      "Les petits appareils comptent aussi sur le long terme.",

    likeTitle: "👍 Cet article vous a été utile ?",
    likeHelper: "Nous aide à créer du meilleur contenu",
    likeButton: "Utile",
    likeThanks: "Merci !",

    cta: "👉 Voir comment ça marche en 10 secondes",
  },
};

export default function BlogArticle4() {
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

    const saved = localStorage.getItem("blog_liked_4");
    if (saved === "true") setLiked(true);
  }, []);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setLikes((prev) => prev + 1);

    localStorage.setItem("blog_liked_4", "true");

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