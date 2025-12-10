import { useState } from "react";
import CONFIG from "../../config";
import ModalAbout from "./ModalAbout";

export default function Hero() {

  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="bp-hero">
      <div className="bp-container bp-hero-inner">

        {/* Texte principal */}
        <div className="bp-hero-text">

          <p className="bp-eyebrow">Module Bitcoin ESP32 — Tirages Techniques</p>

          <h1>
            BlockPulse.be  
            <span> Bonus symboliques basés sur le réseau Bitcoin</span>
          </h1>

          <p className="bp-hero-sub">
            Participez au fonctionnement d’un mini-nœud ESP32 connecté au pool ViaBTC.
            Recevez des <strong>bonus symboliques</strong> basés sur l’activité réelle
            du réseau Bitcoin et les tirages techniques générés par notre module.  
          </p>

          <p className="bp-hero-small">
            BlockPulse est un projet <strong>technique & pédagogique</strong> basé sur
            le protocole Stratum.  
            Vous soutenez notre module expérimental et recevez des tirages symboliques
            selon votre pack.  
            Ce n’est pas un investissement financier ni un jeu d’argent réglementé.
          </p>

          {/* 🎯 ACTIONS : réorganisées avec bouton fondateur centré */}
          <div 
            className="bp-hero-actions" 
            style={{
              flexDirection: "column",
              gap: "14px",
              alignItems: "center",
              textAlign: "center"
            }}
          >

            {/* Boutons principaux */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="/participer" className="bp-btn-primary bp-btn-large">
                Participer — dès {CONFIG.UNIT_PRICE.toFixed(2)} €
              </a>
              <a href="/comment-ca-marche" className="bp-btn-secondary">
                Comment ça marche ?
              </a>
            </div>

            {/* Bouton fondateur avec icône 👤 */}
            <button 
              onClick={() => setAboutOpen(true)} 
              className="bp-btn-secondary bp-founder-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                fontSize: "15px",
                borderRadius: "50px",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "18px" }}>👤</span>
              À propos du fondateur
            </button>

          </div>

        </div>

        {/* Carte système */}
        <div className="bp-hero-card">
          <h3>Statut du module en direct</h3>
          <ul>
            <li><span>Connexion pool :</span> ViaBTC</li>
            <li><span>Protocole :</span> Stratum V1</li>
            <li><span>Actualisation :</span> toutes les 5 secondes</li>
            <li>
              <span>Statut :</span>
              <span className="bp-status bp-status-on"> ONLINE</span>
            </li>
          </ul>

          <p className="bp-hero-note">
            Le module ESP32 envoie les données techniques utilisées pour les tirages.
            En cas d'indisponibilité, une source cloud de secours prend le relais.
          </p>
        </div>

      </div>

      {/* Modal fondateur */}
      <ModalAbout open={aboutOpen} onClose={() => setAboutOpen(false)} />

    </section>
  );
}
