import { useState } from "react";
import { FaQuestionCircle, FaCreditCard, FaLock } from "react-icons/fa";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  const data = [
    {
      title: "Est-ce une loterie classique ?",
      icon: <FaQuestionCircle className="bp-icon" />,
      content: (
        <>
          Non. Il ne s’agit pas d’un jeu d’argent mais d’une 
          <strong> contribution technique</strong> à un nœud de calcul Bitcoin.
          En cas de bonus réel issu du pool de minage, celui-ci est partagé
          entre les contributeurs.
        </>
      ),
    },
    {
  title: "Quels moyens de paiement ?",
  icon: <FaCreditCard className="bp-icon" />,
  content: (
    <>
      Les paiements sont traités par <strong>NOWPayments</strong>.
      Vous pouvez régler en <strong>ETH</strong>, <strong>USDT</strong> 
      (réseaux Polygon, BSC, Solana) ou par carte bancaire via leurs partenaires.
    </>
  ),
},

    {
      title: "Le code ESP32 est-il open source ?",
      icon: <FaLock className="bp-icon" />,
      content: (
        <>
          Le projet s’appuie sur un ESP32 connecté à ViaBTC via Stratum.
          Tu pourras décider plus tard si tu publies le code sur GitHub pour
          plus de transparence.
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
                style={{ maxHeight: open === i ? "300px" : "0px" }}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
