import { useEffect, useState } from "react";
import CONFIG from "../../config";

// Fonction pour enregistrer un clic pack
const logPackClick = async (packId) => {
  try {
    await fetch("/api/logPackClick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack: packId }),
    });
  } catch (err) {
    console.log("Erreur tracking clic pack:", err);
  }
};

const BTC_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
// TODO: remplace par ton adresse ETH Ledger
const ETH_ADDRESS = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";

export default function Participation() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null); // pour la popup crypto
  const [selectedCrypto, setSelectedCrypto] = useState("btc"); // "btc" ou "eth"
  const [copiedAddress, setCopiedAddress] = useState(null); // "btc" ou "eth" ou null

  useEffect(() => {
    async function load() {
      try {
        // On récupère BTC et ETH en EUR via Coingecko
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur"
        );
        const json = await res.json();
        if (json.bitcoin && json.ethereum) {
          setBtcPrice(json.bitcoin.eur);
          setEthPrice(json.ethereum.eur);
        }
      } catch (err) {
        console.log("Erreur prix crypto:", err);
      }
    }

    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const potentialGainPerUnit = CONFIG.getPotentialGainPerUnit(btcPrice);

  // Ouvrir la popup pour un pack
  const openPaymentModal = (pack) => {
    setSelectedPack(pack);
    setSelectedCrypto("btc");
  };

  // Fermer la popup
  const closePaymentModal = () => {
    setSelectedPack(null);
  };

  const copyToClipboard = async (text, type) => {
    if (!navigator.clipboard) {
      alert("Votre navigateur ne supporte pas la copie automatique.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
      alert("❌ Erreur lors de la copie. Veuillez copier manuellement l'adresse.");
    }
  };

  // Calcule les montants à envoyer
  const getAmounts = () => {
    if (!selectedPack) return { eur: null, btc: null, eth: null };

    const priceEUR = parseFloat(
      CONFIG.getPackPrice(selectedPack.units, selectedPack.savings)
    );

    const btcAmount =
      btcPrice && priceEUR ? (priceEUR / btcPrice).toFixed(8) : null;
    const ethAmount =
      ethPrice && priceEUR ? (priceEUR / ethPrice).toFixed(6) : null;

    return { eur: priceEUR.toFixed(2), btc: btcAmount, eth: ethAmount };
  };

  const { eur: packPriceEUR, btc: packBtcAmount, eth: packEthAmount } =
    getAmounts();

  const btcQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bitcoin:${BTC_ADDRESS}${
    packBtcAmount ? `?amount=${packBtcAmount}` : ""
  }`;

  const ethQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ethereum:${ETH_ADDRESS}${
    packEthAmount ? `?amount=${packEthAmount}` : ""
  }`;

  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Participer à BlockPulse
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--bp-muted)",
            maxWidth: "700px",
            margin: "0 auto 56px",
          }}
        >
          Choisissez votre pack de participation. Chaque part vous donne un
          ticket pour les tirages techniques BlockPulse. Plus vous avez de parts,
          plus vos chances d&apos;être sélectionné lors d&apos;un tirage sont
          élevées.
        </p>

        <div className="bp-ticket-banner">
          <span className="bp-ticket-icon">⬤</span>
          <span className="bp-ticket-text">
            +20 nouveaux tickets techniques ce mois-ci
          </span>
        </div>


        {/* Grille des packs standards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {CONFIG.PACKS.filter((p) => !p.vip).map((pack) => {
            const price = CONFIG.getPackPrice(pack.units, pack.savings);
            const originalPrice = (pack.units * CONFIG.UNIT_PRICE).toFixed(2);
            const potentialGain = potentialGainPerUnit
              ? (parseFloat(potentialGainPerUnit) * pack.units).toFixed(2)
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
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
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
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(135deg, #00ffc8, #5b8cff)",
                      color: "#020816",
                      padding: "4px 16px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ⭐ Plus populaire
                  </div>
                )}

                <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                    {pack.badge}
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>
                    Pack {pack.label}
                  </h3>
                  <p
                    style={{
                      color: "var(--bp-muted)",
                      fontSize: "0.9rem",
                      marginBottom: "16px",
                    }}
                  >
                    {pack.units} unité
                    {pack.units > 1 ? "s" : ""} de contribution
                  </p>

                  <div style={{ minHeight: "36px", marginBottom: "12px" }}>
                    {pack.savings > 0 ? (
                      <div
                        style={{
                          display: "inline-block",
                          background: "rgba(255, 100, 100, 0.15)",
                          border: "1px solid rgba(255, 100, 100, 0.4)",
                          color: "#ff8888",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        🎁 Économisez {pack.savings}%
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          background: "rgba(0, 255, 200, 0.1)",
                          border: "1px solid rgba(0, 255, 200, 0.3)",
                          color: "var(--bp-accent)",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        ⚡ Pack d'entrée
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    {pack.savings > 0 && (
                      <p
                        style={{
                          color: "var(--bp-muted)",
                          textDecoration: "line-through",
                          fontSize: "0.9rem",
                          margin: "0",
                        }}
                      >
                        {originalPrice} €
                      </p>
                    )}
                    <p
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: "700",
                        color: "var(--bp-accent)",
                        margin: "4px 0",
                      }}
                    >
                      {price} €
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--bp-muted)",
                        margin: "0",
                      }}
                    >
                      {(parseFloat(price) / pack.units).toFixed(2)} € / unité
                    </p>
                  </div>

                  {potentialGain && (
                    <div
                      style={{
                        background: "rgba(0, 255, 200, 0.08)",
                        border: "1px solid rgba(0, 255, 200, 0.2)",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bp-muted)",
                          margin: "0 0 4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Bonus symbolique estimé / tirage
                      </p>
                      <p
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: "var(--bp-accent)",
                          margin: "0",
                        }}
                      >
                        {potentialGain} €
                      </p>
                    </div>
                  )}

                  <div style={{ marginTop: "auto" }}>
                   <button
                    className="bp-btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => {
                      logPackClick(pack.id);   // 👈 tracking ajouté ici
                      openPaymentModal(pack);  // 👈 ton code original
                    }}
                  >
                    Choisir ce pack
                  </button>

                  </div>
                </div>
              </div>
            );
          })}
          
        </div>

        {/* Pack VIP Whale - Mise en avant spéciale */}
        {CONFIG.PACKS.filter((p) => p.vip).map((pack) => {
          const price = CONFIG.getPackPrice(pack.units, pack.savings);
          const originalPrice = (pack.units * CONFIG.UNIT_PRICE).toFixed(2);
          const potentialGain = potentialGainPerUnit
            ? (parseFloat(potentialGainPerUnit) * pack.units).toFixed(2)
            : null;

          return (
            <div
              key={pack.id}
              className="bp-card"
              style={{
                position: "relative",
                border: "3px solid #ffd700",
                background:
                  "radial-gradient(circle at top, rgba(255, 215, 0, 0.15), rgba(5, 11, 24, 0.95))",
                padding: "32px",
                marginBottom: "48px",
                boxShadow: "0 24px 56px rgba(255, 215, 0, 0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(135deg, #ffd700, #ffed4e)",
                  color: "#020816",
                  padding: "6px 24px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  boxShadow: "0 6px 16px rgba(255, 215, 0, 0.5)",
                }}
              >
                👑 Pack VIP Whale - Exclusif
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
                  gap: "32px",
                  alignItems: "center",
                  marginTop: "20px",
                }}
                className="bp-whale-grid"
              >
                {/* Colonne 1 : Informations */}
                <div>
                  <div
                    style={{
                      fontSize: "4rem",
                      textAlign: "center",
                      marginBottom: "16px",
                    }}
                  >
                    {pack.badge}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "1.8rem",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #ffd700, #ffed4e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Pack {pack.label}
                  </h3>
                  <p
                    style={{
                      color: "var(--bp-muted)",
                      fontSize: "1rem",
                      textAlign: "center",
                      marginBottom: "16px",
                    }}
                  >
                    {pack.units} unités de contribution
                  </p>
                  <div
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        background: "rgba(255, 215, 0, 0.2)",
                        border: "1px solid #ffd700",
                        color: "#ffd700",
                        padding: "6px 16px",
                        borderRadius: "999px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                      }}
                    >
                      🎁 Économisez {pack.savings}%
                    </div>
                  </div>
                </div>

                {/* Séparateur */}
                <div
                  style={{
                    height: "200px",
                    width: "1px",
                    background: "rgba(255, 215, 0, 0.3)",
                  }}
                ></div>

                {/* Colonne 2 : Prix */}
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--bp-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    Prix du pack
                  </p>
                  <p
                    style={{
                      color: "var(--bp-muted)",
                      textDecoration: "line-through",
                      fontSize: "1.2rem",
                      margin: "0",
                    }}
                  >
                    {originalPrice} €
                  </p>
                  <p
                    style={{
                      fontSize: "3rem",
                      fontWeight: "700",
                      color: "#ffd700",
                      margin: "8px 0",
                      textShadow:
                        "0 0 30px rgba(255, 215, 0, 0.5)",
                    }}
                  >
                    {price} €
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--bp-muted)",
                      margin: "0",
                    }}
                  >
                    {(parseFloat(price) / pack.units).toFixed(2)} € / unité
                  </p>
                </div>

                {/* Séparateur */}
                <div
                  style={{
                    height: "200px",
                    width: "1px",
                    background: "rgba(255, 215, 0, 0.3)",
                  }}
                ></div>

                {/* Colonne 3 : Gain potentiel */}
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--bp-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    Bonus symbolique estimé / tirage
                  </p>
                  {potentialGain ? (
                    <>
                      <p
                        style={{
                          fontSize: "3rem",
                          fontWeight: "700",
                          color: "#00ffc8",
                          margin: "8px 0",
                          textShadow:
                            "0 0 30px rgba(0, 255, 200, 0.5)",
                        }}
                      >
                        {potentialGain} €
                      </p>
                    </>
                  ) : (
                    <></>
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
                    fontWeight: "700",
                  }}
                  onClick={() => {
                    logPackClick(pack.id);   // 👈 tracking ici aussi
                    openPaymentModal(pack);
                  }}
                >
                  🐋 Devenir une Whale - {price} €
                </button>

            </div>
          );
        })}

        {/* SECTION : Pourquoi faire confiance à BlockPulse ? */}
{/* SECTION : Pourquoi faire confiance à BlockPulse ? */}
<section
  style={{
    marginTop: "80px",
    padding: "0 10px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: "40px",
      fontWeight: "700",
    }}
  >
    Pourquoi faire confiance à{" "}
    <span style={{ color: "var(--bp-accent)" }}>BlockPulse</span> ?
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "26px",
    }}
  >
    <div
      className="trust-card"
      style={{
        background: "var(--bp-card)",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--bp-border)",
        textAlign: "center",
        transition: "0.25s",
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔒</div>
      <h3 style={{ marginBottom: "10px" }}>Paiements directs</h3>
      <p style={{ color: "var(--bp-muted)" }}>
        Vos contributions sont envoyées directement à nos adresses{" "}
        <strong>Ledger BTC</strong> et <strong>ETH</strong>.
      </p>
    </div>

    <div
      className="trust-card"
      style={{
        background: "var(--bp-card)",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--bp-border)",
        textAlign: "center",
        transition: "0.25s",
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>💡</div>
      <h3 style={{ marginBottom: "10px" }}>Projet 100% réel</h3>
      <p style={{ color: "var(--bp-muted)" }}>
        Module <strong>ESP32</strong> connecté au pool <strong>ViaBTC</strong>{" "}
        via Stratum.
      </p>
    </div>

    <div
      className="trust-card"
      style={{
        background: "var(--bp-card)",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--bp-border)",
        textAlign: "center",
        transition: "0.25s",
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>📊</div>
      <h3 style={{ marginBottom: "10px" }}>Transparence</h3>
      <p style={{ color: "var(--bp-muted)" }}>
        Stats techniques affichées directement depuis le module en temps réel.
      </p>
    </div>

  </div>
</section>



                {/* MODALE PAIEMENT CRYPTO DIRECT (BTC / ETH) */}
        {selectedPack && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 9999,
              overflowY: "auto",
            }}
            onClick={closePaymentModal}
          >
            <div
              style={{
                background: "var(--bp-card)",
                borderRadius: "16px",
                padding: "20px",
                width: "100%",
                maxWidth: "440px",
                boxShadow: "0 24px 56px rgba(0,0,0,0.7)",
                border: "1px solid var(--bp-border)",
                margin: "auto",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton X de fermeture */}
              <button
                onClick={closePaymentModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "12px",
                  border: "none",
                  background: "transparent",
                  color: "var(--bp-muted)",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label="Fermer"
              >
                ✕
              </button>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "1.3rem",
                  textAlign: "center",
                  paddingRight: "24px", // laisser la place pour le X
                }}
              >
                Finaliser votre participation
              </h3>

              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: "0.9rem",
                  color: "var(--bp-muted)",
                  textAlign: "center",
                }}
              >
                Pack <strong>{selectedPack.label}</strong> —{" "}
                {packPriceEUR ||
                  CONFIG.getPackPrice(
                    selectedPack.units,
                    selectedPack.savings
                  )}{" "}
                €
              </p>

              {/* Message anti-arnaque */}
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "0.8rem",
                  color: "#ffb366",
                  textAlign: "center",
                }}
              >
                ⚠️ Ne jamais envoyer de fonds vers une autre adresse que celles
                affichées ici sur BlockPulse.be. Vérifiez toujours l’URL du site.
              </p>

              {/* Choix BTC / ETH */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <button
                  onClick={() => setSelectedCrypto("btc")}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: "999px",
                    border:
                      selectedCrypto === "btc"
                        ? "1px solid var(--bp-accent)"
                        : "1px solid var(--bp-border)",
                    background:
                      selectedCrypto === "btc"
                        ? "rgba(0,255,200,0.12)"
                        : "transparent",
                    color: "#fff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  ₿ Bitcoin
                </button>

                <button
                  onClick={() => setSelectedCrypto("eth")}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: "999px",
                    border:
                      selectedCrypto === "eth"
                        ? "1px solid var(--bp-accent)"
                        : "1px solid var(--bp-border)",
                    background:
                      selectedCrypto === "eth"
                        ? "rgba(0,255,200,0.12)"
                        : "transparent",
                    color: "#fff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Ξ Ethereum
                </button>
              </div>

              {/* Zone QR + infos selon crypto choisie */}
              {selectedCrypto === "btc" ? (
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--bp-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Envoyez exactement :
                  </p>
                  <p
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "600",
                      margin: "0 0 4px",
                    }}
                  >
                    {packBtcAmount || "..."} BTC
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bp-muted)",
                      margin: "0 0 16px",
                    }}
                  >
                    (~ {packPriceEUR || "…"} € au taux actuel)
                  </p>

                  <img
                    src={btcQrUrl}
                    alt="QR Bitcoin"
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "12px",
                      margin: "12px auto",
                      display: "block",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bp-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    Adresse BTC :
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                      marginBottom: "10px",
                    }}
                  >
                    {BTC_ADDRESS}
                  </p>
                  <button
                    onClick={() => copyToClipboard(BTC_ADDRESS, "btc")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border:
                        copiedAddress === "btc"
                          ? "1px solid var(--bp-accent)"
                          : "1px solid var(--bp-border)",
                      background:
                        copiedAddress === "btc"
                          ? "rgba(0, 255, 200, 0.12)"
                          : "transparent",
                      color:
                        copiedAddress === "btc"
                          ? "var(--bp-accent)"
                          : "var(--bp-muted)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      width: "100%",
                      marginBottom: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedAddress === "btc"
                      ? "✓ Copié !"
                      : "Copier l'adresse BTC"}
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--bp-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Envoyez exactement :
                  </p>
                  <p
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "600",
                      margin: "0 0 4px",
                    }}
                  >
                    {packEthAmount || "..."} ETH
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bp-muted)",
                      margin: "0 0 16px",
                    }}
                  >
                    (~ {packPriceEUR || "…"} € au taux actuel)
                  </p>

                  <img
                    src={ethQrUrl}
                    alt="QR Ethereum"
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "12px",
                      margin: "12px auto",
                      display: "block",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bp-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    Adresse ETH :
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                      marginBottom: "10px",
                    }}
                  >
                    {ETH_ADDRESS}
                  </p>
                  <button
                    onClick={() => copyToClipboard(ETH_ADDRESS, "eth")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border:
                        copiedAddress === "eth"
                          ? "1px solid var(--bp-accent)"
                          : "1px solid var(--bp-border)",
                      background:
                        copiedAddress === "eth"
                          ? "rgba(0, 255, 200, 0.12)"
                          : "transparent",
                      color:
                        copiedAddress === "eth"
                          ? "var(--bp-accent)"
                          : "var(--bp-muted)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      width: "100%",
                      marginBottom: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedAddress === "eth"
                      ? "✓ Copié !"
                      : "Copier l'adresse ETH"}
                  </button>
                </div>
              )}

              {/* Bouton Annuler (bas de modale) */}
              <button
                onClick={closePaymentModal}
                style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "12px 12px",
                  borderRadius: "999px",
                  border: "1px solid var(--bp-border)",
                  background: "transparent",
                  color: "var(--bp-muted)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Informations supplémentaires */}
        <div className="bp-grid-2">
          <div className="bp-card">
            <h3>💳 Paiement crypto direct</h3>
            <p>
              Les paiements sont envoyés directement vers vos adresses{" "}
              <strong>BTC</strong> et <strong>ETH</strong> sécurisées sur Ledger.
            </p>
            <ul className="bp-list">
              <li>✅ Aucun intermédiaire</li>
              <li>✅ BTC &amp; ETH supportés</li>
              <li>✅ Montant calculé automatiquement</li>
              <li>✅ QR code prêt à scanner</li>
              <li>✅ Vous gardez le contrôle de vos fonds</li>
            </ul>
          </div>

          <div className="bp-card">
            <h3>📊 Récapitulatif du modèle</h3>
            <ul className="bp-list">
              <li>✅ Contribution technique au nœud ESP32</li>
              <li>✅ Tirages techniques basés sur l&apos;activité du pool</li>
              <li>✅ Transparence totale : stats en temps réel (bientôt)</li>
              <li>✅ Bonus symboliques distribués lors des tirages</li>
              <li>⚠️ Gains non garantis - Projet expérimental</li>
            </ul>
          </div>
        </div>

        {/* Note importante */}
        <div
          style={{
            marginTop: "32px",
            background: "rgba(255, 140, 0, 0.08)",
            border: "1px solid rgba(255, 140, 0, 0.3)",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              color: "var(--bp-muted)",
              fontSize: "0.9rem",
            }}
          >
            ⚠️{" "}
            <strong style={{ color: "#ffb366" }}>Important :</strong> Ce n&apos;est
            pas un jeu d&apos;argent. Les bonus sont rares et dépendent
            entièrement du pool ViaBTC. Considérez cette participation
            comme un soutien à un projet tech innovant.
          </p>
        </div>
      </div>
    </section>
  );
}
