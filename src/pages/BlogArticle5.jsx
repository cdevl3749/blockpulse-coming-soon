import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to blog",
    title: "Cheapest time to use electricity in the Netherlands",
    intro:
      "In the Netherlands, electricity costs are not always about using less — timing and daily habits also matter more than most people think.",

    h1: "Is electricity always cheaper at night in the Netherlands?",
    p1:
      "Not necessarily. Many people still think night-time is always cheaper, but today it often depends on your supplier, contract, solar setup and daily demand.",
    p2:
      "That is why many households end up using electricity by habit, not because it is actually the cheapest moment.",

    h2: "What usually increases your bill?",
    p3:
      "It is often not one single appliance. The real difference usually comes from several things happening at the same time.",
    p4:
      "Heating, washing machine, dishwasher, dryer, coffee machine and charging devices can create short expensive peaks during the day.",

    h3: "Why people usually get this wrong",
    p5:
      "Most people do not want to check apps, tariffs or live prices every time they use electricity.",
    p6:
      "So they fall back to routine: morning, evening or whenever it is convenient. That makes daily life easier, but not always cheaper.",

    h4: "A simpler way to think about it",
    p7:
      "Instead of trying to predict the perfect hour, it helps to know in real time whether the current moment looks cheap, normal or expensive.",
    p8:
      "That is usually much easier than constantly checking prices or guessing.",

    conclusion:
      "In the Netherlands, the cheapest moment to use electricity depends on your setup — but the biggest mistake is assuming your usual habit is always the best one.",

    helper:
      "Small daily timing mistakes can quietly increase your electricity bill over time.",

    cta: "Want to see how BlockPulse works?",
    likeTitle: "Was this article useful?",
    likeButton: "Yes, helpful",
    likeThanks: "Thanks!",
    likeHelper: "A small click helps us improve future articles.",

    seoTitle:
      "Cheapest time to use electricity in the Netherlands | BlockPulse",
    seoDescription:
      "Learn when electricity is usually cheapest in the Netherlands and why daily timing habits can quietly increase your bill.",
  },

  fr: {
    back: "← Retour au blog",
    title: "Quand l’électricité est-elle la moins chère aux Pays-Bas ?",
    intro:
      "Aux Pays-Bas, la facture d’électricité ne dépend pas seulement de la quantité utilisée — le moment d’utilisation compte aussi beaucoup plus que la plupart des gens ne le pensent.",

    h1: "L’électricité est-elle toujours moins chère la nuit aux Pays-Bas ?",
    p1:
      "Pas forcément. Beaucoup pensent encore que la nuit est toujours moins chère, mais aujourd’hui cela dépend souvent du fournisseur, du contrat, du solaire et de la demande.",
    p2:
      "C’est pour cela que beaucoup de foyers utilisent l’électricité par habitude, pas parce que c’est réellement le meilleur moment.",

    h2: "Qu’est-ce qui augmente généralement la facture ?",
    p3:
      "Ce n’est souvent pas un seul appareil. La vraie différence vient généralement de plusieurs appareils utilisés en même temps.",
    p4:
      "Le chauffage, la machine à laver, le lave-vaisselle, le sèche-linge, la machine à café et les appareils en charge peuvent créer des pics coûteux.",

    h3: "Pourquoi beaucoup de gens se trompent",
    p5:
      "La plupart des gens n’ont pas envie de vérifier une appli, un tarif ou un prix en direct à chaque utilisation.",
    p6:
      "Ils reviennent donc à leurs habitudes : matin, soir ou quand c’est pratique. C’est plus simple au quotidien, mais pas toujours moins cher.",

    h4: "Une façon plus simple de voir les choses",
    p7:
      "Au lieu d’essayer de deviner l’heure parfaite, il est plus utile de savoir en temps réel si le moment actuel semble bon, normal ou cher.",
    p8:
      "C’est généralement beaucoup plus simple que vérifier les prix en permanence ou deviner.",

    conclusion:
      "Aux Pays-Bas, le moment le moins cher dépend de votre situation — mais la plus grosse erreur est de croire que vos habitudes sont toujours optimales.",

    helper:
      "De petites erreurs quotidiennes de timing peuvent augmenter discrètement votre facture sur le long terme.",

    cta: "Envie de voir comment fonctionne BlockPulse ?",
    likeTitle: "Cet article vous a-t-il été utile ?",
    likeButton: "Oui, utile",
    likeThanks: "Merci !",
    likeHelper: "Un petit clic nous aide à améliorer les prochains articles.",

    seoTitle:
      "Quand l’électricité est-elle la moins chère aux Pays-Bas ? | BlockPulse",
    seoDescription:
      "Découvrez quand l’électricité est généralement la moins chère aux Pays-Bas et pourquoi vos habitudes quotidiennes peuvent augmenter votre facture.",
  },

  de: {
    back: "← Zurück zum Blog",
    title: "Wann ist Strom in den Niederlanden am günstigsten?",
    intro:
      "In den Niederlanden geht es bei Stromkosten nicht nur um den Verbrauch — auch der Zeitpunkt spielt oft eine größere Rolle als gedacht.",

    h1: "Ist Strom in den Niederlanden nachts immer günstiger?",
    p1:
      "Nicht unbedingt. Viele denken immer noch, dass Nachtstrom automatisch günstiger ist, aber heute hängt das oft vom Anbieter, Tarif, Solarstrom und der Nachfrage ab.",
    p2:
      "Deshalb nutzen viele Haushalte Strom eher aus Gewohnheit als zum wirklich günstigsten Zeitpunkt.",

    h2: "Was erhöht die Rechnung meistens?",
    p3:
      "Oft ist es nicht nur ein einzelnes Gerät. Der echte Unterschied entsteht meist dann, wenn mehrere Dinge gleichzeitig laufen.",
    p4:
      "Heizung, Waschmaschine, Geschirrspüler, Trockner, Kaffeemaschine und Ladegeräte können kurze teure Spitzen verursachen.",

    h3: "Warum sich viele hier irren",
    p5:
      "Die meisten Menschen möchten nicht jedes Mal Apps, Tarife oder Live-Preise prüfen, bevor sie Strom nutzen.",
    p6:
      "Deshalb greifen sie auf Gewohnheiten zurück: morgens, abends oder einfach dann, wenn es praktisch ist. Das ist bequem, aber nicht immer günstig.",

    h4: "Ein einfacherer Ansatz",
    p7:
      "Statt die perfekte Uhrzeit erraten zu wollen, hilft es mehr, in Echtzeit zu sehen, ob der aktuelle Moment günstig, normal oder teuer ist.",
    p8:
      "Das ist meist viel einfacher, als ständig Preise zu prüfen oder zu raten.",

    conclusion:
      "In den Niederlanden hängt die günstigste Stromzeit von Ihrer Situation ab — aber der größte Fehler ist anzunehmen, dass Ihre Gewohnheiten automatisch optimal sind.",

    helper:
      "Kleine tägliche Timing-Fehler können Ihre Stromrechnung mit der Zeit still erhöhen.",

    cta: "Möchten Sie sehen, wie BlockPulse funktioniert?",
    likeTitle: "War dieser Artikel hilfreich?",
    likeButton: "Ja, hilfreich",
    likeThanks: "Danke!",
    likeHelper: "Ein kleiner Klick hilft uns, kommende Artikel zu verbessern.",

    seoTitle: "Wann ist Strom in den Niederlanden am günstigsten? | BlockPulse",
    seoDescription:
      "Erfahren Sie, wann Strom in den Niederlanden meist am günstigsten ist und warum tägliche Gewohnheiten Ihre Rechnung erhöhen können.",
  },

  nl: {
    back: "← Terug naar blog",
    title: "Wanneer is elektriciteit het goedkoopst in Nederland?",
    intro:
      "In Nederland gaat een hoge energierekening niet alleen over hoeveel stroom je gebruikt — ook het moment waarop je die gebruikt speelt vaak een grotere rol dan mensen denken.",

    h1: "Is elektriciteit in Nederland altijd goedkoper 's nachts?",
    p1:
      "Niet altijd. Veel mensen denken nog steeds dat stroom 's nachts automatisch goedkoper is, maar vandaag hangt dat vaak af van je leverancier, contract, zonnepanelen en de algemene vraag.",
    p2:
      "Daardoor gebruiken veel huishoudens elektriciteit vooral uit gewoonte, niet omdat het echt het goedkoopste moment is.",

    h2: "Wat verhoogt je factuur meestal?",
    p3:
      "Vaak is het niet één enkel toestel. Het echte verschil ontstaat meestal wanneer meerdere toestellen tegelijk actief zijn.",
    p4:
      "Verwarming, wasmachine, vaatwasser, droogkast, koffiemachine en opladers kunnen samen korte maar dure pieken veroorzaken.",

    h3: "Waarom veel mensen dit verkeerd inschatten",
    p5:
      "De meeste mensen willen niet telkens apps, contracten of live prijzen checken voordat ze iets aanzetten.",
    p6:
      "Daardoor vallen ze terug op routine: ’s morgens, ’s avonds of gewoon wanneer het uitkomt. Dat is logisch, maar niet altijd het goedkoopst.",

    h4: "Een eenvoudigere manier om ernaar te kijken",
    p7:
      "In plaats van het perfecte uur te raden, helpt het veel meer om in realtime te weten of het huidige moment goedkoop, normaal of duur is.",
    p8:
      "Dat is meestal veel eenvoudiger dan constant prijzen checken of gokken.",

    conclusion:
      "In Nederland hangt het goedkoopste moment af van je situatie — maar de grootste fout is denken dat je vaste gewoonte automatisch de beste keuze is.",

    helper:
      "Kleine dagelijkse timingfouten kunnen je energiefactuur ongemerkt verhogen.",

    cta: "Wil je zien hoe BlockPulse werkt?",
    likeTitle: "Was dit artikel nuttig?",
    likeButton: "Ja, nuttig",
    likeThanks: "Bedankt!",
    likeHelper: "Een kleine klik helpt ons om toekomstige artikels te verbeteren.",

    seoTitle:
      "Wanneer is elektriciteit het goedkoopst in Nederland? | BlockPulse",
    seoDescription:
      "Ontdek wanneer elektriciteit in Nederland meestal het goedkoopst is en waarom dagelijkse gewoontes je factuur ongemerkt verhogen.",
  },
};

export default function BlogArticle5() {
  const [lang, setLang] = useState("en");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();

    if (browserLang.startsWith("fr")) setLang("fr");
    else if (browserLang.startsWith("de")) setLang("de");
    else if (browserLang.startsWith("nl")) setLang("nl");
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
    fetch("/.netlify/functions/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogLikes) setLikes(data.blogLikes);
      })
      .catch(() => {});
  }, []);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);

    try {
      await fetch("/.netlify/functions/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "blog_like" }),
      });
    } catch {
      // ignore
    }
  };

  const goToProduct = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${energyBg})` }}
        />
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow transition hover:bg-white"
          >
            {t.back}
          </Link>

          <div className="mt-6">
            <h1 className="max-w-4xl text-4xl font-extrabold text-emerald-950 sm:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-emerald-900">{t.h1}</h2>
        <p className="mt-4 text-lg text-slate-700">{t.p1}</p>
        <p className="mt-4 text-lg text-slate-700">{t.p2}</p>

        <h2 className="mt-10 text-3xl font-bold text-emerald-900">{t.h2}</h2>
        <p className="mt-4 text-lg text-slate-700">{t.p3}</p>
        <p className="mt-4 text-lg text-slate-700">{t.p4}</p>

        <h2 className="mt-10 text-3xl font-bold text-emerald-900">{t.h3}</h2>
        <p className="mt-4 text-lg text-slate-700">{t.p5}</p>
        <p className="mt-4 text-lg text-slate-700">{t.p6}</p>

        <h2 className="mt-10 text-3xl font-bold text-emerald-900">{t.h4}</h2>
        <p className="mt-4 text-lg text-slate-700">{t.p7}</p>
        <p className="mt-4 text-lg text-slate-700">{t.p8}</p>

        <p className="mt-10 text-xl font-semibold text-emerald-900">
          {t.conclusion}
        </p>

        <p className="mt-6 text-sm text-slate-600">{t.helper}</p>

        <div className="mt-6 text-center">
          <button
            onClick={goToProduct}
            className="text-emerald-700 font-semibold underline hover:text-emerald-900"
          >
            {t.cta}
          </button>
        </div>

        <div className="mt-10 rounded-xl border p-6 text-center">
          <p className="mb-2 text-sm text-slate-500">{t.likeHelper}</p>

          {likes > 0 && (
            <p className="mb-2 text-xs text-slate-500">
              {lang === "fr"
                ? `${likes} personnes trouvent cela utile`
                : lang === "nl"
                ? `${likes} mensen vonden dit nuttig`
                : lang === "de"
                ? `${likes} Personen fanden das hilfreich`
                : `${likes} people found this helpful`}
            </p>
          )}

          <p className="mb-3 font-semibold text-emerald-900">{t.likeTitle}</p>

          <button
            onClick={handleLike}
            disabled={liked}
            className={`rounded-full px-5 py-2 font-semibold text-white ${
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