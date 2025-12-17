import { useState } from "react";
import usersData from "../data/users.json";
import styles from "./AdminClients.module.css";

function formatDateFR(date) {
  return new Date(date).toLocaleDateString("fr-BE");
}

function generateToken() {
  return "BP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function AdminClients() {
  const [users, setUsers] = useState(usersData);

  const extendSubscription = (index, days = 30) => {
    const updated = [...users];
    const baseDate =
      new Date(updated[index].expiresAt) > new Date()
        ? new Date(updated[index].expiresAt)
        : new Date();

    baseDate.setDate(baseDate.getDate() + days);
    updated[index].expiresAt = baseDate.toISOString();

    setUsers(updated);
    alert("✅ Abonnement prolongé (local)");
  };

  const addUser = () => {
    const email = prompt("Email du client ?");
    if (!email) return;

    const plan = prompt("Plan (starter / pro / premium) ?", "pro");

    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const newUser = {
      email,
      plan,
      token,
      expiresAt: expiresAt.toISOString(),
    };

    setUsers([...users, newUser]);
    alert("✅ Client ajouté (local)");
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin — Clients BlockPulse</h1>

        <button className={styles.addBtn} onClick={addUser}>
          ➕ Ajouter un client
        </button>

        <div className={styles.table}>
          <div className={styles.rowHead}>
            <span>Email</span>
            <span>Plan</span>
            <span>Token</span>
            <span>Expiration</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          {users.map((u, i) => {
            const expired = new Date(u.expiresAt) < new Date();

            return (
              <div className={styles.row} key={u.token}>
                <span>{u.email}</span>
                <span>{u.plan}</span>
                <span className={styles.token}>{u.token}</span>
                <span>{formatDateFR(u.expiresAt)}</span>
                <span
                  className={expired ? styles.expired : styles.active}
                >
                  {expired ? "❌ Expiré" : "✅ Actif"}
                </span>
                <button
                  className={styles.extendBtn}
                  onClick={() => extendSubscription(i)}
                >
                  +30j
                </button>
              </div>
            );
          })}
        </div>

        <p className={styles.note}>
          ⚠️ Les modifications sont locales (JSON).  
          Plus tard : automatisation PayPal + backend.
        </p>
      </div>
    </main>
  );
}
