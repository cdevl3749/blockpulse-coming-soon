import { useState } from "react";
import { FaQuestionCircle, FaCreditCard, FaLock, FaUniversity } from "react-icons/fa";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  const data = [
    {
      title: "BlockPulse est-il une loterie classique ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. BlockPulse n’est <strong>pas</strong> une loterie classique.
          <br /><br />
          C’est une <strong>expérience technique</strong> : un module ESP32 communique en temps réel avec le pool ViaBTC via le protocole Stratum.
          <br /><br />
          Lors d’événements techniques (nouveau job, activité élevée, bloc trouvé…), un <strong>tirage interne</strong> peut être déclenché.
          Les bonus attribués sont <strong>symboliques et non garantis</strong>.
        </>
      ),
    },

    {
      title: "Est-ce un investissement ou un moyen de gagner de l’argent ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. BlockPulse n’est <strong>pas</strong> un investissement financier.
          <br /><br />
          Les bonus distribués lors des tirages techniques sont <strong>symboliques</strong> 
          et dépendent de l’activité réelle du pool ViaBTC.
          <br /><br />
          Il faut donc voir votre participation comme un <strong>soutien</strong> à un projet tech expérimental.
        </>
      ),
    },

    {
      title: "Comment fonctionnent les tirages techniques ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Le module ESP32 analyse les signaux du pool ViaBTC en temps réel.
          <br /><br />
          Lorsqu’un événement technique spécifique est détecté (nouveau job, activité élevée, bloc trouvé…), 
          un <strong>tirage technique</strong> peut être activé.
          <br /><br />
          Chaque part = <strong>1 ticket</strong>.
          Plus vous possédez de parts, plus vos chances d’être tiré au sort augmentent.
          <br /><br />
          Lorsqu’un bloc Bitcoin est détecté, un <strong>tirage spécial “Bloc Trouvé”</strong> peut également être déclenché.
        </>
      ),
    },

    {
      title: "Quels moyens de paiement sont acceptés ?",
      icon: <FaCreditCard className="bp-icon" />,
      content: (
        <>
          Trois modes de paiement sont disponibles :
          <ul style={{ marginTop: "10px" }}>
            <li>💰 Bitcoin (BTC)</li>
            <li>💠 Ethereum (ETH)</li>
            <li>💳 Virement bancaire SEPA (IBAN belge)</li>
          </ul>
          <br />
          Les paiements crypto sont envoyés vers nos <strong>adresses officielles BTC/ETH</strong>.
          <br /><br />
          Le virement SEPA permet de payer facilement <strong>depuis n’importe quelle banque</strong>.
        </>
      ),
    },

    {
      title: "Comment payer par SEPA ? (3 étapes simples)",
      icon: <FaUniversity className="bp-icon" />,
      content: (
        <>
          Le virement SEPA est le moyen le plus simple pour contribuer sans crypto.
          <br /><br />
          <strong>Étape 1 :</strong> Choisissez un pack puis cliquez sur
          <strong> “Payer par virement SEPA”</strong>.
          <br /><br />
          <strong>Étape 2 :</strong> Copiez l’IBAN affiché dans la fenêtre.
          <br />
          Un IBAN belge : <strong>BE23 0637 6823 5991</strong>.
          <br /><br />
          <strong>Étape 3 :</strong> Effectuez un virement depuis votre application bancaire
          (Belfius, ING, KBC, Bancontact, Revolut, etc.) avec la communication indiquée :
          <br />
          <strong>“BLOCKPULSE + Nom du Pack + Votre Email”</strong>.
          <br /><br />
          Votre pack est ensuite activé <strong>dès réception</strong> du paiement.
        </>
      ),
    },

    {
      title: "Le code ESP32 est-il open source ?",
      icon: <FaLock className="bp-icon" />,
      content: (
        <>
          Le module ESP32 utilise un <strong>vrai protocole Stratum</strong> pour communiquer avec ViaBTC.
          <br /><br />
          Une publication du code est prévue afin d'apporter plus de transparence au projet.
        </>
      ),
    },

    {
      title: "Comment sont utilisés les fonds des packs ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les contributions soutiennent entièrement :
          <ul style={{ marginTop: "10px" }}>
            <li>l’infrastructure ESP32</li>
            <li>le dashboard temps réel</li>
            <li>l'hébergement Netlify</li>
            <li>la maintenance du nœud</li>
            <li>les futures évolutions du projet</li>
          </ul>
          <br />
          Tout est réinvesti directement dans le fonctionnement du projet.
        </>
      ),
    },

    {
      title: "Les bonus peuvent-ils être retirés en crypto ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Oui. Les bonus, lorsqu’ils sont obtenus, pourront être retirés en 
          <strong> BTC</strong> ou <strong>ETH</strong>.
          <br /><br />
          Ils restent toutefois <strong>modestes et rares</strong>, car liés aux tirages techniques et non à un rendement financier.
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
                  maxHeight: open === i ? "360px" : "0px",
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


