import { useEffect } from "react";
import styles from "./MentionsLegales.module.css";

export default function MentionsLegales() {
  // 🔝 Scroll automatique en haut à l’arrivée sur la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Mentions légales</h1>

        {/* ======================
            ÉDITEUR
        ====================== */}
        <section id="editeur">
          <h2>Éditeur du site</h2>
          <p>
            Le site <strong>BlockPulse.be</strong> est édité par :
          </p>
          <ul>
            <li><strong>Nom / Dénomination :</strong> BlockPulse</li>
            <li><strong>Statut :</strong> Projet SaaS indépendant</li>
            <li><strong>Pays :</strong> Belgique</li>
            <li><strong>Email :</strong> contact@blockpulse.be</li>
          </ul>
        </section>

        {/* ======================
            HÉBERGEMENT
        ====================== */}
        <section id="hebergement">
          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par un prestataire professionnel assurant la
            sécurité, la disponibilité et la continuité du service.
          </p>
        </section>

        {/* ======================
            OBJET DU SERVICE
        ====================== */}
        <section id="objet">
          <h2>Objet du service</h2>
          <p>
            BlockPulse est une plateforme SaaS fournissant des
            <strong> données Bitcoin en temps réel</strong>, mesurées à l’aide
            d’un module matériel ESP32 physique.
          </p>
          <p>
            Les informations fournies sont destinées à un usage informatif et
            technique.
          </p>
        </section>

        {/* ======================
            RESPONSABILITÉ
        ====================== */}
        <section id="responsabilite">
          <h2>Responsabilité</h2>
          <p>
            L’éditeur met tout en œuvre pour assurer l’exactitude et la mise à
            jour des informations diffusées sur le site. Toutefois, aucune
            garantie n’est apportée quant à l’exactitude, la complétude ou
            l’actualité des données.
          </p>
          <p>
            Les contenus proposés ne constituent en aucun cas un conseil
            financier, juridique ou d’investissement.
          </p>
        </section>

        {/* ======================
            PROPRIÉTÉ INTELLECTUELLE
        ====================== */}
        <section id="propriete-intellectuelle">
          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments du site BlockPulse (textes, interface,
            graphismes, logo, code, architecture) est protégé par les lois
            relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, distribution ou exploitation sans autorisation
            écrite est interdite.
          </p>
        </section>

        {/* ======================
            DONNÉES PERSONNELLES
        ====================== */}
        <section id="donnees-personnelles">
          <h2>Données personnelles</h2>
          <p>
            Les traitements de données personnelles sont décrits dans la page
            dédiée :
            <br />
            <strong>Politique de confidentialité</strong>.
          </p>
        </section>

        {/* ======================
            COOKIES
        ====================== */}
        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            Le site BlockPulse utilise des cookies strictement nécessaires à son
            fonctionnement ainsi que, sous réserve de consentement, des cookies
            de mesure d’audience.
          </p>
          <p>
            Les modalités de gestion des cookies sont détaillées dans la page :
            <br />
            <strong>Politique de cookies</strong>.
          </p>
        </section>

        {/* ======================
            DROIT APPLICABLE
        ====================== */}
        <section id="droit-applicable">
          <h2>Droit applicable</h2>
          <p>
            Le présent site est soumis au droit belge. En cas de litige, les
            juridictions belges seront seules compétentes, sauf disposition
            légale impérative contraire.
          </p>
        </section>
      </div>
    </main>
  );
}
