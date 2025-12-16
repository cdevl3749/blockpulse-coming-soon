import { useEffect } from "react";
import styles from "./PolitiqueConfidentialite.module.css";

export default function PolitiqueConfidentialite() {
  // 🔝 Scroll automatique en haut à l’arrivée sur la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Politique de confidentialité</h1>

        {/* ======================
            INTRODUCTION
        ====================== */}
        <section id="introduction">
          <p>
            La présente politique de confidentialité a pour objectif d’informer
            les utilisateurs du site <strong>BlockPulse.be</strong> de la manière
            dont leurs données personnelles sont collectées, utilisées et
            protégées, conformément au Règlement Général sur la Protection des
            Données (RGPD).
          </p>
        </section>

        {/* ======================
            RESPONSABLE DU TRAITEMENT
        ====================== */}
        <section id="responsable">
          <h2>Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles est :
          </p>
          <ul>
            <li><strong>Nom :</strong> BlockPulse</li>
            <li><strong>Pays :</strong> Belgique</li>
            <li><strong>Email :</strong> contact@blockpulse.be</li>
          </ul>
        </section>

        {/* ======================
            DONNÉES COLLECTÉES
        ====================== */}
        <section id="donnees-collectees">
          <h2>Données collectées</h2>
          <p>
            BlockPulse peut être amené à collecter les données personnelles
            suivantes :
          </p>
          <ul>
            <li>Adresse email</li>
            <li>Données de connexion (compte utilisateur)</li>
            <li>Données liées aux paiements (traitées par des prestataires tiers)</li>
            <li>Données techniques de navigation</li>
          </ul>
        </section>

        {/* ======================
            FINALITÉS
        ====================== */}
        <section id="finalites">
          <h2>Finalités du traitement</h2>
          <p>
            Les données collectées sont utilisées uniquement pour :
          </p>
          <ul>
            <li>Fournir et gérer l’accès au service BlockPulse</li>
            <li>Gérer les abonnements et paiements</li>
            <li>Assurer la sécurité du site et des utilisateurs</li>
            <li>Améliorer le service et l’expérience utilisateur</li>
          </ul>
        </section>

        {/* ======================
            BASE LÉGALE
        ====================== */}
        <section id="base-legale">
          <h2>Base légale du traitement</h2>
          <p>
            Les traitements de données reposent sur :
          </p>
          <ul>
            <li>L’exécution d’un contrat (accès au service)</li>
            <li>Le respect d’obligations légales</li>
            <li>Le consentement de l’utilisateur lorsque requis</li>
            <li>L’intérêt légitime de l’éditeur</li>
          </ul>
        </section>

        {/* ======================
            DURÉE DE CONSERVATION
        ====================== */}
        <section id="conservation">
          <h2>Durée de conservation</h2>
          <p>
            Les données personnelles sont conservées uniquement pendant la durée
            nécessaire aux finalités pour lesquelles elles ont été collectées,
            ou conformément aux obligations légales en vigueur.
          </p>
        </section>

        {/* ======================
            PARTAGE DES DONNÉES
        ====================== */}
        <section id="partage">
          <h2>Partage des données</h2>
          <p>
            Les données personnelles peuvent être transmises à des prestataires
            techniques strictement nécessaires au fonctionnement du service
            (hébergement, paiement, sécurité).
          </p>
          <p>
            Aucune donnée personnelle n’est vendue à des tiers.
          </p>
        </section>

        {/* ======================
            DROITS DES UTILISATEURS
        ====================== */}
        <section id="droits">
          <h2>Droits des utilisateurs</h2>
          <p>
            Conformément au RGPD, chaque utilisateur dispose des droits suivants :
          </p>
          <ul>
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d’opposition</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p>
            Toute demande peut être adressée à :
            <br />
            <strong>contact@blockpulse.be</strong>
          </p>
        </section>

        {/* ======================
            COOKIES
        ====================== */}
        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            Le site BlockPulse utilise des cookies nécessaires à son
            fonctionnement et, sous réserve de consentement, des cookies de
            mesure d’audience.
          </p>
          <p>
            Pour plus d’informations, veuillez consulter la page
            <strong> Politique de cookies</strong>.
          </p>
        </section>

        {/* ======================
            MODIFICATIONS
        ====================== */}
        <section id="modifications">
          <h2>Modification de la politique</h2>
          <p>
            La présente politique de confidentialité peut être modifiée à tout
            moment afin de garantir sa conformité avec la législation en
            vigueur.
          </p>
        </section>
      </div>
    </main>
  );
}
