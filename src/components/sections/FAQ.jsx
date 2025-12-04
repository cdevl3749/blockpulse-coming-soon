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
          Non. BlockPulse n’est <strong>pas</strong> un jeu d’argent et ne
          fonctionne pas comme une loterie classique.  
          Il s’agit d’un système de <strong>contribution technique</strong> :
          votre participation permet de soutenir un ESP32 configuré pour se 
          connecter au pool ViaBTC.  
          <br />
          <br />
          Lorsque le pool déclenche un événement technique (comme la détection
          d’un nouveau bloc), un <strong>tirage interne</strong> est effectué
          entre les contributeurs, et un <strong>bonus symbolique</strong> peut
          être attribué.
        </>
      ),
    },
    {
      title: "Est-ce un investissement ou un moyen de gagner de l’argent ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. BlockPulse n’est pas conçu comme un investissement financier.  
          Les bonus sont <strong>symboliques et non garantis</strong>, car ils
          dépendent uniquement de l’activité du pool ViaBTC.  
          <br />
          <br />
          La participation doit être vue comme un soutien à un projet tech
          expérimental, et non comme un moyen sûr ou rentable de gagner de
          l’argent.
        </>
      ),
    },
    {
      title: "Comment fonctionnent les tirages techniques ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les tirages sont déclenchés par l’activité réelle du pool ViaBTC
          (par exemple lorsqu’un nouveau bloc est détecté).  
          <br />
          <br />
          Chaque part de votre pack équivaut à <strong>un ticket</strong> dans
          le tirage. Plus vous possédez de parts, plus votre probabilité d’être
          sélectionné lors d’un tirage technique est élevée.
        </>
      ),
    },
    {
      title: "Quels moyens de paiement sont acceptés ?",
      icon: <FaCreditCard className="bp-icon" />,
      content: (
        <>
          Les paiements sont traités via <strong>NOWPayments</strong>.  
          Vous pouvez payer en :
          <ul style={{ marginTop: "10px" }}>
            <li>Ethereum (ETH)</li>
            <li>USDT (BSC)</li>
            <li>USDT (Solana)</li>
            <li>USDT (Polygon)</li>
            <li>Bitcoin (selon le pack)</li>
          </ul>
          <br />
          NOWPayments peut également permettre le paiement par carte via ses
          partenaires.
        </>
      ),
    },
    {
      title: "Pourquoi certains packs n’acceptent pas le Bitcoin ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Pour des raisons techniques : les frais réseau Bitcoin peuvent être
          élevés, parfois supérieurs au montant du pack Actif (5,97 €).  
          <br />
          <br />
          Pour éviter une mauvaise expérience utilisateur, le Bitcoin n’est
          disponible que pour les packs au montant suffisant.
        </>
      ),
    },
    {
      title: "Le code ESP32 est-il open source ?",
      icon: <FaLock className="bp-icon" />,
      content: (
        <>
          Le projet ESP32 utilise un vrai protocole Stratum pour communiquer avec
          le pool ViaBTC.  
          Vous pourrez choisir plus tard si vous souhaitez publier le code sur
          GitHub pour offrir une transparence totale aux utilisateurs.
        </>
      ),
    },
    {
      title: "Comment sont utilisés les fonds des packs ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les contributions servent à financer :
          <ul style={{ marginTop: "10px" }}>
            <li>L’hébergement du site et du dashboard temps réel</li>
            <li>Le serveur Netlify pour les paiements</li>
            <li>L’infrastructure ESP32 & services liés</li>
            <li>Le développement continu du projet</li>
          </ul>
          <br />
          BlockPulse est un projet indépendant et expérimental.
        </>
      ),
    },
    {
      title: "Les bonus peuvent-ils être retirés en crypto ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Les bonus symboliques prévus plus tard seront
          <strong>réels mais petits</strong>, et vous pourrez les retirer en
          cryptomonnaie (BTC ou USDT).  
          Le système sera ajouté après stabilisation du projet.
        </>
      ),
    },
  ];

  return (
    <section className="bp-section">
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
