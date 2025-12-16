import { useEffect } from "react";
import styles from "./PolitiqueCookies.module.css";

export default function PolitiqueCookies() {
  // 🔝 Scroll automatique en haut à l’arrivée sur la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Politique de cookies</h1>

        {/* ======================
            INTRODUCTION
        ====================== */}
        <section id="introduction">
          <p>
            La présente politique de cookies explique comment le site
            <strong> BlockPulse.be</strong> utilise des cookies et autres
            traceurs, conformément à la réglementation européenne (RGPD et
            directive ePrivacy).
          </p>
        </section>

        {/* ======================
            QU’EST-CE QU’UN COOKIE
        ====================== */}
        <section id="definition">
          <h2>Qu’est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre appareil lors
            de la consultation d’un site internet. Il permet notamment de
            reconnaître un utilisateur, de mémoriser ses préférences ou de
            collecter des informations statistiques.
          </p>
        </section>

        {/* ======================
            TYPES DE COOKIES
        ====================== */}
        <section id="types">
          <h2>Types de cookies utilisés</h2>
          <p>
            Le site BlockPulse utilise les catégories de cookies suivantes :
          </p>
          <ul>
            <li>
              <strong>Cookies strictement nécessaires :</strong> indispensables
              au fonctionnement du site (navigation, sécurité, accès aux
              espaces protégés).
            </li>
            <li>
              <strong>Cookies de mesure d’audience :</strong> utilisés pour
              analyser l’utilisation du site et améliorer les performances,
              uniquement avec votre consentement.
            </li>
            <li>
              <strong>Cookies marketing :</strong> susceptibles d’être utilisés
              pour des campagnes publicitaires ou de remarketing, uniquement
              avec votre consentement.
            </li>
          </ul>
        </section>

        {/* ======================
            CONSENTEMENT
        ====================== */}
        <section id="consentement">
          <h2>Consentement</h2>
          <p>
            Lors de votre première visite sur le site, un bandeau de gestion des
            cookies vous permet d’accepter, de refuser ou de paramétrer le dépôt
            des cookies non essentiels.
          </p>
          <p>
            Aucun cookie non strictement nécessaire n’est déposé sans votre
            consentement préalable.
          </p>
        </section>

        {/* ======================
            DURÉE DE CONSERVATION
        ====================== */}
        <section id="duree">
          <h2>Durée de conservation</h2>
          <p>
            Les cookies sont conservés pour une durée maximale de
            <strong> 13 mois</strong>, conformément aux recommandations des
            autorités européennes, sauf obligation légale contraire.
          </p>
        </section>

        {/* ======================
            GESTION DES COOKIES
        ====================== */}
        <section id="gestion">
          <h2>Gestion des cookies</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de
            cookies via le module de gestion des cookies disponible sur le site
            ou en paramétrant votre navigateur.
          </p>
        </section>

        {/* ======================
            MODIFICATIONS
        ====================== */}
        <section id="modifications">
          <h2>Modification de la politique</h2>
          <p>
            La présente politique de cookies peut être modifiée à tout moment
            afin de refléter les évolutions légales, techniques ou fonctionnelles
            du site.
          </p>
        </section>
      </div>
    </main>
  );
}
