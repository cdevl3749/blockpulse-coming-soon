import CONFIG from "../../config";

export default function HowItWorks() {
  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2>Comment fonctionne BlockPulse.io ?</h2>
        <div className="bp-grid-3">
          <div className="bp-card">
            <h3>1. Contribution technique (dès {CONFIG.UNIT_PRICE.toFixed(2)} €)</h3>
            <p>
              Vous achetez une <strong>unité de contribution</strong> d&apos;un
              montant de <strong>{CONFIG.UNIT_PRICE.toFixed(2)} €</strong>. Cette participation sert
              à financer l&apos;infrastructure (ESP32, hébergement, monitoring,
              développement).
            </p>
            <p>
              Le paiement est géré par <strong>NOWPayments</strong>, un
              processeur de paiement crypto sécurisé qui accepte{" "}
              <strong>Bitcoin</strong>, <strong>Ethereum</strong>, <strong>USDT</strong> et plus de 150 cryptomonnaies.
            </p>
          </div>

          <div className="bp-card">
            <h3>2. Minage en pool &amp; bonus éventuels</h3>
            <p>
              L&apos;ESP32 est connecté au pool <strong>ViaBTC</strong>. Il
              envoie des shares (preuves de travail partielles) qui contribuent
              au minage d&apos;un bloc Bitcoin.
            </p>
            <p>
              Lorsque le pool trouve un bloc, il distribue un{" "}
              <strong>bonus technique</strong>. Ce bonus est alors réparti entre
              les contributeurs selon le nombre d&apos;unités qu&apos;ils ont
              achetées.
            </p>
          </div>

          <div className="bp-card">
            <h3>3. Pas une loterie, mais un partage de bonus</h3>
            <p>
              Vous ne payez pas pour &quot;tenter votre chance&quot; comme dans
              une loterie classique. Vous soutenez un{" "}
              <strong>nœud de calcul expérimental</strong>, et en cas de bonus
              réel issu du pool, vous recevez une{" "}
              <strong>part proportionnelle</strong>.
            </p>
            <p>
              Ce modèle est similaire à un système de{" "}
              <strong>contribution + récompense</strong> (type Patreon ou
              plateformes de tips).
            </p>
          </div>
        </div>

        <div className="bp-card bp-card-full">
          <h3>4. Exemple simple</h3>
          <p>
            Vous achetez <strong>1 participation</strong> ({CONFIG.UNIT_PRICE.toFixed(2)} €) et une autre
            personne en achète 4. Le système comptabilise 5 unités.
          </p>
          <p>
            Si un bonus de <strong>2,00 €</strong> arrive du pool :
          </p>
          <ul className="bp-list">
            <li>vous recevez 0,40 € (1/5)</li>
            <li>l&apos;autre personne reçoit 1,60 € (4/5)</li>
          </ul>
          <p className="bp-hero-small">
            Les montants sont donnés à titre d&apos;exemple. Le minage via ESP32
            reste extrêmement faible et principalement expérimental.
          </p>
        </div>
      </div>
    </section>
  );
}