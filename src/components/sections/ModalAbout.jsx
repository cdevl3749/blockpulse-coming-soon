import "./ModalAbout.css";

export default function ModalAbout({ open, onClose }) {

  if (!open) return null;

  return (
    <div className="bp-modal-overlay" onClick={onClose}>
      <div className="bp-modal" onClick={(e) => e.stopPropagation()}>

        {/* 🔵 Bouton fermer */}
        <button className="bp-modal-close" onClick={onClose}>
          ✖
        </button>

        {/* 🔵 Photo */}
        <img
          src="/profile-christophe.jpeg"
          alt="Christophe Devleeshouwer"
          className="bp-modal-photo"
        />

        {/* 🔵 Nom */}
        <h3 className="bp-modal-name">Christophe Devleeshouwer</h3>

        <h2>À propos du fondateur</h2>

        <p>
          Je m'appelle <strong>Christophe Devleeshouwer</strong>, passionné de technologie
          et de solutions Bitcoin depuis plus de 20 ans. J'ai créé BlockPulse pour
          rendre la participation technique à Bitcoin simple, transparente et accessible
          à tous. Mon objectif : offrir une expérience claire, sécurisée et 100% indépendante
          en Belgique.
        </p>

        <a href="mailto:cdevl3749@gmail.com" className="bp-modal-btn">
          Me contacter
        </a>

      </div>
    </div>
  );
}
