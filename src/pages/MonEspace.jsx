import { useMemo, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./MonEspace.module.css";
import users from "../data/users.json";
import ESPPreview from "../components/esp/ESPPreview.jsx";

function formatDateFR(iso) {
  try {
    return new Date(iso).toLocaleDateString("fr-BE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function MonEspace() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [inputToken, setInputToken] = useState("");

  const user = useMemo(() => {
    if (!token) return null;
    return users.find((u) => u.token === token) || null;
  }, [token]);

  /* ❌ Pas de token ou token invalide */
  if (!token || !user) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Accès à votre espace client</h1>

            <p className={styles.text}>
              Cet espace est réservé aux abonnés BlockPulse.
            </p>

            <p className={styles.text}>
              Entrez le code d’accès reçu par email après votre abonnement.
            </p>

            {/* 🔐 CONNEXION PAR TOKEN */}
            <div className={styles.tokenBox}>
              <input
                type="text"
                placeholder="Ex : BP-XXXX-XXXX"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                className={styles.tokenInput}
              />

              <button
                className={styles.primaryBtn}
                onClick={() => {
                  if (!inputToken.trim()) return;
                  navigate(`/mon-espace?token=${inputToken.trim()}`);
                }}
              >
                Accéder à mon espace
              </button>
            </div>

            <div className={styles.ctaRow}>
              <Link className={styles.secondaryBtn} to="/#abonnements">
                Voir les abonnements
              </Link>
              <Link className={styles.secondaryBtn} to="/contact">
                Contacter le support
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ⏳ Abonnement expiré */
  const isExpired = new Date(user.expiresAt) < new Date();

  if (isExpired) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Abonnement expiré</h1>

            <p className={styles.text}>
              Votre accès a expiré le {formatDateFR(user.expiresAt)}.
            </p>

            <div className={styles.meta}>
              <div>
                <strong>Email :</strong> {user.email}
              </div>
              <div>
                <strong>Plan :</strong> {user.plan}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/#abonnements">
                Renouveler mon abonnement
              </Link>
              <Link className={styles.secondaryBtn} to="/contact">
                Contacter le support
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ✅ Abonnement actif */
  const isStarter = user.plan === "starter";
  const isPro = user.plan === "pro";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* HEADER */}
          <h1 className={styles.title}>
            Bienvenue sur votre espace BlockPulse
          </h1>

          <p className={styles.text}>
            <strong>{user.email}</strong> · Plan{" "}
            <strong>{user.plan.toUpperCase()}</strong> · Accès valide jusqu’au{" "}
            {formatDateFR(user.expiresAt)}
          </p>

          {/* 🔓 BOUTON DÉCONNEXION */}
          <button
            className={styles.logoutBtn}
            onClick={() => navigate("/")}
          >
            Se déconnecter
          </button>

          {/* DONNÉES ESP32 */}
          <div className={styles.section}>
            <h2>Données ESP32</h2>
            <ESPPreview plan={user.plan} />
          </div>

          {/* UPSELL STARTER → PRO */}
          {isStarter && (
            <div className={styles.upgradeBox}>
              <h3>Débloquez le plan Pro 🚀</h3>
              <p>
                Accédez aux statistiques avancées, à l’historique complet et aux
                futures fonctionnalités BlockPulse.
              </p>

              <Link className={styles.primaryBtn} to="/#abonnements">
                Passer au plan Pro
              </Link>
            </div>
          )}

          {/* MESSAGE PRO */}
          {isPro && (
            <div className={styles.proBox}>
              <h3>Accès Pro activé ⭐</h3>
              <p>
                Vous bénéficiez de l’accès le plus complet aux données
                BlockPulse.
              </p>
            </div>
          )}

          {/* FOOTER INFOS */}
          <div className={styles.meta}>
            <div>
              <strong>Token :</strong> {user.token}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



