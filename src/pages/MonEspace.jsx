import { useMemo, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./MonEspace.module.css";
import users from "../data/users.json";
import ESPPreview from "../components/esp/ESPPreview.jsx";

function formatDateFR(iso) {
  try {
    return new Date(iso).toLocaleDateString("fr-BE");
  } catch {
    return iso;
  }
}

function daysBetween(a, b) {
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
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

  const now = new Date();
  const expiresAt = new Date(user.expiresAt);
  const daysRemaining = daysBetween(now, expiresAt);

  const isTrial = user.trial === true;
  const isStarter = user.plan === "starter";
  const isPro = user.plan === "pro";

  const graceEnd = new Date(expiresAt);
  graceEnd.setDate(graceEnd.getDate() + 7);

  const isExpiredHard = now > graceEnd;
  const isGracePeriod = isTrial && now > expiresAt && now <= graceEnd;
  const isTrialEndingSoon = isTrial && daysRemaining <= 2 && daysRemaining > 0;

  /* ❌ Coupure totale après période de grâce */
  if (isExpiredHard) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Accès expiré</h1>

            <p className={styles.text}>
              Votre accès a expiré le {formatDateFR(expiresAt)}.
            </p>

            <div className={styles.meta}>
              <div>
                <strong>Email :</strong> {user.email}
              </div>
              <div>
                <strong>Plan :</strong>{" "}
                {isTrial ? "ESSAI PRO" : user.plan.toUpperCase()}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/#abonnements">
                Choisir un abonnement
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

  /* ✅ Accès actif ou période de grâce */
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Bienvenue sur votre espace BlockPulse
          </h1>

          <p className={styles.text}>
            <strong>{user.email}</strong> ·{" "}
            <strong>
              {isTrial ? "Accès Pro d’essai" : `Plan ${user.plan.toUpperCase()}`}
            </strong>{" "}
            · Accès valide jusqu’au {formatDateFR(expiresAt)}
          </p>

          {/* 🔔 Alerte J-2 */}
          {isTrialEndingSoon && (
            <div className={styles.upgradeBox}>
              <h3>⚠️ Fin de l’essai imminente</h3>
              <p>
                Votre accès Pro d’essai se termine dans{" "}
                <strong>{daysRemaining} jour(s)</strong>. Pour conserver l’accès
                aux données, choisissez un abonnement.
              </p>
              <Link className={styles.primaryBtn} to="/#abonnements">
                Choisir un abonnement
              </Link>
            </div>
          )}

          {/* 🔒 Mode grâce */}
          {isGracePeriod && (
            <div className={styles.upgradeBox}>
              <h3>⏳ Essai terminé — accès limité</h3>
              <p>
                Votre essai gratuit est terminé. Certaines fonctionnalités sont
                désormais limitées. Choisissez un abonnement pour conserver
                l’accès complet.
              </p>
              <Link className={styles.primaryBtn} to="/#abonnements">
                Choisir un abonnement
              </Link>
            </div>
          )}

          <button className={styles.logoutBtn} onClick={() => navigate("/")}>
            Se déconnecter
          </button>

          <div className={styles.section}>
            <h2>Données ESP32</h2>
            <ESPPreview plan={user.plan} limited={isGracePeriod} />
          </div>

          {/* Upsell Starter */}
          {isStarter && !isTrial && (
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

          {/* Pro payant */}
          {isPro && !isTrial && (
            <div className={styles.proBox}>
              <h3>Accès Pro activé ⭐</h3>
              <p>
                Vous bénéficiez de l’accès le plus complet aux données BlockPulse.
              </p>
            </div>
          )}

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



