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

function formatDateEN(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB");
  } catch {
    return iso;
  }
}

function daysBetween(a, b) {
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}

export default function MonEspaceEN() {
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

  /* 🧠 Plan & dates */
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

  /* 🔁 Plan change protection */
  useEffect(() => {
    if (!user?.token) return;

    const storedPlan = sessionStorage.getItem(AUTH_PLAN_KEY);
    const currentPlan = user.plan || "free";

    if (storedPlan && storedPlan !== currentPlan) {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(AUTH_PLAN_KEY);
      navigate("/en/mon-espace");
      return;
    }

    sessionStorage.setItem(AUTH_PLAN_KEY, currentPlan);
  }, [user, navigate]);

  /* 🔢 Starter counter */
  useEffect(() => {
    if (!user || !isStarter) {
      setUsedToday(0);
      return;
    }
    const key = getTodayKey(user.token);
    const used = Number(localStorage.getItem(key) || "0");
    setUsedToday(used);
  }, [isStarter, user]);

  /* ❌ NO TOKEN */
  if (!token || !user) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Client area access</h1>

            <input
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="e.g. BP-XXXX-XXXX"
              className={styles.tokenInput}
            />

            <button
              className={styles.primaryBtn}
              onClick={() =>
                inputToken.trim() &&
                navigate(`/en/mon-espace?token=${inputToken.trim()}`)
              }
            >
              Access
            </button>

            <Link className={styles.secondaryBtn} to="/en/#abonnements">
              View plans
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ❌ EXPIRED */
  if (expiredHard) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Access expired</h1>
            <p>
              Your trial ended on{" "}
              <strong>{formatDateEN(user.expiresAt)}</strong>.
            </p>

            <Link className={styles.primaryBtn} to="/en/#abonnements">
              Choose a plan
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
              navigate("/en");
            }}
          >
            Log out
          </button>

          <h1>BlockPulse Insight</h1>

          <p className={styles.text}>
            <strong>{user.email}</strong> ·{" "}
            <strong>
              {trialActive
                ? "PRO TRIAL (7 days)"
                : `PLAN ${plan.toUpperCase()}`}
            </strong>
          </p>

          {trialEndingSoon && (
            <div className={styles.alertBox}>
              {daysRemaining === 1 ? (
                <>
                  ⏰ <strong>Last day of Pro trial</strong>
                  <br />
                  Upgrade to Pro to keep full access.
                </>
              ) : (
                <>
                  ⚠️ Your Pro trial ends in{" "}
                  <strong>{daysRemaining} days</strong>
                  <br />
                  Keep uninterrupted access to ESP32 data.
                </>
              )}
              <br />
              <Link to="/en/#abonnements">Upgrade to Pro</Link>
            </div>
          )}

          {inGracePeriod && (
            <div className={styles.alertBox}>
              ⏳ Trial ended — limited preview.
              <br />
              <Link to="/en/#abonnements">Upgrade to Starter or Pro</Link>
            </div>
          )}

          {isStarter && (
            <p className={styles.text}>
              🔢 Today’s access:{" "}
              <strong>
                {STARTER_DAILY_LIMIT - usedToday} / {STARTER_DAILY_LIMIT}
              </strong>
            </p>
          )}

          {isPro && (
            <p className={styles.text}>⭐ Unlimited access to BlockPulse Insight</p>
          )}

          <Link
            to="/en/tools/bitcoin-network-status"
            className={styles.primaryBtn}
            style={{ marginTop: "1rem" }}
            >
            🚀 Access ESP32 analysis
          </Link>

          <div
            className={blurCards ? styles.blurred : ""}
            style={{ marginTop: "1rem" }}
          >
            <ESPPreview
            plan={plan}
            token={user.token}
            limited={blurCards}
            lang="en"
            />
          </div>

          {blurCards && (
            <div className={styles.upgradeBox}>
              <h3>Unlock full access 🚀</h3>
              <Link className={styles.primaryBtn} to="/en/#abonnements">
                View Starter & Pro plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
