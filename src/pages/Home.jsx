import Hero from "../components/sections/Hero.jsx";
import HowItWorks from "../components/sections/HowItWorks.jsx";
import BonusSection from "../components/sections/BonusSection.jsx";
import RealtimeESP from "../components/RealtimeESP.jsx";
import Participation from "../components/sections/Participation.jsx";
import FAQ from "../components/sections/FAQ.jsx";

import RealProjectBadge from "../components/RealProjectBadge.jsx";
import SocialProof from "../components/SocialProof.jsx";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 🔥 Badge “Projet réel” */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "18px",
        }}
      >
        <RealProjectBadge />
      </div>

      {/* ⭐ Preuve sociale */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SocialProof />
      </div>

      <HowItWorks />
      <BonusSection />
      <RealtimeESP />
      <Participation />
      <FAQ />
    </>
  );
}
