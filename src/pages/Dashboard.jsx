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
      .then((data) => {
        if (!data || data.error) {
          console.error("Erreur getBtcRecent:", data?.error);
          setRecentBTC(null);
        } else {
          setRecentBTC(data);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch getBtcRecent:", err);
        setRecentBTC(null);
      });

    fetch("/.netlify/functions/getEthRecent")
      .then((r) => r.json())
      .then((data) => {
        if (!data || data.error) {
          console.error("Erreur getEthRecent:", data?.error);
          setRecentETH(null);
        } else {
          setRecentETH(data);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch getEthRecent:", err);
        setRecentETH(null);
      });
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
          Vue d'ensemble des paiements crypto, SEPA et de l'activité du site.
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
                {recentBTC.count ?? 0}
              </p>
              <p>
                <strong>Total BTC :</strong>{" "}
                {typeof recentBTC.totalBTC === "number"
                  ? recentBTC.totalBTC.toFixed(8)
                  : "0.00000000"}
              </p>
              <p>
                <strong>Total EUR :</strong>{" "}
                {typeof recentBTC.totalEUR === "number"
                  ? `${recentBTC.totalEUR.toFixed(2)} €`
                  : "Données indisponibles"}
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
                {recentETH.count ?? 0}
              </p>
              <p>
                <strong>Total ETH :</strong>{" "}
                {typeof recentETH.totalETH === "number"
                  ? recentETH.totalETH.toFixed(6)
                  : "0.000000"}
              </p>
              <p>
                <strong>Total EUR :</strong>{" "}
                {typeof recentETH.totalEUR === "number"
                  ? `${recentETH.totalEUR.toFixed(2)} €`
                  : "Données indisponibles"}
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
        {/* 📄 Paiements SEPA enregistrés */}
        {/* ====================================== */}
        <div className="bp-card" style={cardStyle}>
          <h3 style={{ marginBottom: "12px" }}>Paiements SEPA enregistrés</h3>
          <SEPAList />
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
   📄 Liste paiements SEPA
   ============================ */

function SEPAList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [markingKey, setMarkingKey] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPayments() {
    setLoading(true);
    setErr(null);
    setMessage(null);

    try {
      const res = await fetch("/.netlify/functions/getSepaPayments");
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Erreur lors du chargement");
      }

      // On attend un tableau "payments"
      setItems(Array.isArray(json.payments) ? json.payments : []);
    } catch (e) {
      console.error("getSepaPayments error:", e);
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkPaid(p) {
    const key = `${p.email}__${p.createdAt}`;

    if (!window.confirm(`Confirmer que le paiement de ${p.name} est reçu ?`)) {
      return;
    }

    setMarkingKey(key);
    setMessage(null);

    try {
      const res = await fetch("/.netlify/functions/markSepaPaid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: p.name,
          email: p.email,
          createdAt: p.createdAt,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "Erreur lors de la mise à jour");
      }

      const paidAt = json.paidAt || new Date().toISOString();

      setItems((prev) =>
        prev.map((item) => {
          if (
            item.name === p.name &&
            item.email === p.email &&
            item.createdAt === p.createdAt
          ) {
            return {
              ...item,
              paid: true,
              paidAt,
            };
          }
          return item;
        })
      );

      setMessage("✅ Paiement marqué comme reçu.");
    } catch (e) {
      console.error("markSepaPaid error:", e);
      setMessage("❌ Impossible de marquer ce paiement comme reçu.");
    } finally {
      setMarkingKey(null);
    }
  }

  if (loading) {
    return <p style={muted}>Chargement des paiements SEPA…</p>;
  }

  if (err) {
    return (
      <p style={{ ...muted, color: "#ff8888" }}>
        Erreur lors du chargement : {err}
      </p>
    );
  }

  if (!items.length) {
    return <p style={muted}>Aucun paiement SEPA enregistré pour l’instant.</p>;
  }

  return (
    <div style={{ marginTop: "4px" }}>
      {message && (
        <div
          style={{
            marginBottom: "10px",
            fontSize: "0.85rem",
            color: message.startsWith("✅") ? "#00ffc8" : "#ff8888",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.85rem",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Nom</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Pack</th>
              <th style={thStyle}>Mode</th>
              <th style={thStyle}>Unités</th>
              <th style={thStyle}>Créé le</th>
              <th style={thStyle}>Statut</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, idx) => {
              const key = `${p.email}__${p.createdAt || idx}`;
              const isPaid = Boolean(p.paid);
              const rowBg = isPaid
                ? "rgba(0, 255, 200, 0.06)"
                : "transparent";

              return (
                <tr key={key} style={{ background: rowBg }}>
                  <td style={tdStyle}>{p.name || "-"}</td>
                  <td style={tdStyle}>{p.email || "-"}</td>
                  <td style={tdStyle}>{p.packLabel || p.packId || "-"}</td>
                  <td style={tdStyle}>{p.mode || "sepa"}</td>
                  <td style={tdStyle}>{p.units ?? "-"}</td>
                  <td style={tdStyle}>
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td style={tdStyle}>
                    {isPaid ? (
                      <span style={{ color: "#00ffc8" }}>
                        ✓ Payé{" "}
                        {p.paidAt
                          ? `(${new Date(p.paidAt).toLocaleDateString()})`
                          : ""}
                      </span>
                    ) : (
                      <span style={{ color: "#ffb366" }}>En attente</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isPaid ? (
                      <span style={{ fontSize: "0.8rem", color: "#777" }}>
                        Déjà marqué comme payé
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkPaid(p)}
                        disabled={markingKey === key}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "999px",
                          border: "1px solid var(--bp-border)",
                          background:
                            markingKey === key
                              ? "rgba(255,255,255,0.05)"
                              : "transparent",
                          color: "#fff",
                          fontSize: "0.8rem",
                          cursor:
                            markingKey === key ? "not-allowed" : "pointer",
                        }}
                      >
                        {markingKey === key
                          ? "Mise à jour…"
                          : "Marquer comme payé"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
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

const thStyle = {
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  fontWeight: "600",
  color: "#c9d4e5",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "6px 10px",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  verticalAlign: "top",
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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div>
          <p style={{ ...muted, marginBottom: "4px" }}>{leftLabel}</p>
          <p style={{ fontSize: "1rem", fontWeight: 600 }}>{leftValue}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ ...muted, marginBottom: "4px" }}>{rightLabel}</p>
          <p style={{ fontSize: "1rem", fontWeight: 600 }}>{rightValue}</p>
        </div>
      </div>

      {extra && extra.length > 0 && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "8px",
            marginTop: "8px",
          }}
        >
          {extra.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                color: "var(--bp-muted)",
                marginBottom: "4px",
              }}
            >
              <span>{row.label}</span>
              <span style={{ fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

