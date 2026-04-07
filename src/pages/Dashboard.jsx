import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const previousDataRef = useRef(null);

  const loadStats = async () => {
    try {
      const res = await fetch("/.netlify/functions/stats");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const resetStats = async () => {
    try {
      await fetch("/.netlify/functions/stats", {
        method: "DELETE",
      });
      await loadStats();
    } catch (error) {
      console.error("Error resetting stats:", error);
    }
  };

  const sendNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    loadStats();

    const interval = setInterval(() => {
      loadStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data) return;

    const previous = previousDataRef.current;

    if (previous) {
      if (data.visitors > previous.visitors) {
        sendNotification("👀 New visitor", `Visitors: ${data.visitors}`);
      }

      if (data.clicks > previous.clicks) {
        sendNotification("🛒 New click", `Clicks: ${data.clicks}`);
      }

      if (data.stripe > previous.stripe) {
        sendNotification("💳 New Stripe visit", `Stripe visits: ${data.stripe}`);
      }
    }

    previousDataRef.current = data;
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-white p-6 text-slate-900">
        <h1 className="text-2xl font-bold">⚡ Dashboard BlockPulse</h1>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">⚡ Dashboard BlockPulse</h1>

          <button
            onClick={resetStats}
            className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
          >
            Reset statistiques
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">👀 Visiteurs</div>
            <div className="mt-2 text-3xl font-bold">{data.visitors}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">🛒 Clic Commander</div>
            <div className="mt-2 text-3xl font-bold">{data.clicks}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">💳 Arrivés sur Stripe</div>
            <div className="mt-2 text-3xl font-bold">{data.stripe}</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">🌍 Pays</h2>

          {Object.keys(data.countries).length === 0 ? (
            <p className="mt-3 text-slate-500">Aucune donnée pour le moment.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {Object.entries(data.countries)
                .sort((a, b) => b[1] - a[1])
                .map(([country, count]) => (
                  <div
                    key={country}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <span className="font-medium">{country}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}