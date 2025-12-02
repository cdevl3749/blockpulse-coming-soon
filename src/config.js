// Configuration centralisée pour tout le site
export const CONFIG = {
  // Prix de participation
  UNIT_PRICE: 1.99,
  
  // Paramètres du pool
  TOTAL_UNITS: 150, 
  POOL_SHARE_PERCENT: 0.12, 
  
  // Récompense Bitcoin
  BTC_REWARD: 6.25,
  
  // Packs de participation
  PACKS: [
    {
      id: 2,
      units: 3,
      label: "Actif",
      badge: "⚡",
      popular: false,
      savings: null,
      paymentUrl:
      "https://nowpayments.io/payment/?iid=5330255382&success_url=https://blockpulse.be/success&cancel_url=https://blockpulse.be/cancel",
    },
    {
      id: 3,
      units: 5,
      label: "Populaire",
      badge: "🔥",
      popular: true,
      savings: 10,
      paymentUrl:
      "https://nowpayments.io/payment/?iid=4376967664&success_url=https://blockpulse.be/success&cancel_url=https://blockpulse.be/cancel",
    },
    {
      id: 4,
      units: 10,
      label: "Expert",
      badge: "💎",
      popular: false,
      savings: 15,
      paymentUrl:
      "https://nowpayments.io/payment/?iid=6062609238&success_url=https://blockpulse.be/success&cancel_url=https://blockpulse.be/cancel",
    },
    {
      id: 5,
      units: 100,
      label: "Whale",
      badge: "🐋",
      popular: false,
      savings: 25,
      vip: true,
      paymentUrl:
      "https://nowpayments.io/payment/?iid=5631323952&success_url=https://blockpulse.be/success&cancel_url=https://blockpulse.be/cancel",
    }
  ],

  getPackPrice(units, savings = null) {
    const basePrice = units * this.UNIT_PRICE;
    if (savings) {
      return (basePrice * (1 - savings / 100)).toFixed(2);
    }
    return basePrice.toFixed(2);
  },
  
  getPotentialGainPerUnit(btcPrice) {
    if (!btcPrice) return null;
    return ((btcPrice * this.BTC_REWARD * this.POOL_SHARE_PERCENT / 100) / this.TOTAL_UNITS).toFixed(2);
  }
};

export default CONFIG;
