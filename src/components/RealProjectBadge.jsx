export default function RealProjectBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        borderRadius: "999px",
        background: "rgba(0, 255, 180, 0.08)",
        border: "1px solid rgba(0, 255, 180, 0.35)",
        color: "#00ffb4",
        fontWeight: 600,
        fontSize: "15px",
        boxShadow: "0 0 18px rgba(0,255,180,0.25)",
      }}
    >
      {/* 🇧🇪 Drapeau belge en SVG (ne dépend pas des emojis) */}
      <span
        style={{
          width: "22px",
          height: "14px",
          borderRadius: "3px",
          overflow: "hidden",
          boxShadow: "0 0 6px rgba(0,0,0,0.35)",
        }}
      >
        <svg
          viewBox="0 0 3 2"
          width="22"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1" height="2" x="0" fill="#000000" />
          <rect width="1" height="2" x="1" fill="#FFD700" />
          <rect width="1" height="2" x="2" fill="#E30613" />
        </svg>
      </span>

      <span>Projet réel basé sur un module ESP32 actif</span>

      {/* Petit point lumineux à droite */}
      <span
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          background: "#00ffb4",
          boxShadow: "0 0 10px #00ffb4",
          marginLeft: "4px",
        }}
      ></span>
    </div>
  );
}



