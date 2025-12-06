import { useEffect, useState } from "react";

const BTC_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
const ETH_ADDRESS = "0x3704c62AB88B9a462f81495Eb75Bf57E504bb167";

export default function Dashboard() {
  const [btcData, setBtcData] = useState({
    totalReceived: null,
    txCount: null,
    confirmedBalance: null,
  });
  const [ethData, setEthData] = useState({
    totalReceived: null,
    txCount: null,
    confirmedBalance: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder visiteurs (à brancher plus tard sur ton outil analytics)
  const [visitorsStats] = useState({
    today: 0,
    last7Days: 0,
    last30Days: 0,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        // ---- BTC via Blockstream ----
        const btcRes = await fetch(
          `https://blockstream.info/api/address/${BTC_ADDRESS}`
        );
        if (!btcRes.ok) throw new Error("Erreur API BTC");
        const btcJson = await btcRes.json();

        const btcTotalReceived = btcJson.chain_stats.funded_txo_sum / 1e8;
        const btcSpent = btcJson.chain_stats.spent_txo_sum / 1e8;
        const btcConfirmed = btcTotalReceived - btcSpent;

        setBtcData({
          totalReceived: btcTotalReceived,
          txCount: btcJson.chain_stats.tx_count,
          confirmedBalance: btcConfirmed,
        });

        // ---- ETH via Blockscout (exemple, à adapter si besoin) ----
        const ethRes = await fetch(
          `https://eth.blockscout.com/api?module=account&action=txlist&address=${ETH_ADDRESS}`
        );
        if (!ethRes.ok) throw new Error("Erreur API ETH");
        const ethJson = await ethRes.json();

        if (ethJson.status !== "1") {
          throw new Error("Aucune transaction ETH ou erreur API");
        }

        const txs = ethJson.result;
        let totalInWei = 0n;

        txs.forEach((tx) => {
          // si ton adresse est destinataire
          if (tx.to && tx.to.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
            totalInWei += BigInt(tx.value);
          }
          // si elle envoie, on soustrait
          if (tx.from && tx.from.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
            totalInWei -= BigInt(tx.value);
          }
        });

        const ethTotalReceived = Number(totalInWei) / 1e18;

        setEthData({
          totalReceived: ethTotalReceived,
          txCount: txs.length,
          confirmedBalance: ethTotalReceived, // simplifié : pas de notion UTXO comme BTC
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "Erreur de chargement des données");
      } finally {
        setLoading(false);
      }
    }

    load();
    const t = setInterval(load, 60000); // refresh toutes les 60s
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          Dashboard BlockPulse
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--bp-muted)",
            marginBottom: "32px",
          }}
        >
          Vue d&apos;ensemble des paiements crypto et de l&apos;activité du site.
        </p>

        {loading && (
          <p
            style={{
              textAlign: "center",
              color: "var(--bp-muted)",
              marginBottom: "24px",
            }}
          >
            Chargement des données on-chain…
          </p>
        )}

        {error && (
          <div
            style={{
              marginBottom: "24px",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,100,100,0.4)",
              background: "rgba(255,100,100,0.1)",
              color: "#ff8888",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Grille principale : BTC / ETH / Visiteurs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {/* Carte BTC */}
          <div
            className="bp-card"
            style={{
              border: "1px solid var(--bp-border)",
              borderRadius: "16px",
              padding: "20px",
              background: "var(--bp-card)",
              boxShadow: "var(--bp-shadow-soft)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>Paiements BTC</h3>
              <span style={{ fontSize: "1.4rem" }}>₿</span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--bp-muted)",
                marginBottom: "16px",
              }}
            >
              Adresse Ledger :<br />
              <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>
                {BTC_ADDRESS}
              </span>
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Total reçu
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {btcData.totalReceived !== null
                    ? `${btcData.totalReceived.toFixed(8)} BTC`
                    : "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Solde estimé
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {btcData.confirmedBalance !== null
                    ? `${btcData.confirmedBalance.toFixed(8)} BTC`
                    : "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Nb transactions
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {btcData.txCount ?? "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Réseau
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>Bitcoin mainnet</p>
              </div>
            </div>
          </div>

          {/* Carte ETH */}
          <div
            className="bp-card"
            style={{
              border: "1px solid var(--bp-border)",
              borderRadius: "16px",
              padding: "20px",
              background: "var(--bp-card)",
              boxShadow: "var(--bp-shadow-soft)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>Paiements ETH</h3>
              <span style={{ fontSize: "1.4rem" }}>Ξ</span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--bp-muted)",
                marginBottom: "16px",
              }}
            >
              Adresse Ledger :<br />
              <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>
                {ETH_ADDRESS}
              </span>
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Solde estimé
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {ethData.confirmedBalance !== null
                    ? `${ethData.confirmedBalance.toFixed(6)} ETH`
                    : "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Nb transactions
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {ethData.txCount ?? "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Total reçu net
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {ethData.totalReceived !== null
                    ? `${ethData.totalReceived.toFixed(6)} ETH`
                    : "…"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>Réseau</p>
                <p style={{ margin: 0, fontWeight: 600 }}>Ethereum mainnet</p>
              </div>
            </div>
          </div>

          {/* Carte visiteurs (placeholder) */}
          <div
            className="bp-card"
            style={{
              border: "1px solid var(--bp-border)",
              borderRadius: "16px",
              padding: "20px",
              background: "var(--bp-card)",
              boxShadow: "var(--bp-shadow-soft)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>Visiteurs du site</h3>
              <span style={{ fontSize: "1.4rem" }}>👁️</span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--bp-muted)",
                marginBottom: "16px",
              }}
            >
              À connecter plus tard à ton outil d&apos;analytics (Cloudflare,
              Umami, Plausible…).
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Aujourd&apos;hui
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {visitorsStats.today}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  7 derniers jours
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {visitorsStats.last7Days}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  30 derniers jours
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {visitorsStats.last30Days}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--bp-muted)" }}>
                  Source données
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>À configurer</p>
              </div>
            </div>
          </div>
        </div>

        {/* TODO : section ESP32 plus tard */}
        <div
          className="bp-card"
          style={{
            border: "1px solid var(--bp-border)",
            borderRadius: "16px",
            padding: "20px",
            background: "var(--bp-card)",
            boxShadow: "var(--bp-shadow-soft)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Suivi module ESP32 (à venir)</h3>
          <p style={{ color: "var(--bp-muted)", fontSize: "0.9rem" }}>
            Ici tu pourras afficher les stats temps réel de ton module ESP32 :
            hashrate, nombre de shares, uptime, statut de connexion au pool,
            dernier tirage technique, etc. Il suffira d&apos;appeler ton API
            ESP32 depuis ce composant.
          </p>
        </div>
      </div>
    </section>
  );
}
