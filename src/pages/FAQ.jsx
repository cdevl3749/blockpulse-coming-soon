import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import energyBg from "../assets/energy.png";

const TEXT = {
  en: {
    back: "← Back to home",
    title: "Frequently Asked Questions",
    intro:
      "Find answers about electricity usage, cheaper times and how to save money at home.",

    q1: "Is electricity cheaper at night?",
    a1: "In many countries, electricity is often cheaper during off-peak hours, usually at night or early morning. However, it depends on demand and supply.",

    q2: "How do I know the best time to use electricity?",
    a2: "Electricity prices change during the day. A simple signal like green, yellow or red helps you instantly understand when it's cheaper.",

    q3: "Do I need an app?",
    a3: "No. A simple visual signal is enough to make better decisions without any app or setup.",

    q4: "Which appliances should I use at the right time?",
    a4: "Washing machines, dishwashers and dryers are the best appliances to shift to cheaper periods.",

    q5: "Does this kind of device control appliances?",
    a5: "No. It only shows the best moment so you can decide yourself.",

    q6: "Is this made for normal households?",
    a6: "Yes. It is designed for everyday use, without technical knowledge or smart home systems.",
  },

  fr: {
    back: "← Retour à l’accueil",
    title: "Questions fréquentes",
    intro:
      "Découvrez quand utiliser l’électricité au meilleur moment et comment économiser simplement.",

    q1: "L’électricité est-elle moins chère la nuit ?",
    a1: "Dans de nombreux pays, l’électricité est souvent moins chère pendant les heures creuses, généralement la nuit ou tôt le matin. Cela dépend toutefois de la demande.",

    q2: "Comment savoir le meilleur moment pour utiliser l’électricité ?",
    a2: "Les prix changent pendant la journée. Un simple signal vert, jaune ou rouge permet de comprendre instantanément.",

    q3: "Faut-il une application ?",
    a3: "Non. Un simple signal visuel suffit, sans application ni configuration.",

    q4: "Quels appareils utiliser au bon moment ?",
    a4: "Les machines à laver, lave-vaisselle et sèche-linge sont les meilleurs appareils à décaler.",

    q5: "Est-ce que l’appareil contrôle les équipements ?",
    a5: "Non. Il indique simplement le bon moment, vous décidez.",

    q6: "Est-ce fait pour les foyers normaux ?",
    a6: "Oui. C’est conçu pour un usage simple, sans système domotique.",
  },

  de: {
    back: "← Zurück zur Startseite",
    title: "Häufige Fragen",
    intro:
      "Erfahren Sie, wann Strom günstiger ist und wie Sie einfach sparen können.",

    q1: "Ist Strom nachts günstiger?",
    a1: "In vielen Ländern ist Strom nachts oder früh morgens günstiger, je nach Nachfrage.",

    q2: "Wie erkenne ich den besten Zeitpunkt?",
    a2: "Strompreise ändern sich im Laufe des Tages. Ein Farbsignal macht es sofort verständlich.",

    q3: "Brauche ich eine App?",
    a3: "Nein. Ein einfaches visuelles Signal reicht völlig aus.",

    q4: "Welche Geräte sollte ich verschieben?",
    a4: "Waschmaschine, Geschirrspüler und Trockner sind ideal.",

    q5: "Steuert das Gerät meine Geräte automatisch?",
    a5: "Nein. Es zeigt nur den besten Zeitpunkt an.",

    q6: "Ist das für normale Haushalte gedacht?",
    a6: "Ja. Es ist für den Alltag ohne Technikkenntnisse gemacht.",
  },

  nl: {
    back: "← Terug naar home",
    title: "Veelgestelde vragen",
    intro:
      "Ontdek wanneer elektriciteit goedkoper is en hoe je eenvoudig kunt besparen.",

    q1: "Is elektriciteit goedkoper 's nachts?",
    a1: "In veel landen is elektriciteit goedkoper tijdens daluren, meestal 's nachts.",

    q2: "Hoe weet ik het beste moment?",
    a2: "De prijs verandert door de dag. Een kleurensignaal maakt het direct duidelijk.",

    q3: "Heb ik een app nodig?",
    a3: "Nee. Een eenvoudig visueel signaal is genoeg.",

    q4: "Welke apparaten moet ik verplaatsen?",
    a4: "Wasmachines, vaatwassers en drogers zijn ideaal.",

    q5: "Stuurt het apparaat automatisch?",
    a5: "Nee. Het toont alleen het beste moment.",

    q6: "Is dit voor gewone huishoudens?",
    a6: "Ja. Het is gemaakt voor eenvoudig dagelijks gebruik.",
  },
};

export default function FAQ() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("fr")) setLang("fr");
    else if (browserLang.startsWith("de")) setLang("de");
    else if (browserLang.startsWith("nl")) setLang("nl");
    else setLang("en");
  }, []);

  const t = TEXT[lang] || TEXT.en;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${energyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="inline-block mb-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow hover:bg-white"
        >
          {t.back}
        </Link>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
          {t.title}
        </h1>

        <p className="mt-3 mb-8 max-w-2xl text-slate-700">
          {t.intro}
        </p>

        {/* FAQ */}
        <div className="space-y-5">

          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white/90 p-5 rounded-2xl shadow">
              <h2 className="font-bold text-slate-900">
                {t["q"+i]}
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                {t["a"+i]}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}