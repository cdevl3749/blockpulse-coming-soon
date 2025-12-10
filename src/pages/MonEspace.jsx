import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import CONFIG from "../config";

// ------------------------------------------------------
// 🟡 Normalisation automatique des noms de pack
// ------------------------------------------------------
function normalizePackLabel(label) {
  const clean = label.toLowerCase();

  if (clean.includes("micro")) return "Micro";
  if (clean.includes("starter")) return "Starter";
  if (clean.includes("boost")) return "Boost";
  if (clean.includes("pro")) return "Pro";

  // Toutes variantes de Whale → Whale
  if (clean.includes("whale")) return "Whale";

  return label;
}

export default function MonEspace() {
  const [codeInput, setCodeInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const [clientInfo, setClientInfo] = useState(null);
  const [packInfo, setPackInfo] = useState(null);

  const [btcPrice, setBtcPrice] = useState(null);
  const [withdrawDone, setWithdrawDone] = useState(false);

  // ------------------------------------------------------
  // 🔄 Prix BTC (identique au Header)
  // ------------------------------------------------------
  useEffect(() => {
    async function loadBTC() {
      try {
        const res = await fetch("https://blockchain.info/ticker");
        const data = await res.json();
        setBtcPrice(data.EUR.last);
      } catch (error) {
        console.log("Erreur BTC :", error);
      }
    }

    loadBTC();
    const timer = setInterval(loadBTC, 5000);
    return () => clearInterval(timer);
  }, []);

  // ------------------------------------------------------
  // 🔐 Vérification du code d’accès
  // ------------------------------------------------------
  const handleUnlock = () => {
    const storedCode = localStorage.getItem("bp_access_code");

    if (!storedCode) {
      setError("Aucun compte n’a été activé sur cet appareil.");
      return;
    }

    if (codeInput.trim() !== storedCode) {
      setError("Code incorrect. Vérifiez celui envoyé par BlockPulse.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("bp_user_info"));
    const pack = JSON.parse(localStorage.getItem("bp_selected_pack"));

    setClientInfo(user);
    setPackInfo(pack);

    setIsUnlocked(true);
    setWithdrawDone(false);
    setError("");
  };

  // ------------------------------------------------------
  // 🚪 Déconnexion → verrouille simplement la vue
  // ------------------------------------------------------
  const handleLogout = () => {
    setIsUnlocked(false);
    setCodeInput("");
  };

  // ------------------------------------------------------
  // ✉️ Demande de retrait (EmailJS)
  // ------------------------------------------------------
  const handleWithdraw = async () => {
    setWithdrawDone(true);

    if (!clientInfo || !packInfo || !btcPrice) return;

    const { name, email } = clientInfo;
    const { label, amount } = packInfo;
    const accessCode = localStorage.getItem("bp_access_code");

    const normalized = normalizePackLabel(label);
    const packData = CONFIG.PACKS.find((p) => p.label === normalized);

    const units = packData ? packData.units : 1;

    const gainParUnite = parseFloat(CONFIG.getPotentialGainPerUnit(btcPrice));
    const gainTotal = gainParUnite * units;

    const commission = gainTotal * 0.10;
    const soldeFinal = gainTotal - commission;

    const performance =
      amount > 0 ? ((gainTotal / amount) * 100).toFixed(2) : "0.00";

    const params = {
      user_name: name,
      user_email: email,
      pack_label: normalized === "Whale" ? "Pack VIP Whale – Exclusif" : `Pack ${normalized}`,
      units,
      invested_amount: amount,
      gain_total: gainTotal.toFixed(2),
      commission: commission.toFixed(2),
      solde_final: soldeFinal.toFixed(2),
      performance,
      access_code: accessCode,
      date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "cdevl3749@gmail.com",
        "template_nh1kma8",
        params,
        "o3sNWIRA-SH7s2nsx"
      );
    } catch (err) {
      console.error("Erreur EmailJS retrait :", err);
    }
  };

  // ------------------------------------------------------
  // 🔵 Écran : saisie du code d’accès
  // ------------------------------------------------------
  if (!isUnlocked) {
    return (
      <section className="bp-section">
        <div className="bp-container" style={{ maxWidth: 500, margin: "60px auto" }}>
          <h2 style={{ textAlign: "center" }}>Mon Espace BlockPulse</h2>

          <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
            <p style={{ color: "var(--bp-muted)", marginBottom: 10 }}>
              Entrez votre <strong>code d'accès</strong>.
            </p>

            <input
              type="text"
              placeholder="Ex : BP-H79D2A"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "#1e293b",
                border: "1px solid #334155",
                color: "white",
                marginBottom: 12,
              }}
            />

            {error && <p style={{ color: "#ff7a7a" }}>{error}</p>}

            <button
              onClick={handleUnlock}
              className="bp-btn-primary"
              style={{ width: "100%", marginTop: 12 }}
            >
              Accéder
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------
  // 🔵 Chargement des données pack & client
  // ------------------------------------------------------
  if (!clientInfo || !packInfo) {
    return (
      <section className="bp-section">
        <div className="bp-container" style={{ maxWidth: 500, margin: "60px auto" }}>
          <div className="bp-card" style={{ padding: 20 }}>
            <p style={{ color: "#ff7a7a" }}>Impossible de charger vos données.</p>
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------
  // 🔵 Données du pack
  // ------------------------------------------------------
  const { name, email } = clientInfo;
  const { label, amount } = packInfo;

  const normalized = normalizePackLabel(label);
  const packData = CONFIG.PACKS.find((p) => p.label === normalized);

  const units = packData ? packData.units : 1;

  const gainParUnite = btcPrice
    ? parseFloat(CONFIG.getPotentialGainPerUnit(btcPrice))
    : 0;

  const gainTotal = gainParUnite * units;
  const commission = gainTotal * 0.10;
  const soldeFinal = gainTotal - commission;

  const performance =
    amount > 0 ? ((gainTotal / amount) * 100).toFixed(2) : "0.00";

  const accessCode = localStorage.getItem("bp_access_code");

  const displayLabel =
    normalized === "Whale" ? "Pack VIP Whale – Exclusif" : `Pack ${normalized}`;

  // ------------------------------------------------------
  // 🔵 Dashboard utilisateur
  // ------------------------------------------------------
  return (
    <section className="bp-section">
      <div className="bp-container" style={{ maxWidth: 750, margin: "40px auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Mon Espace BlockPulse</h2>
          <button onClick={handleLogout} className="bp-btn-secondary">
            Se déconnecter
          </button>
        </div>

        {/* Infos client */}
        <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
          <h3>👤 Informations client</h3>
          <p><strong>Nom :</strong> {name}</p>
          <p><strong>Email :</strong> {email}</p>
          <p><strong>Code d’accès :</strong> {accessCode}</p>
        </div>

        {/* Pack */}
        <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
          <h3>📦 Pack BlockPulse</h3>
          <p><strong>Pack :</strong> {displayLabel}</p>
          <p><strong>Unités :</strong> {units}</p>
          <p><strong>Montant investi :</strong> {amount} €</p>
        </div>

        {/* Performance */}
        <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
          <h3>📊 Performance</h3>

          <p><strong>Gain par unité :</strong> {gainParUnite.toFixed(2)} €</p>
          <p><strong>Gain total :</strong> {gainTotal.toFixed(2)} €</p>
          <p><strong>Participation technique (10%) :</strong> {commission.toFixed(2)} €</p>
          <p><strong>Montant final retiré :</strong> {soldeFinal.toFixed(2)} €</p>
          <p>
            <strong>Performance :</strong> {performance}%{" "}
            {performance > 0 ? "🚀" : performance < 0 ? "🔻" : "➖"}
          </p>

          <div
            style={{
              marginTop: 12,
              padding: 10,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              fontSize: "0.85rem",
              color: "var(--bp-muted)",
            }}
          >
            ⚠️ Une participation technique de 10% est prélevée afin d’assurer le fonctionnement du module ESP32 et du pool ViaBTC.
          </div>
        </div>

        {/* BTC */}
        <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
          <h3>📈 Prix Bitcoin</h3>
          {btcPrice ? (
            <p><strong>BTC :</strong> {btcPrice.toLocaleString("fr-FR")} €</p>
          ) : (
            <p>Chargement...</p>
          )}
        </div>

        {/* Retrait */}
        <div className="bp-card" style={{ padding: 20, marginTop: 20 }}>
          <h3>💸 Retrait</h3>
          <p style={{ color: "var(--bp-muted)" }}>
            Cliquez ci-dessous pour demander votre retrait.
          </p>

          {!withdrawDone ? (
            <button
              className="bp-btn-secondary"
              style={{ width: "100%", marginTop: 10 }}
              onClick={handleWithdraw}
            >
              Retirer mes gains : {soldeFinal.toFixed(2)} €
            </button>
          ) : (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                textAlign: "center",
                background: "rgba(0,255,200,0.1)",
                border: "1px solid rgba(0,255,200,0.4)",
                borderRadius: 8,
                color: "#00ffc8",
              }}
            >
              💚 Votre demande est enregistrée.
              <br />
              Les fonds seront versés sous <strong>48h</strong>.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

