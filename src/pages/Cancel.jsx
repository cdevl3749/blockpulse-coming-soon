export default function Cancel() {
  return (
    <div
      className="bp-cancel-page"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        className="bp-card"
        style={{
          background: "var(--bp-card)",
          border: "1px solid var(--bp-border)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--bp-shadow-soft)",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: "4rem", marginBottom: "20px", color: "#ff7070" }}>
          ❌
        </div>

        {/* Title */}
        <h1 style={{ marginBottom: "10px" }}>Paiement annulé</h1>

        {/* Subtitle */}
        <p
          style={{
            color: "var(--bp-muted)",
            fontSize: "1rem",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          La transaction n’a pas été finalisée.  
          Vous pouvez réessayer à tout moment.
        </p>

        {/* Button */}
        <a
          href="/participer"
          style={{
            display: "inline-block",
            background: "#ff7070",
            padding: "12px 24px",
            borderRadius: "12px",
            color: "#000",
            fontWeight: "600",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Retour à la page de participation
        </a>
      </div>
    </div>
  );
}
