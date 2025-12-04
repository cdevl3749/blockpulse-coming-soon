import CONFIG from "../../config";

export default function HowItWorks() {
  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2>Comment fonctionne BlockPulse.be ?</h2>

        <div className="bp-grid-3">

          {/* Étape 1 */}
          <div className="bp-card">
            <h3>1. Participation technique (dès 5,97 €)</h3>
            <p>
              Vous achetez un <strong>pack de participation</strong> composé de plusieurs parts
              (valeur de base : {CONFIG.UNIT_PRICE.toFixed(2)} € / part).  
              Ces parts vous donnent un certain nombre de <strong>tickets techniques</strong>.
            </p>
            <p>
              Les paiements sont gérés par <strong>NOWPayments</strong> et supportent plus de
              150 cryptomonnaies (BTC, ETH, USDT, etc.). La transaction vous relie officiellement
              au nœud BlockPulse.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="bp-card">
            <h3>2. Activité de minage &amp; événements techniques</h3>
            <p>
              Le module ESP32 est connecté au pool <strong>ViaBTC</strong> via le protocole Stratum.
              Il reçoit des tâches de minage (jobs), calcule des hashs et renvoie des <strong>shares</strong>.
            </p>
            <p>
              Lorsque certaines conditions techniques sont remplies (arrivée d&apos;un nouveau job,
              découverte d&apos;un bloc par le pool, hausse d&apos;activité…), un <strong>tirage BlockPulse</strong>
              est déclenché.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="bp-card">
            <h3>3. Tirage &amp; bonus distribué</h3>
            <p>
              Chaque tirage sélectionne l&apos;un des participants selon son nombre de tickets.
              Plus vous avez de parts, plus vous avez de <strong>chances d&apos;être tiré au sort</strong>.
            </p>
            <p>
              Le gagnant reçoit un <strong>bonus crypto</strong> (montant variable, généralement petit),
              entièrement financé par la plateforme ou par une partie des récompenses techniques du pool.
            </p>
            <p>
              Ce système n&apos;est pas un jeu d&apos;argent réglementé : il s&apos;agit d&apos;une{" "}
              <strong>expérience crypto gamifiée</strong> basée sur une activité réelle de minage.
            </p>
          </div>

        </div>

        {/* Exemple simple */}
        <div className="bp-card bp-card-full">
          <h3>4. Exemple simple</h3>
          <p>
            Vous achetez le Pack Actif : <strong>3 parts</strong> (5,97 €).  
            Un autre utilisateur possède <strong>6 parts</strong>.
          </p>

          <p>
            Un tirage technique est déclenché suite à un événement du pool :
          </p>

          <ul className="bp-list">
            <li>vous avez 3 tickets → 3 chances</li>
            <li>l&apos;autre personne a 6 tickets → 6 chances</li>
          </ul>

          <p>
            Si le système distribue un bonus de <strong>1,00 €</strong> :
          </p>

          <ul className="bp-list">
            <li>vous gagnez 0,33 €</li>
            <li>l&apos;autre gagne 0,66 €</li>
          </ul>

          <p className="bp-hero-small">
            Les bonus sont symboliques et servent à récompenser la participation.
            Le minage via ESP32 reste principalement expérimental.
          </p>
        </div>

      </div>
    </section>
  );
}
