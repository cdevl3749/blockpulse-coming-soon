import { useEffect, useState } from "react";
import CONFIG from "../../config";

export default function BonusSection() {
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://blockchain.info/ticker");
        const json = await res.json();
        setBtcPrice(json.EUR.last);
      } catch (err) {
        console.log("Erreur BTC:", err);
      }
    }

    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const rewardEUR = btcPrice
    ? (btcPrice * CONFIG.BTC_REWARD).toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : null;

  const potentialGainPerUnit = CONFIG.getPotentialGainPerUnit(btcPrice);

  return (
    <section className="bp-section bp-section-alt">
      <div className="bp-container">
        <h2>Bonus techniques & tirages BlockPulse</h2>

        <p className="bp-section-intro">
          Le nœud BlockPulse réagit en temps réel à l’activité du pool ViaBTC.
          Lorsqu’un événement technique majeur survient (nouveau job, activité élevée,
          découverte d’un bloc…), un <strong>tirage technique</strong> peut être déclenché.
        </p>

        <p className="bp-section-intro">
          Deux types de tirages existent :
        </p>

        <ul className="bp-list" style={{ marginBottom: "32px" }}>
          <li>
            💠 <strong>Tirage classique :</strong> un petit bonus symbolique basé sur
            les événements normaux du pool.
          </li>
          <li>
            🔥 <strong>Tirage spécial “Bloc Trouvé” :</strong> lorsqu’un bloc est
            découvert par ViaBTC, un tirage exceptionnel peut être déclenché avec
            un bonus <strong>plus important</strong>. Un événement rare et très attendu.
          </li>
        </ul>

        <div className="bp-grid-2">

          {/* Bloc Bitcoin */}
          <div className="bp-card bp-card-gradient">
            <h3>💰 Récompense d'un bloc Bitcoin</h3>

            <p className="bp-big-number">{CONFIG.BTC_REWARD} BTC</p>

            {rewardEUR && (
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  marginTop: "-10px",
                  marginBottom: "12px",
                  color: "#ffffff",
                  opacity: 0.85,
                }}
              >
                ≈ {rewardEUR} €
              </p>
            )}

            <p>
              Lorsqu’un bloc est découvert, le pool ViaBTC le signale immédiatement.
              BlockPulse utilise cet instant pour lancer un{" "}
              <strong>tirage spécial “Bloc Trouvé”</strong>.  
              Les bonus restent symboliques, mais peuvent être plus élevés
              qu’un tirage classique.
            </p>

            {/* Bloc Confiance – Témoignages courts */}
        <div
          style={{
            marginTop: "22px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "14px 16px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#a8c6ff",
            }}
          >
            💬 Ce que disent les utilisateurs
          </p>

          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "0.85rem",
              color: "#d8e0f5",
              opacity: 0.9,
            }}
          >
            “Très intéressant de voir l’activité réelle du réseau Bitcoin.”
          </p>

          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "0.85rem",
              color: "#d8e0f5",
              opacity: 0.9,
            }}
          >
            “Le système réagit en temps réel à l’activité du réseau, c’est très instructif à regarder.”
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#d8e0f5",
              opacity: 0.9,
            }}
          >
            “Super pédagogique pour comprendre le mining.”
          </p>
        </div>

          </div>

          {/* Bonus par unité */}
          <div className="bp-card">
            <h3>🎯 Bonus lors d'un tirage classique</h3>

            <div
              style={{
                background: "rgba(0, 255, 200, 0.08)",
                border: "2px solid rgba(0, 255, 200, 0.3)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#a8b2d8",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "600",
                }}
              >
                Illustration pédagogique
              </p>

              {rewardEUR && (
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#c9d4e5",
                    margin: "0 0 12px 0",
                  }}
                >
                  Valeur actuelle du BTC :{" "}
                  <strong style={{ color: "#ffd966" }}>{rewardEUR} €</strong>
                </p>
              )}

              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  color: "#00ffc8",
                  margin: "8px 0",
                }}
              >
                {potentialGainPerUnit
                  ? `${potentialGainPerUnit} €`
                  : "Calcul..."}
              </p>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#70c3ff",
                  marginTop: "6px",
                  marginBottom: "0",
                }}
              >
                bonus symbolique par part
              </p>
            </div>

            <p style={{ marginBottom: "16px", textAlign: "center" }}>
              Chaque part = 1 ticket.  
              Plus vous possédez de parts, plus vos chances d’être tiré au sort augmentent.
            </p>

            {/* Encadré pédagogique */}
            <div
              style={{
                background: "rgba(255, 200, 100, 0.08)",
                borderLeft: "3px solid #ffc866",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  margin: "0",
                  color: "#c9d4e5",
                }}
              >
                📊 Illustration basée sur {CONFIG.TOTAL_UNITS} parts totales et{" "}
                {CONFIG.POOL_SHARE_PERCENT}% de partage pédagogique.
              </p>
            </div>

            {/* Tirage Bloc Trouvé */}
            <div
              style={{
                background: "rgba(255, 140, 50, 0.1)",
                border: "1px solid rgba(255,140,50,0.3)",
                padding: "18px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ margin: "0 0 8px", color: "#ffb45c" }}>
                🔥 Tirage spécial “Bloc Trouvé”
              </h4>
              <p style={{ margin: 0, color: "#e6e6e6", fontSize: "0.9rem" }}>
                Lorsqu’un bloc Bitcoin est détecté, un tirage exceptionnel peut
                être déclenché avec un bonus <strong>nettement plus élevé</strong>.  
                C’est un événement rare lié à une vraie activité du réseau.
              </p>
            </div>

            {/* Disclaimer */}
            <p
              className="bp-hero-small"
              style={{
                fontSize: "0.82rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "14px",
                marginTop: "16px",
              }}
            >
              ⚠️ Expérience crypto expérimentale.  
              Les bonus (classiques ou spéciaux) sont symboliques et non garantis.
              Aucun rendement financier n’est promis.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

