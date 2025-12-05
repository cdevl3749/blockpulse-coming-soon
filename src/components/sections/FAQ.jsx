import { useState } from "react";
import { FaQuestionCircle, FaCreditCard, FaLock } from "react-icons/fa";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  const data = [
    {
      title: "BlockPulse est-il une loterie classique ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. BlockPulse n’est <strong>pas</strong> une loterie classique et ne
          propose aucun gain garanti.
          <br />
          <br />
          C’est un système de <strong>participation technique</strong> :
          chaque pack soutient un ESP32 connecté au pool ViaBTC via le protocole
          Stratum.
          <br />
          <br />
          Lorsque certaines conditions techniques sont détectées (nouveau job,
          activité élevée, bloc trouvé…), un <strong>tirage interne</strong> peut
          être déclenché et un <strong>bonus symbolique</strong> peut être
          attribué.
        </>
      ),
    },
    {
      title: "Est-ce un investissement ou un moyen de gagner de l’argent ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. BlockPulse n’est pas un investissement financier.
          <br />
          <br />
          Les bonus (classiques ou spéciaux) sont
          <strong> symboliques et non garantis</strong>, car ils dépendent
          entièrement de l’activité réelle du pool ViaBTC.
          <br />
          <br />
          La participation doit être vue comme un soutien à un projet technique
          expérimental.
        </>
      ),
    },
    {
      title: "Comment fonctionnent les tirages techniques ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Le nœud ESP32 échange en temps réel avec ViaBTC.
          <br />
          <br />
          Lorsqu’un événement technique se produit (nouveau job, forte activité,
          découverte d’un bloc…), un <strong>tirage</strong> peut être lancé.
          <br />
          <br />
          Chaque part = <strong>1 ticket</strong>.  
          Plus vous avez de parts, plus vos chances d’être sélectionné
          augmentent.
          <br />
          <br />
          Lorsqu’un bloc Bitcoin est détecté, un{" "}
          <strong>tirage spécial “Bloc Trouvé”</strong> peut être déclenché,
          avec un bonus <strong>plus important</strong>.
        </>
      ),
    },
    {
      title: "Quels moyens de paiement sont acceptés ?",
      icon: <FaCreditCard className="bp-icon" />,
      content: (
        <>
          Les paiements sont effectués <strong>directement</strong> vers les
          adresses officielles Ledger de BlockPulse.
          <br />
          <br />
          Vous pouvez contribuer en :
          <ul style={{ marginTop: "10px" }}>
            <li>Bitcoin (BTC)</li>
            <li>Ethereum (ETH)</li>
          </ul>
          <br />
          Aucun intermédiaire. Aucun frais supplémentaire lié à un prestataire.
        </>
      ),
    },
    {
      title: "Pourquoi certains packs n’acceptent pas le Bitcoin ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les frais du réseau Bitcoin peuvent parfois être élevés, parfois
          supérieurs au montant des <strong>petits packs</strong> (comme le pack
          Micro à 1 €).
          <br />
          <br />
          Pour éviter des frais disproportionnés, le Bitcoin n’est proposé que
          pour les packs dont le montant le permet.
        </>
      ),
    },
    {
      title: "Le code ESP32 est-il open source ?",
      icon: <FaLock className="bp-icon" />,
      content: (
        <>
          Le module ESP32 utilise un <strong>vrai protocole Stratum</strong> pour
          communiquer avec ViaBTC.
          <br />
          <br />
          Vous pourrez décider plus tard de publier le code sur GitHub afin de
          rendre le projet totalement transparent.
        </>
      ),
    },
    {
      title: "Comment sont utilisés les fonds des packs ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les contributions financent :
          <ul style={{ marginTop: "10px" }}>
            <li>Infrastructure ESP32</li>
            <li>Dashboard en temps réel</li>
            <li>Hébergement & serveur Netlify</li>
            <li>Développement continu</li>
            <li>Maintenance du nœud</li>
          </ul>
          <br />
          Tout est réinvesti dans le fonctionnement du projet.
        </>
      ),
    },
    {
      title: "Les bonus peuvent-ils être retirés en crypto ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Oui, lorsqu’ils seront activés dans la plateforme.
          <br />
          <br />
          Les bonus sont <strong>réels mais modestes</strong> et pourront être
          retirés en BTC ou ETH.
        </>
      ),
    },
  ];

  return (
    <section
      className="bp-section"
      style={{ paddingTop: "80px", background: "#0a0d17" }}
    >
      <style>{`
        *:focus,
        *:focus-visible,
        *:focus-within {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="bp-container">
        <h2>FAQ</h2>

        <div className="bp-faq">
          {data.map((item, i) => (
            <div key={i} className="bp-faq-item">
              <button
                className={`bp-faq-question ${open === i ? "open" : ""}`}
                onClick={() => toggle(i)}
              >
                <div className="bp-faq-left">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <span className="bp-faq-arrow">{open === i ? "−" : "+"}</span>
              </button>

              <div
                className="bp-faq-answer"
                style={{
                  maxHeight: open === i ? "320px" : "0px",
                  background: "#0a0d17",
                  padding: open === i ? "15px 20px" : "0px 20px",
                  borderRadius: "0 0 12px 12px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p style={{ whiteSpace: "pre-line" }}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

