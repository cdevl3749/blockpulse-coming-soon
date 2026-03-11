import { useEffect, useState, useRef } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    visitors: 0,
    clickOrder: 0,
    stripeStart: 0,
    paymentSuccess: 0,
    countries: {},
    activeVisitors: 0,
    sources: {
      reddit: 0,
      tiktok: 0,
      direct: 0
    }
  });

  const initialized = useRef(false);

  const lastVisitors = useRef(0);
  const lastClickOrder = useRef(0);
  const lastStripeStart = useRef(0);
  const lastPaymentSuccess = useRef(0);

  const visitorHistory = useRef([]);

  const playCashSound = () => {
    const audio = new Audio("/cha-ching.mp3");
    audio.play();
  };

  const notify = (title, message) => {

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

      new Notification(title, {
        body: message,
        icon: "/favicon.ico"
      });

    }

  };

  const loadStats = async () => {

    try {

      const res = await fetch("/.netlify/functions/stats");
      const data = await res.json();

      if (!initialized.current) {

        lastVisitors.current = data.visitors;
        lastClickOrder.current = data.clickOrder;
        lastStripeStart.current = data.stripeStart;
        lastPaymentSuccess.current = data.paymentSuccess;

        initialized.current = true;

        setStats(data);
        return;

      }

      if (data.visitors > lastVisitors.current) {

        notify(
          "👀 Nouveau visiteur",
          "Quelqu’un vient d’arriver sur blockpulse.be"
        );

        visitorHistory.current.push({
          time: Date.now()
        });

      }

      if (data.clickOrder > lastClickOrder.current) {

        notify(
          "🛒 Intérêt produit",
          "Quelqu’un a cliqué sur Commander"
        );

      }

      if (data.stripeStart > lastStripeStart.current) {

        notify(
          "💳 Paiement commencé",
          "Quelqu’un est arrivé sur Stripe Checkout"
        );

      }

      if (data.paymentSuccess > lastPaymentSuccess.current) {

        playCashSound();

        notify(
          "🎉 Nouvelle vente BlockPulse",
          "Paiement Stripe réussi"
        );

      }

      lastVisitors.current = data.visitors;
      lastClickOrder.current = data.clickOrder;
      lastStripeStart.current = data.stripeStart;
      lastPaymentSuccess.current = data.paymentSuccess;

      setStats(data);

    } catch (err) {

      console.error("Dashboard error:", err);

    }

  };

  const resetStats = async () => {

    if (!confirm("Reset all dashboard stats ?")) return;

    await fetch("/.netlify/functions/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "reset"
      })
    });

    loadStats();

  };

  useEffect(() => {

    if ("Notification" in window) {

      Notification.requestPermission().then(permission => {

        console.log("Notification permission:", permission);

      });

    }

    loadStats();

    const interval = setInterval(loadStats, 2000);

    return () => clearInterval(interval);

  }, []);

  const clickRate = stats.visitors
    ? ((stats.clickOrder / stats.visitors) * 100).toFixed(1)
    : 0;

  const stripeRate = stats.visitors
    ? ((stats.stripeStart / stats.visitors) * 100).toFixed(1)
    : 0;

  const successRate = stats.visitors
    ? ((stats.paymentSuccess / stats.visitors) * 100).toFixed(1)
    : 0;

  const visitorsLast10Min = visitorHistory.current.filter(v =>
    Date.now() - v.time < 600000
  ).length;

  return (

    <div style={{ padding: 40, fontFamily: "Arial", maxWidth: 1200 }}>

      <h1>⚡ Dashboard BlockPulse</h1>

      <div style={{ marginTop: 20, marginBottom: 30 }}>

        <button
          onClick={resetStats}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          🔄 Reset statistiques
        </button>

      </div>

      {/* STATISTIQUES PRINCIPALES */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 25,
        fontSize: 20,
        marginBottom: 40
      }}>

        <div>👀 Visiteurs<br /><b>{stats.visitors}</b></div>

        <div>🟢 Visiteurs actifs<br /><b>{stats.activeVisitors}</b></div>

        <div>🔥 Visiteurs 10 min<br /><b>{visitorsLast10Min}</b></div>

        <div>🛒 Clic Commander<br /><b>{stats.clickOrder}</b></div>

        <div>💳 Arrivés sur Stripe<br /><b>{stats.stripeStart}</b></div>

        <div>✅ Paiements réussis<br /><b>{stats.paymentSuccess}</b></div>

      </div>

      {/* SOURCES TRAFIC */}

      <h2>📊 Sources du trafic</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 30,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 40
      }}>

        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          🔴 Reddit
          <br />
          <b>{stats.sources?.reddit || 0}</b>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          🎵 TikTok
          <br />
          <b>{stats.sources?.tiktok || 0}</b>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          🌐 Direct
          <br />
          <b>{stats.sources?.direct || 0}</b>
        </div>

      </div>

      {/* FUNNEL */}

      <div style={{ marginTop: 40 }}>

        <h2>🔁 Funnel de conversion</h2>

        <p>👀 Visiteurs → {stats.visitors}</p>

        <p>⬇</p>

        <p>🛒 Clic Commander → {stats.clickOrder}</p>

        <p>⬇</p>

        <p>💳 Stripe → {stats.stripeStart}</p>

        <p>⬇</p>

        <p>✅ Paiements → {stats.paymentSuccess}</p>

        <p style={{ marginTop: 20 }}>
          📈 Taux clic: {clickRate}%
        </p>

        <p>
          💳 Taux Stripe: {stripeRate}%
        </p>

        <p>
          🎉 Taux succès: {successRate}%
        </p>

      </div>

      {/* PAYS */}

      <div style={{ marginTop: 40 }}>

        <h2>🌍 Visiteurs par pays</h2>

        {stats.countries && Object.keys(stats.countries).length > 0 ? (

          Object.entries(stats.countries).map(([country, count]) => (

            <p key={country}>
              {country} : {count}
            </p>

          ))

        ) : (

          <p>Aucune donnée pour le moment</p>

        )}

      </div>

    </div>

  );

}