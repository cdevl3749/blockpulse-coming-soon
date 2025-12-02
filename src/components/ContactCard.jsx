export default function ContactCard() {
  return (
    <section className="bp-section">
      <div className="bp-container">
        <div className="bp-card" style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "radial-gradient(circle at top left, rgba(0, 255, 200, 0.08), rgba(5, 11, 24, 0.95))",
          border: "2px solid rgba(0, 255, 200, 0.3)",
          padding: "40px"
        }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
              📬
            </div>
            <h2 style={{ margin: "0 0 12px", fontSize: "2rem" }}>
              Besoin d'aide ou d'informations ?
            </h2>
            <p style={{ color: "var(--bp-muted)", margin: "0", fontSize: "1.05rem" }}>
              L'équipe BlockPulse est à votre écoute pour toute question
            </p>
          </div>

          {/* Contact Info Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            
            {/* Email */}
            <div style={{
              background: "rgba(0, 255, 200, 0.05)",
              border: "1px solid rgba(0, 255, 200, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(0, 255, 200, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(0, 255, 200, 0.2)";
            }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                📧
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>
                Email
              </h3>
              <a 
                href="mailto:contact@blockpulse.be" 
                style={{ 
                  color: "var(--bp-accent)", 
                  textDecoration: "none",
                  fontSize: "0.95rem"
                }}
              >
                contact@blockpulse.be
              </a>
              <p style={{ 
                fontSize: "0.85rem", 
                color: "var(--bp-muted)", 
                margin: "8px 0 0" 
              }}>
                Réponse sous 24-48h
              </p>
            </div>

            {/* Discord/Community */}
            <div style={{
              background: "rgba(91, 140, 255, 0.05)",
              border: "1px solid rgba(91, 140, 255, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(91, 140, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(91, 140, 255, 0.2)";
            }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                💬
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>
                Communauté
              </h3>
              <a 
                href="#discord" 
                style={{ 
                  color: "#70c3ff", 
                  textDecoration: "none",
                  fontSize: "0.95rem"
                }}
              >
                Rejoindre Discord
              </a>
              <p style={{ 
                fontSize: "0.85rem", 
                color: "var(--bp-muted)", 
                margin: "8px 0 0" 
              }}>
                Échangez avec la communauté
              </p>
            </div>

            {/* Localisation */}
            <div style={{
              background: "rgba(255, 200, 100, 0.05)",
              border: "1px solid rgba(255, 200, 100, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s ease, border-color 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(255, 200, 100, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 200, 100, 0.2)";
            }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                📍
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>
                Localisation
              </h3>
              <p style={{ 
                color: "#ffc866", 
                margin: "0",
                fontSize: "0.95rem",
                fontWeight: "600"
              }}>
                Montzen, Belgique 🇧🇪
              </p>
              <p style={{ 
                fontSize: "0.85rem", 
                color: "var(--bp-muted)", 
                margin: "8px 0 0" 
              }}>
                Projet européen
              </p>
            </div>

          </div>

          {/* Support Info */}
          <div style={{
            background: "rgba(91, 140, 255, 0.08)",
            borderLeft: "3px solid #5b8cff",
            borderRadius: "8px",
            padding: "16px 20px"
          }}>
            <p style={{ 
              margin: "0", 
              color: "var(--bp-muted)", 
              fontSize: "0.9rem",
              lineHeight: "1.6"
            }}>
              <strong style={{ color: "#70c3ff" }}>💡 Questions fréquentes :</strong> Consultez d'abord notre{" "}
              <a href="/faq" style={{ color: "var(--bp-accent)", textDecoration: "none" }}>
                FAQ
              </a>
              {" "}pour des réponses immédiates. Pour toute question technique sur les paiements, 
              contactez directement le support de Lemon Squeezy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}