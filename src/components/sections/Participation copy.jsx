import { useEffect, useState } from "react";
import CONFIG from "../../config";

export default function Participation() {
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

  const potentialGainPerUnit = CONFIG.getPotentialGainPerUnit(btcPrice);

  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Participer à BlockPulse
        </h2>
        <p style={{ textAlign: "center", color: "var(--bp-muted)", maxWidth: "700px", margin: "0 auto 56px" }}>
          Choisissez votre pack de participation. Plus vous prenez d'unités, 
          plus votre gain potentiel est élevé en cas de bloc trouvé !
        </p>

        {/* Grille des packs standards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          {CONFIG.PACKS.filter(p => !p.vip).map((pack) => {
            const price = CONFIG.getPackPrice(pack.units, pack.savings);
            const originalPrice = (pack.units * CONFIG.UNIT_PRICE).toFixed(2);
            const potentialGain = potentialGainPerUnit 
              ? (parseFloat(potentialGainPerUnit) * pack.units).toFixed(2)
              : null;
            const profitPercent = potentialGain
              ? ((parseFloat(potentialGain) / parseFloat(price)) * 100).toFixed(0)
              : null;

            return (
              <div
                key={pack.id}
                className="bp-card"
                style={{
                  position: "relative",
                  border: pack.popular 
                    ? "2px solid var(--bp-accent)" 
                    : pack.vip 
                    ? "2px solid #ffd700"
                    : "1px solid var(--bp-border)",
                  background: pack.popular 
                    ? "radial-gradient(circle at top, rgba(0, 255, 200, 0.1), rgba(5, 11, 24, 0.95))"
                    : pack.vip
                    ? "radial-gradient(circle at top, rgba(255, 215, 0, 0.15), rgba(5, 11, 24, 0.95))"
                    : "var(--bp-card)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = pack.vip 
                    ? "0 24px 56px rgba(255, 215, 0, 0.3)"
                    : "0 24px 56px rgba(0, 0, 0, 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--bp-shadow-soft)";
                }}
              >
                {pack.popular && (
                  <div style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #00ffc8, #5b8cff)",
                    color: "#020816",
                    padding: "4px 16px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}>
                    ⭐ Plus populaire
                  </div>
                )}

                {pack.vip && (
                  <div style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                    color: "#020816",
                    padding: "4px 16px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)"
                  }}>
                    👑 Pack VIP Whale
                  </div>
                )}

                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                    {pack.badge}
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>
                    Pack {pack.label}
                  </h3>
                  <p style={{ 
                    color: "var(--bp-muted)", 
                    fontSize: "0.9rem",
                    marginBottom: "16px"
                  }}>
                    {pack.units} unité{pack.units > 1 ? "s" : ""} de contribution
                  </p>

                  {pack.savings && (
                    <div style={{
                      display: "inline-block",
                      background: "rgba(255, 100, 100, 0.15)",
                      border: "1px solid rgba(255, 100, 100, 0.4)",
                      color: "#ff8888",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      marginBottom: "12px"
                    }}>
                      🎁 Économisez {pack.savings}%
                    </div>
                  )}

                  <div style={{ marginBottom: "16px" }}>
                    {pack.savings && (
                      <p style={{
                        color: "var(--bp-muted)",
                        textDecoration: "line-through",
                        fontSize: "0.9rem",
                        margin: "0"
                      }}>
                        {originalPrice} €
                      </p>
                    )}
                    <p style={{
                      fontSize: "2.2rem",
                      fontWeight: "700",
                      color: "var(--bp-accent)",
                      margin: "4px 0"
                    }}>
                      {price} €
                    </p>
                    <p style={{
                      fontSize: "0.85rem",
                      color: "var(--bp-muted)",
                      margin: "0"
                    }}>
                      {(parseFloat(price) / pack.units).toFixed(2)} € / unité
                    </p>
                  </div>

                  {potentialGain && (
                    <div style={{
                      background: "rgba(0, 255, 200, 0.08)",
                      border: "1px solid rgba(0, 255, 200, 0.2)",
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "16px"
                    }}>
                      <p style={{
                        fontSize: "0.8rem",
                        color: "var(--bp-muted)",
                        margin: "0 0 4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em"
                      }}>
                        Gain si bloc trouvé
                      </p>
                      <p style={{
                        fontSize: "1.4rem",
                        fontWeight: "700",
                        color: "var(--bp-accent)",
                        margin: "0"
                      }}>
                        {potentialGain} €
                      </p>
                      {profitPercent && (
                        <p style={{
                          fontSize: "0.8rem",
                          color: "#70c3ff",
                          margin: "4px 0 0"
                        }}>
                          +{profitPercent}% de retour
                        </p>
                      )}
                    </div>
                  )}

                 <button
                  className="bp-btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => window.location.href = pack.paymentUrl}
                >
                  Choisir ce pack
                </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Pack VIP Whale - Mise en avant spéciale */}
        {CONFIG.PACKS.filter(p => p.vip).map((pack) => {
          const price = CONFIG.getPackPrice(pack.units, pack.savings);
          const originalPrice = (pack.units * CONFIG.UNIT_PRICE).toFixed(2);
          const potentialGain = potentialGainPerUnit 
            ? (parseFloat(potentialGainPerUnit) * pack.units).toFixed(2)
            : null;
          const profitPercent = potentialGain
            ? ((parseFloat(potentialGain) / parseFloat(price)) * 100).toFixed(0)
            : null;

          return (
            <div
              key={pack.id}
              className="bp-card"
              style={{
                position: "relative",
                border: "3px solid #ffd700",
                background: "radial-gradient(circle at top, rgba(255, 215, 0, 0.15), rgba(5, 11, 24, 0.95))",
                padding: "32px",
                marginBottom: "48px",
                boxShadow: "0 24px 56px rgba(255, 215, 0, 0.2)"
              }}
            >
              <div style={{
                position: "absolute",
                top: "-16px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                color: "#020816",
                padding: "6px 24px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                boxShadow: "0 6px 16px rgba(255, 215, 0, 0.5)"
              }}>
                👑 Pack VIP Whale - Exclusif
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
                gap: "32px",
                alignItems: "center",
                marginTop: "20px"
              }}
              className="bp-whale-grid"
              >
                {/* Colonne 1 : Informations */}
                <div>
                  <div style={{ fontSize: "4rem", textAlign: "center", marginBottom: "16px" }}>
                    {pack.badge}
                  </div>
                  <h3 style={{ 
                    margin: "0 0 12px", 
                    fontSize: "1.8rem", 
                    textAlign: "center",
                    background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Pack {pack.label}
                  </h3>
                  <p style={{ 
                    color: "var(--bp-muted)", 
                    fontSize: "1rem",
                    textAlign: "center",
                    marginBottom: "16px"
                  }}>
                    {pack.units} unités de contribution
                  </p>
                  <div style={{
                    display: "inline-block",
                    width: "100%",
                    textAlign: "center"
                  }}>
                    <div style={{
                      display: "inline-block",
                      background: "rgba(255, 215, 0, 0.2)",
                      border: "1px solid #ffd700",
                      color: "#ffd700",
                      padding: "6px 16px",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      🎁 Économisez {pack.savings}%
                    </div>
                  </div>
                </div>

                {/* Séparateur */}
                <div style={{ height: "200px", width: "1px", background: "rgba(255, 215, 0, 0.3)" }}></div>

                {/* Colonne 2 : Prix */}
                <div style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "var(--bp-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px"
                  }}>
                    Prix du pack
                  </p>
                  <p style={{
                    color: "var(--bp-muted)",
                    textDecoration: "line-through",
                    fontSize: "1.2rem",
                    margin: "0"
                  }}>
                    {originalPrice} €
                  </p>
                  <p style={{
                    fontSize: "3rem",
                    fontWeight: "700",
                    color: "#ffd700",
                    margin: "8px 0",
                    textShadow: "0 0 30px rgba(255, 215, 0, 0.5)"
                  }}>
                    {price} €
                  </p>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "var(--bp-muted)",
                    margin: "0"
                  }}>
                    {(parseFloat(price) / pack.units).toFixed(2)} € / unité
                  </p>
                </div>

                {/* Séparateur */}
                <div style={{ height: "200px", width: "1px", background: "rgba(255, 215, 0, 0.3)" }}></div>

                {/* Colonne 3 : Gain potentiel */}
                <div style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "var(--bp-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px"
                  }}>
                    Gain si bloc trouvé
                  </p>
                  {potentialGain ? (
                    <>
                      <p style={{
                        fontSize: "3rem",
                        fontWeight: "700",
                        color: "#00ffc8",
                        margin: "8px 0",
                        textShadow: "0 0 30px rgba(0, 255, 200, 0.5)"
                      }}>
                        {potentialGain} €
                      </p>
                      <p style={{
                        fontSize: "1.1rem",
                        color: "#70c3ff",
                        margin: "0",
                        fontWeight: "600"
                      }}>
                        +{profitPercent}% de retour
                      </p>
                    </>
                  ) : (
                    <p style={{ color: "var(--bp-muted)" }}>Calcul...</p>
                  )}
                </div>
              </div>

             <button
              className="bp-btn-primary"
              style={{ 
                width: "100%", 
                marginTop: "32px",
                padding: "16px",
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                color: "#020816",
                fontWeight: "700"
              }}
              onClick={() => window.location.href = pack.paymentUrl}
            >
              🐋 Devenir une Whale - {price} €
            </button>

            </div>
          );
        })}

        {/* Informations supplémentaires */}
        <div className="bp-grid-2">
          <div className="bp-card">
            <h3>💳 Paiement crypto sécurisé</h3>
            <p>
              Les paiements sont gérés par <strong>NOWPayments</strong>, 
              la plateforme leader mondiale pour les paiements en cryptomonnaies.
            </p>
            <ul className="bp-list">
              <li>✅ Bitcoin, Ethereum, USDT acceptés</li>
              <li>✅ Plus de 150 cryptomonnaies disponibles</li>
              <li>✅ Paiement unique, pas d'abonnement</li>
              <li>✅ Confirmation automatique par email</li>
              <li>✅ Support 24/7 en cas de problème</li>
            </ul>
          </div>

          <div className="bp-card">
            <h3>📊 Récapitulatif du modèle</h3>
            <ul className="bp-list">
              <li>✅ Contribution technique au nœud ESP32</li>
              <li>✅ Bonus potentiels issus du pool ViaBTC</li>
              <li>✅ Transparence totale : stats en temps réel</li>
              <li>✅ Répartition proportionnelle si bloc trouvé</li>
              <li>⚠️ Gains non garantis - Projet expérimental</li>
            </ul>
          </div>
        </div>

        {/* Note importante */}
        <div style={{
          marginTop: "32px",
          background: "rgba(255, 140, 0, 0.08)",
          border: "1px solid rgba(255, 140, 0, 0.3)",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center"
        }}>
          <p style={{ margin: "0", color: "var(--bp-muted)", fontSize: "0.9rem" }}>
            ⚠️ <strong style={{ color: "#ffb366" }}>Important :</strong> Ce n'est pas un jeu d'argent. 
            Les bonus sont rares et dépendent entièrement du pool ViaBTC. 
            Considérez cette participation comme un soutien à un projet tech innovant.
          </p>
        </div>
      </div>
    </section>
  );
}