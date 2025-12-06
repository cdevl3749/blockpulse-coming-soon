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

  // 🔵 Paiements récents BTC & ETH
  const [recentBTC, setRecentBTC] = useState(null);
  const [recentETH, setRecentETH] = useState(null);

  // 👁️ Visiteurs (placeholder)
  const [visitorsStats] = useState({
    today: 0,
    last7Days: 0,
    last30Days: 0,
  });

  // ============================
  // 🔵 Paiements récents API
  // ============================
  useEffect(() => {
    fetch("/.netlify/functions/getBtcRecent")
      .then((r) => r.json())
      .then(setRecentBTC)
      .catch(console.error);

    fetch("/.netlify/functions/getEthRecent")
      .then((r) => r.json())
      .then(setRecentETH)
      .catch(console.error);
  }, []);

  // ============================
  // ⚡ Paiements globaux BTC / ETH
  // ============================
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

        // ---- ETH via Blockscout ----
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
          if (tx.to && tx.to.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
            totalInWei += BigInt(tx.value);
          }
          if (tx.from && tx.from.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
            totalInWei -= BigInt(tx.value);
          }
        });

        const ethTotalReceived = Number(totalInWei) / 1e18;

        setEthData({
          totalReceived: ethTotalReceived,
          txCount: txs.length,
          confirmedBalance: ethTotalReceived,
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "Erreur de chargement des données");
      } finally {
        setLoading(false);
      }
    }

    load();
    const t = setInterval(load, 60000);
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
          Vue d'ensemble des paiements crypto et de l'activité du site.
        </p>

        {loading && (
          <p style={{ textAlign: "center", color: "var(--bp-muted)" }}>
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

        {/* ====================================== */}
        {/* 🔵 Grille principale BTC / ETH / Visitors */}
        {/* ====================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {/* Carte BTC */}
          <div className="bp-card" style={cardStyle}>
            <CardTitle title="Paiements BTC" icon="₿" />
            <LedgerAddress address={BTC_ADDRESS} />
            <TwoColumnStats
              leftLabel="Total reçu"
              leftValue={
                btcData.totalReceived !== null
                  ? `${btcData.totalReceived.toFixed(8)} BTC`
                  : "…"
              }
              rightLabel="Solde estimé"
              rightValue={
                btcData.confirmedBalance !== null
                  ? `${btcData.confirmedBalance.toFixed(8)} BTC`
                  : "…"
              }
              extra={[
                {
                  label: "Nb transactions",
                  value: btcData.txCount ?? "…",
                },
                { label: "Réseau", value: "Bitcoin mainnet" },
              ]}
            />
          </div>

          {/* Carte ETH */}
          <div className="bp-card" style={cardStyle}>
            <CardTitle title="Paiements ETH" icon="Ξ" />
            <LedgerAddress address={ETH_ADDRESS} />
            <TwoColumnStats
              leftLabel="Solde estimé"
              leftValue={
                ethData.confirmedBalance !== null
                  ? `${ethData.confirmedBalance.toFixed(6)} ETH`
                  : "…"
              }
              rightLabel="Nb transactions"
              rightValue={ethData.txCount ?? "…"}
              extra={[
                {
                  label: "Total reçu net",
                  value:
                    ethData.totalReceived !== null
                      ? `${ethData.totalReceived.toFixed(6)} ETH`
                      : "…",
                },
                { label: "Réseau", value: "Ethereum mainnet" },
              ]}
            />
          </div>

          {/* Carte visiteurs */}
          <div className="bp-card" style={cardStyle}>
            <CardTitle title="Visiteurs du site" icon="👁️" />
            <p style={muted}>
              À connecter plus tard à ton outil d'analytics (Cloudflare, Umami,
              Plausible…).
            </p>

            <TwoColumnStats
              leftLabel="Aujourd'hui"
              leftValue={visitorsStats.today}
              rightLabel="7 derniers jours"
              rightValue={visitorsStats.last7Days}
              extra={[
                {
                  label: "30 derniers jours",
                  value: visitorsStats.last30Days,
                },
                { label: "Source données", value: "À configurer" },
              ]}
            />
          </div>
        </div>

        {/* ====================================== */}
        {/* 🔥 CARTES PAIEMENTS RECENTS BTC / ETH */}
        {/* ====================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {recentBTC && (
            <div className="bp-card" style={cardStyle}>
              <h3 style={{ marginBottom: "12px" }}>Paiements BTC récents</h3>
              <p>
                <strong>Transactions depuis 1 déc 2025 :</strong>{" "}
                {recentBTC.count}
              </p>
              <p>
                <strong>Total BTC :</strong> {recentBTC.totalBTC.toFixed(8)}
              </p>
              <p>
                <strong>Total EUR :</strong> {recentBTC.totalEUR.toFixed(2)} €
              </p>
              <p>
                <strong>Dernier paiement :</strong>{" "}
                {recentBTC.lastTx
                  ? new Date(recentBTC.lastTx * 1000).toLocaleString()
                  : "Aucun"}
              </p>
            </div>
          )}

          {recentETH && (
            <div className="bp-card" style={cardStyle}>
              <h3 style={{ marginBottom: "12px" }}>Paiements ETH récents</h3>
              <p>
                <strong>Transactions depuis 1 déc 2025 :</strong>{" "}
                {recentETH.count}
              </p>
              <p>
                <strong>Total ETH :</strong> {recentETH.totalETH.toFixed(6)}
              </p>
              <p>
                <strong>Total EUR :</strong> {recentETH.totalEUR.toFixed(2)} €
              </p>
              <p>
                <strong>Dernier paiement :</strong>{" "}
                {recentETH.lastTx
                  ? new Date(recentETH.lastTx * 1000).toLocaleString()
                  : "Aucun"}
              </p>
            </div>
          )}
        </div>

        {/* ====================================== */}
        {/* 🔧 Section ESP32 */}
        {/* ====================================== */}
        <div className="bp-card" style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Suivi module ESP32 (à venir)</h3>
          <p style={muted}>
            Ici tu pourras afficher les stats temps réel de ton module ESP32 :
            hashrate, uptime, statut de connexion au pool, etc.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================
   🎨 Small reusable components
   ============================ */

const cardStyle = {
  border: "1px solid var(--bp-border)",
  borderRadius: "16px",
  padding: "20px",
  background: "var(--bp-card)",
  boxShadow: "var(--bp-shadow-soft)",
};

const muted = {
  fontSize: "0.85rem",
  color: "var(--bp-muted)",
  marginBottom: "16px",
};

function CardTitle({ title, icon }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <span style={{ fontSize: "1.4rem" }}>{icon}</span>
    </div>
  );
}

function LedgerAddress({ address }) {
  return (
    <p style={muted}>
      Adresse Ledger :
      <br />
      <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>
        {address}
      </span>
    </p>
  );
}

function TwoColumnStats({ leftLabel, leftValue, rightLabel, rightValue, extra }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "12px",
        fontSize: "0.9rem",
      }}
    >
      <div>
        <p style={{ margin: 0, color: "var(--bp-muted)" }}>{leftLabel}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{leftValue}</p>
      </div>

      <div>
        <p style={{ margin: 0, color: "var(--bp-muted)" }}>{rightLabel}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{rightValue}</p>
      </div>

      {extra?.map((row, i) => (
        <div key={i}>
          <p style={{ margin: 0, color: "var(--bp-muted)" }}>{row.label}</p>
          <p style={{ margin: 0, fontWeight: 600 }}>{row.value}</p>
        </div>
      ))}
    </div>
  );
}
