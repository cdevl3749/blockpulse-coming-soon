import { useEffect, useState } from "react";

export default function SocialProof() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // ⚠️ Données totalement anonymisées / fictives
    const FAKE_DATA = [
      { id: 1, name: "Alex B.", pack: "Pack Starter", time: "il y a 12 min" },
      { id: 2, name: "Simon G.", pack: "Pack Micro", time: "il y a 1 h" },
      { id: 3, name: "Johanna P.", pack: "Pack Boost", time: "hier" },
    ];

    setEntries(FAKE_DATA);
  }, []);

  return (
    <section
      className="bp-section"
      style={{
        marginTop: "8px",
        marginBottom: "0px",   // 🔥 Zero marge en bas
        paddingBottom: "0px",  // 🔥 Supprime tout espace intégré
      }}
    >

      <div className="bp-container">
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            background: "rgba(5, 32, 52, 0.95)",
            borderRadius: "18px",
            border: "1px solid rgba(0, 255, 180, 0.25)",
            padding: "20px 24px",
            boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: "1.1rem",
              color: "#00ffc8",
              fontWeight: 600,
            }}
          >
            ✔️ Dernières participations
          </h3>

          {entries.map((e) => (
            <p
              key={e.id}
              style={{
                margin: "6px 0",
                color: "#d8eafe",
                fontSize: "0.95rem",
              }}
            >
              <strong>{e.name}</strong> vient de prendre un{" "}
              <strong>{e.pack}</strong> —{" "}
              <span style={{ color: "#8ab9ff" }}>{e.time}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
