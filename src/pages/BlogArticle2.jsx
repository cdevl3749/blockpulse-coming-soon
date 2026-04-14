import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to blog",
    title: "Best time to run a washing machine",
    intro:
      "Using your washing machine at the right time can help you reduce your electricity bill without changing your routine.",

    h1: "When is the best time to run a washing machine?",
    p1:
      "The best time is during off-peak hours, usually late at night or early morning.",
    p2:
      "Electricity is more expensive in the evening when demand is high.",

    h2: "Why timing matters",
    p3:
      "Washing machines use a lot of energy. Running them when electricity is cheaper can significantly reduce your costs.",
    p4:
      "This is especially true if you use hot water cycles.",

    h3: "Simple tips to save money",
    p5:
      "You can reduce your electricity usage with a few simple habits:",

    list: [
      "Run your washing machine at night",
      "Avoid peak hours (17:00 – 21:00)",
      "Use eco mode when possible",
    ],

    conclusion:
      "A small change in timing can lead to real savings over time.",

    seoTitle: "Best time to run a washing machine | BlockPulse",
    seoDescription:
      "Discover when to use your washing machine to save electricity and reduce your bill.",

    helper:
      "Most people use their washing machine at the wrong time without knowing it.",

    likeTitle: "👍 This article was helpful?",
    likeHelper: "Helps us create better content",
    likeButton: "Helpful",
    likeThanks: "Thanks!",

    cta: "👉 See how it works in 10 seconds",
  },

  fr: {
    back: "← Retour au blog",
    title: "Meilleur moment pour utiliser la machine à laver",
    intro:
      "Utiliser votre machine à laver au bon moment permet de réduire votre facture sans changer vos habitudes.",

    h1: "Quand lancer une machine à laver ?",
    p1:
      "Le meilleur moment est pendant les heures creuses, souvent la nuit ou tôt le matin.",
    p2:
      "L’électricité est plus chère en soirée lorsque la demande est forte.",

    h2: "Pourquoi le moment est important",
    p3:
      "Les machines consomment beaucoup d’énergie. Les utiliser au bon moment permet de faire des économies.",
    p4:
      "C’est encore plus vrai avec les cycles à chaud.",

    h3: "Conseils simples",
    p5:
      "Quelques habitudes suffisent :",

    list: [
      "Lancer la machine la nuit",
      "Éviter 17h – 21h",
      "Utiliser le mode éco",
    ],

    conclusion:
      "Un petit changement peut faire une vraie différence.",

    seoTitle: "Meilleur moment machine à laver | BlockPulse",
    seoDescription:
      "Découvrez quand utiliser votre machine pour économiser de l’électricité.",

    helper:
      "Beaucoup de personnes utilisent leur machine au mauvais moment.",

    likeTitle: "👍 Cet article vous a été utile ?",
    likeHelper: "Nous aide à créer du meilleur contenu",
    likeButton: "Utile",
    likeThanks: "Merci !",

    cta: "👉 Voir comment ça marche en 10 secondes",
  },
};

export default function BlogArticle2() {
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

  // LOAD LIKES
  useEffect(() => {
    fetch("/.netlify/functions/stat")
      .then(res => res.json())
      .then(data => {
        const count = data.blogLikes || 0;
        setLikes(count);
      })
      .catch(() => {});

    const saved = localStorage.getItem("blog_liked_2");
    if (saved === "true") setLiked(true);
  }, []);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setLikes(prev => prev + 1);

    localStorage.setItem("blog_liked_2", "true");

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