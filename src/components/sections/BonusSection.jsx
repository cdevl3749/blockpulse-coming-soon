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
        <h2>Bonus technique &amp; tirages BlockPulse</h2>

        <p className="bp-section-intro">
          Lorsqu’un événement technique survient sur le pool ViaBTC 
          (découverte d’un bloc, modification de difficulté, nouvelle série de jobs),
          un <strong>tirage BlockPulse</strong> peut être déclenché.  
          Un bonus crypto symbolique est alors distribué à un participant,
          selon le nombre de parts qu’il possède.
        </p>

        <div className="bp-grid-2">

          {/* Bloc Bitcoin */}
          <div className="bp-card bp-card-gradient">
            <h3>💰 Récompense d&apos;un bloc Bitcoin</h3>

            <p className="bp-big-number">
              {CONFIG.BTC_REWARD} BTC
            </p>

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
              Lorsque le pool ViaBTC découvre un bloc, cela constitue un 
              <strong>événement technique majeur</strong>.  
              BlockPulse ne reçoit pas cette récompense : elle sert uniquement 
              de <strong>référence pédagogique</strong> pour visualiser la valeur 
              d’un bloc et contextualiser les tirages.
            </p>
          </div>

          {/* Bonus par unité */}
          <div className="bp-card">
            <h3>🎯 Exemple de bonus lors d&apos;un tirage</h3>

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
                Exemple basé sur un bloc de 6,25 BTC
              </p>

              {rewardEUR && (
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#c9d4e5",
                    margin: "0 0 12px 0",
                    lineHeight: "1.5",
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
                  lineHeight: "1.2",
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
                bonus symbolique par part, lors d’un tirage BlockPulse
              </p>
            </div>

            <p style={{ marginBottom: "16px", textAlign: "center" }}>
              Plus vous avez de parts, plus vos chances d’être sélectionné 
              lors d&apos;un tirage sont importantes.
            </p>

            {/* Estimation */}
            <div
              style={{
                background: "rgba(255, 200, 100, 0.08)",
                borderLeft: "3px solid #ffc866",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  margin: "0",
                  color: "#c9d4e5",
                }}
              >
                📊 <strong style={{ color: "#ffc866" }}>Exemple basé sur :</strong>{" "}
                {CONFIG.TOTAL_UNITS} parts totales et{" "}
                {CONFIG.POOL_SHARE_PERCENT}% de référence pédagogique.  
                Ce calcul est illustratif et ne constitue pas un rendement.
              </p>
            </div>

            {/* Exemples de packs */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 255, 200, 0.15), rgba(91, 140, 255, 0.15))",
                border: "2px solid rgba(0, 255, 200, 0.4)",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#ffffff",
                  marginBottom: "10px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                💰 Exemples de bonus par pack (tirage)
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(0, 255, 200, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "0.85rem",
                      color: "#a8b2d8",
                    }}
                  >
                    Pack Actif (3 parts)
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#00ffc8",
                    }}
                  >
                    {potentialGainPerUnit
                      ? `${(parseFloat(potentialGainPerUnit) * 3).toFixed(2)} €`
                      : "..."}
                  </p>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(0, 255, 200, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "0.85rem",
                      color: "#a8b2d8",
                    }}
                  >
                    Pack Populaire (5 parts)
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#00ffc8",
                    }}
                  >
                    {potentialGainPerUnit
                      ? `${(parseFloat(potentialGainPerUnit) * 5).toFixed(2)} €`
                      : "..."}
                  </p>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(0, 255, 200, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "0.85rem",
                      color: "#a8b2d8",
                    }}
                  >
                    Pack Expert (10 parts)
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#00ffc8",
                    }}
                  >
                    {potentialGainPerUnit
                      ? `${(parseFloat(potentialGainPerUnit) * 10).toFixed(2)} €`
                      : "..."}
                  </p>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(255, 215, 0, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "0.85rem",
                      color: "#ffd966",
                    }}
                  >
                    Pack Whale (100 parts)
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#ffd700",
                    }}
                  >
                    {potentialGainPerUnit
                      ? `${(parseFloat(potentialGainPerUnit) * 100).toFixed(2)} €`
                      : "..."}
                  </p>
                </div>
              </div>
            </div>

            <p
              className="bp-hero-small"
              style={{
                fontSize: "0.82rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "14px",
                marginTop: "16px",
              }}
            >
              ⚠️ <strong>Expérience crypto expérimentale :</strong>  
              Les bonus sont symboliques et liés aux tirages BlockPulse déclenchés 
              lors d&apos;événements techniques du pool ViaBTC.  
              Les récompenses ne sont pas garanties.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
