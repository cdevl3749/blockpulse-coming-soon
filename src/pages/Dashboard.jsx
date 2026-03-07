import { useEffect, useState } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0
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

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>BlockPulse Dashboard</h1>

      <div style={{ fontSize: 22, marginTop: 30 }}>
        <p>👀 Visitors: {stats.visitors}</p>
        <p>🛒 Click Order: {stats.clickOrder}</p>
        <p>💳 Stripe Start: {stats.stripeStart}</p>
      </div>
    </div>
  );
}