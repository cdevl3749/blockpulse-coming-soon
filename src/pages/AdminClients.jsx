import { useState } from "react";

export default function AdminClients() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pack, setPack] = useState("Pack Micro");
  const [amount, setAmount] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [done, setDone] = useState(false);

  const generateCode = () => {
    return "BP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const activateClient = () => {
    if (!name || !email || !pack || !amount) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    const code = generateCode();
    setGeneratedCode(code);

    // Enregistrer dans localStorage
    localStorage.setItem(
      "bp_user_info",
      JSON.stringify({ name, email })
    );

    localStorage.setItem(
      "bp_selected_pack",
      JSON.stringify({ label: pack, amount })
    );

    localStorage.setItem("bp_access_code", code);

    setDone(true);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🛠️ Administration BlockPulse</h2>
      <p style={{ color: "#ccc" }}>
        Active un accès client après confirmation du paiement.
      </p>

      {done ? (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "rgba(0,255,200,0.10)",
            border: "1px solid rgba(0,255,200,0.4)",
            borderRadius: "10px",
          }}
        >
          <h3>✔ Compte activé avec succès</h3>

          <p>
            Voici le message à envoyer au client :
          </p>

          <textarea
            readOnly
            style={{
              width: "100%",
              height: "180px",
              marginTop: "8px",
              padding: "10px",
              background: "#0f172a",
              color: "#00ffc8",
              borderRadius: "8px",
              border: "1px solid #334155",
            }}
            value={`Bonjour ${name},

Votre paiement a été confirmé. Votre espace BlockPulse est maintenant actif.

🔗 Accéder à votre dashboard : https://blockpulse.be/mon-espace  
🔐 Votre code d'accès : ${generatedCode}

Merci pour votre confiance !
BlockPulse`}
          ></textarea>
        </div>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <label>Nom du client</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                background: "#1e293b",
                color: "white",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Email du client</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                background: "#1e293b",
                color: "white",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Pack choisi</label>
            <select
              value={pack}
              onChange={(e) => setPack(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                background: "#1e293b",
                color: "white",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            >
              <option>Pack Micro</option>
              <option>Pack Starter</option>
              <option>Pack Boost</option>
              <option>Pack Pro</option>
              <option>Pack VIP Whale</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Montant investi (€ ou BTC/ETH)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                background: "#1e293b",
                color: "white",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            />
          </div>

          <button
            onClick={activateClient}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #00ffc8, #5b8cff)",
              color: "#020816",
              fontSize: "1rem",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✔ Activer l’accès client
          </button>
        </>
      )}
    </div>
  );
}

