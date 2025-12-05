// -----------------------------------------
// CONFIGURATION GLOBALE BLOCKPULSE
// -----------------------------------------

const CONFIG = {
  // 💶 Prix de base : 1 unité = 1 €
  UNIT_PRICE: 1.0,

  // ⚙️ Données techniques pour le calcul des bonus estimés
  BTC_REWARD: 6.25,               // Récompense d’un bloc
  POOL_SHARE_PERCENT: 1,          // Exemple pédagogique
  TOTAL_UNITS: 5000,              // Valeur réaliste et motivante

  // -----------------------------------------
  // 🧩 Packs disponibles
  // -----------------------------------------
  PACKS: [
    {
      id: 1,
      label: "Micro",
      units: 1,
      savings: 0,
      badge: "⚡",
      popular: false,
      vip: false,
    },
    {
      id: 2,
      label: "Starter",
      units: 5,
      savings: 20,
      badge: "🚀",
      popular: true,
      vip: false,
    },
    {
      id: 3,
      label: "Boost",
      units: 10,
      savings: 30,
      badge: "🔥",
      popular: false,
      vip: false,
    },
    {
      id: 4,
      label: "Pro",
      units: 20,
      savings: 25,
      badge: "💼",
      popular: false,
      vip: false,
    },
    {
      id: 5,
      label: "Whale",
      units: 50,
      savings: 30,
      badge: "🐋",
      popular: false,
      vip: true,
    },
  ],

  // -----------------------------------------
  // 💰 Calcul du prix final (réduction incluse)
  // -----------------------------------------
  getPackPrice(units, savings = null) {
    const basePrice = units * this.UNIT_PRICE;

    if (savings) {
      return (basePrice * (1 - savings / 100)).toFixed(2);
    }
    return basePrice.toFixed(2);
  },

  // -----------------------------------------
  // 🎁 Bonus symbolique estimé par unité
  // -----------------------------------------
  getPotentialGainPerUnit(btcPrice) {
    if (!btcPrice) return null;

    return (
      ((btcPrice * this.BTC_REWARD * this.POOL_SHARE_PERCENT) / 100) /
      this.TOTAL_UNITS
    ).toFixed(2);
  }
};

export default CONFIG;
