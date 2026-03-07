import { useEffect, useState } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0,
    countries: {},
    activeVisitors: 0
  });

  const loadStats = async () => {
    const res = await fetch("/.netlify/functions/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 5000);

    return () => clearInterval(interval);
  }, []);

  // 📊 Calcul conversion
  const clickRate = stats.visitors
    ? ((stats.clickOrder / stats.visitors) * 100).toFixed(1)
    : 0;

  const stripeRate = stats.visitors
    ? ((stats.stripeStart / stats.visitors) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>BlockPulse Dashboard</h1>

      <div style={{ fontSize: 22, marginTop: 30 }}>
        <p>👀 Visitors: {stats.visitors}</p>

        <p>🟢 Active visitors: {stats.activeVisitors}</p>

        <p>🛒 Click Order: {stats.clickOrder}</p>
        <p>💳 Stripe Start: {stats.stripeStart}</p>

        <p style={{ marginTop: 20 }}>
          📈 Click rate: {clickRate}%
        </p>

        <p>
          💰 Stripe rate: {stripeRate}%
        </p>
      </div>

      {/* 🌍 Pays */}
      <div style={{ marginTop: 40 }}>
        <h2>🌍 Visitors by country</h2>

        {stats.countries && Object.keys(stats.countries).length > 0 ? (
          Object.entries(stats.countries).map(([country, count]) => (
            <p key={country}>
              {country} : {count}
            </p>
          ))
        ) : (
          <p>No country data yet</p>
        )}
      </div>

    </div>
  );
}