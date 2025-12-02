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
  const profitPercent = potentialGainPerUnit
    ? ((parseFloat(potentialGainPerUnit) / CONFIG.UNIT_PRICE) * 100).toFixed(0)
    : null;

  return (
    <section className="bp-section bp-section-alt">
      <div className="bp-container">
        <h2>Bonus potentiel du pool Bitcoin</h2>
        <p className="bp-section-intro">
          Le prix du Bitcoin évolue en permanence. Si le pool ViaBTC trouve un
          bloc, une partie de la récompense peut être reversée à BlockPulse
          pour être partagée proportionnellement entre les contributeurs.
        </p>

        <div className="bp-grid-2">
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
              À cette récompense s&apos;ajoutent les frais de transaction du
              bloc. BlockPulse ne reçoit qu&apos;une fraction éventuelle via le
              pool de minage, qui est ensuite répartie entre les unités de
              contribution.
            </p>
          </div>

          <div className="bp-card">
            <h3>💎 Votre gain potentiel par pack</h3>
            
            <div style={{
              background: "rgba(0, 255, 200, 0.08)",
              border: "2px solid rgba(0, 255, 200, 0.3)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <p style={{ 
                fontSize: "0.9rem", 
                color: "#a8b2d8", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: "600"
              }}>
                🎯 Si un bloc de 6,25 BTC est trouvé
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#c9d4e5",
                margin: "0 0 12px 0",
                lineHeight: "1.5"
              }}>
                {rewardEUR && (
                  <span>Valeur du bloc : <strong style={{ color: "#ffd966" }}>{rewardEUR} €</strong></span>
                )}
              </p>
              <p style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                color: "#00ffc8",
                margin: "8px 0",
                lineHeight: "1.2"
              }}>
                {potentialGainPerUnit ? `${potentialGainPerUnit} €` : "Calcul..."}
              </p>
              <p style={{
                fontSize: "0.85rem",
                color: "#70c3ff",
                marginTop: "6px",
                marginBottom: "0"
              }}>
                par unité de contribution
              </p>
            </div>

            <p style={{ marginBottom: "16px", textAlign: "center" }}>
              Plus vous avez d&apos;unités, plus votre part du bonus sera importante !
            </p>

            <div style={{
              background: "rgba(255, 200, 100, 0.08)",
              borderLeft: "3px solid #ffc866",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px"
            }}>
              <p style={{ 
                fontSize: "0.85rem", 
                margin: "0",
                color: "#c9d4e5"
              }}>
                📊 <strong style={{ color: "#ffc866" }}>Estimation basée sur :</strong>{" "}
                {CONFIG.TOTAL_UNITS} participants actifs et {CONFIG.POOL_SHARE_PERCENT}% de part du bloc. 
                Ces valeurs peuvent varier selon la performance du pool et le nombre réel de contributeurs.
              </p>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(0, 255, 200, 0.15), rgba(91, 140, 255, 0.15))",
              border: "2px solid rgba(0, 255, 200, 0.4)",
              borderRadius: "12px",
              padding: "18px",
              marginBottom: "16px"
            }}>
              <p style={{ 
                fontSize: "1rem", 
                color: "#ffffff", 
                marginBottom: "10px",
                fontWeight: "600",
                textAlign: "center"
              }}>
                💰 Exemples de gains par pack
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                <div style={{ textAlign: "center", padding: "10px", background: "rgba(0, 255, 200, 0.05)", borderRadius: "8px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#a8b2d8" }}>Pack Actif (3 unités)</p>
                  <p style={{ margin: "0", fontSize: "1.3rem", fontWeight: "700", color: "#00ffc8" }}>
                    {potentialGainPerUnit ? `${(parseFloat(potentialGainPerUnit) * 3).toFixed(2)} €` : "..."}
                  </p>
                </div>
                
                <div style={{ textAlign: "center", padding: "10px", background: "rgba(0, 255, 200, 0.05)", borderRadius: "8px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#a8b2d8" }}>Pack Populaire (5 unités)</p>
                  <p style={{ margin: "0", fontSize: "1.3rem", fontWeight: "700", color: "#00ffc8" }}>
                    {potentialGainPerUnit ? `${(parseFloat(potentialGainPerUnit) * 5).toFixed(2)} €` : "..."}
                  </p>
                </div>
                
                <div style={{ textAlign: "center", padding: "10px", background: "rgba(0, 255, 200, 0.05)", borderRadius: "8px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#a8b2d8" }}>Pack Expert (10 unités)</p>
                  <p style={{ margin: "0", fontSize: "1.3rem", fontWeight: "700", color: "#00ffc8" }}>
                    {potentialGainPerUnit ? `${(parseFloat(potentialGainPerUnit) * 10).toFixed(2)} €` : "..."}
                  </p>
                </div>
                
                <div style={{ textAlign: "center", padding: "10px", background: "rgba(255, 215, 0, 0.1)", borderRadius: "8px", border: "1px solid rgba(255, 215, 0, 0.3)" }}>
                  <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#ffd966" }}>Pack Whale (100 unités)</p>
                  <p style={{ margin: "0", fontSize: "1.3rem", fontWeight: "700", color: "#ffd700" }}>
                    {potentialGainPerUnit ? `${(parseFloat(potentialGainPerUnit) * 100).toFixed(2)} €` : "..."}
                  </p>
                </div>
              </div>
            </div>

            <p className="bp-hero-small" style={{ 
              fontSize: "0.82rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "14px",
              marginTop: "16px"
            }}>
              ⚠️ <strong>Projet expérimental :</strong> Les probabilités de trouver un bloc 
              dépendent du pool ViaBTC. Ne participez que si vous comprenez les risques 
              et acceptez que les gains ne sont pas garantis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}