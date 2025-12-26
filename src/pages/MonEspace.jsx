import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./MonEspace.module.css";
import users from "../data/users.json";
import ESPPreview from "../components/esp/ESPPreview.jsx";

const STARTER_DAILY_LIMIT = 10;

/** 🔐 Mini-session (tab) */
const AUTH_TOKEN_KEY = "bp_auth_token";
const AUTH_PLAN_KEY = "bp_auth_plan";

function getTodayKey(token) {
  const d = new Date().toISOString().slice(0, 10);
  return `bp_insight_${token}_${d}`;
}

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
  const [usedToday, setUsedToday] = useState(0);

  /* 🔐 User */
  const user = useMemo(() => {
    if (!token) return null;
    return users.find((u) => u.token === token) || null;
  }, [token]);

  /* 🧠 Plan & dates (SAFE même si user null) */
  const plan = user?.plan ?? "free";
  const isTrial = user?.trial === true;

  const now = new Date();
  const expiresAt = user?.expiresAt ? new Date(user.expiresAt) : null;

  const trialActive = isTrial && expiresAt && now <= expiresAt;

  const graceEnd = expiresAt ? new Date(expiresAt) : null;
  if (graceEnd) graceEnd.setDate(graceEnd.getDate() + 7);

  const inGracePeriod =
    isTrial && expiresAt && now > expiresAt && now <= graceEnd;

  const expiredHard = isTrial && expiresAt && graceEnd && now > graceEnd;

  const daysRemaining =
    trialActive && expiresAt ? daysBetween(now, expiresAt) : 0;

  const trialEndingSoon =
  trialActive && daysRemaining <= 7 && daysRemaining > 0;

  const isStarter = plan === "starter";
  const isPro = plan === "pro" && !isTrial;

  /* ✅ Mini-session */
  useEffect(() => {
    if (!user?.token) return;
    sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
    sessionStorage.setItem(AUTH_PLAN_KEY, user.plan || "free");
  }, [user]);

  /* 🔁 Si le plan change → reconnexion */
  useEffect(() => {
    if (!user?.token) return;

    const storedPlan = sessionStorage.getItem(AUTH_PLAN_KEY);
    const currentPlan = user.plan || "free";

    if (storedPlan && storedPlan !== currentPlan) {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(AUTH_PLAN_KEY);
      navigate("/mon-espace");
      return;
    }

    sessionStorage.setItem(AUTH_PLAN_KEY, currentPlan);
  }, [user, navigate]);

  /* 🔢 Compteur Starter */
  useEffect(() => {
    if (!user || !isStarter) {
      setUsedToday(0);
      return;
    }
    const key = getTodayKey(user.token);
    const used = Number(localStorage.getItem(key) || "0");
    setUsedToday(used);
  }, [isStarter, user]);

  /* ❌ PAS DE TOKEN */
  if (!token || !user) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Accès à votre espace client</h1>

            <input
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Ex : BP-XXXX-XXXX"
              className={styles.tokenInput}
            />

            <button
              className={styles.primaryBtn}
              onClick={() =>
                inputToken.trim() &&
                navigate(`/mon-espace?token=${inputToken.trim()}`)
              }
            >
              Accéder
            </button>

            <Link className={styles.secondaryBtn} to="/#abonnements">
              Voir les abonnements
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ❌ ACCÈS COUPÉ APRÈS ESSAI + GRÂCE */
  if (expiredHard) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Accès expiré</h1>
            <p>
              Votre essai s’est terminé le{" "}
              <strong>{formatDateFR(user.expiresAt)}</strong>.
            </p>

            <Link className={styles.primaryBtn} to="/#abonnements">
              Choisir un abonnement
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const blurCards = inGracePeriod && !isStarter && !isPro;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <button
            className={styles.logoutBtn}
            onClick={() => {
              sessionStorage.removeItem(AUTH_TOKEN_KEY);
              sessionStorage.removeItem(AUTH_PLAN_KEY);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>

          <h1>BlockPulse Insight</h1>

          <p className={styles.text}>
            <strong>{user.email}</strong> ·{" "}
            <strong>
              {trialActive ? "ESSAI PRO (7 jours)" : `PLAN ${plan.toUpperCase()}`}
            </strong>
          </p>

          {/* ⚠️ MESSAGE UX ESSAI — COPYWRITING VALIDÉ */}
          {trialEndingSoon && (
            <div className={styles.alertBox}>
              {daysRemaining === 1 ? (
                <>
                  ⏰ <strong>Dernier jour d’essai Pro</strong>
                  <br />
                  Passez au plan Pro pour conserver l’accès complet.
                </>
              ) : (
                <>
                  ⚠️ Votre essai Pro se termine dans{" "}
                  <strong>{daysRemaining} jours</strong>
                  <br />
                  Continuez à accéder aux données ESP32 sans interruption.
                </>
              )}
              <br />
              <Link to="/#abonnements">Passer au plan Pro</Link>
            </div>
          )}

          {inGracePeriod && (
            <div className={styles.alertBox}>
              ⏳ Essai terminé — aperçu limité.
              <br />
              <Link to="/#abonnements">Passer à Starter ou Pro</Link>
            </div>
          )}

          {isStarter && (
            <p className={styles.text}>
              🔢 Accès aujourd’hui :{" "}
              <strong>
                {STARTER_DAILY_LIMIT - usedToday} / {STARTER_DAILY_LIMIT}
              </strong>
            </p>
          )}

          {isPro && (
            <p className={styles.text}>⭐ Accès illimité à BlockPulse Insight</p>
          )}

          <Link
            to="/tools/bitcoin-actif"
            className={styles.primaryBtn}
            style={{ marginTop: "1rem" }}
          >
            🚀 Accéder à l’analyse ESP32
          </Link>

          <div
            className={blurCards ? styles.blurred : ""}
            style={{ marginTop: "1rem" }}
          >
            <ESPPreview plan={plan} token={user.token} limited={blurCards} />
          </div>

          {blurCards && (
            <div className={styles.upgradeBox}>
              <h3>Débloquez l’accès complet 🚀</h3>
              <Link className={styles.primaryBtn} to="/#abonnements">
                Voir les plans Starter & Pro
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}






