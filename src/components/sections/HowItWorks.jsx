import CONFIG from "../../config";

export default function HowItWorks() {
  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2>Comment fonctionne BlockPulse.be ?</h2>

        <div className="bp-grid-3">

          {/* Étape 1 */}
          <div className="bp-card">
            <h3>1. Vous choisissez un pack (dès {CONFIG.UNIT_PRICE.toFixed(2)} €)</h3>
            <p>
              Vous sélectionnez un <strong>pack de participation</strong> à partir de 
              seulement {CONFIG.UNIT_PRICE.toFixed(2)} €.  
              Chaque pack contient un certain nombre de <strong>parts techniques</strong> 
              (1 part = {CONFIG.UNIT_PRICE.toFixed(2)} €).
            </p>
            <p>
              Chaque part vous donne un <strong>ticket technique</strong> qui sera utilisé
              lors des tirages BlockPulse.  
              Plus vous avez de parts, plus vous possédez de tickets.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="bp-card">
            <h3>2. Le module ESP32 travaille en direct</h3>
            <p>
              Notre mini-nœud ESP32 est connecté au pool <strong>ViaBTC</strong> via le 
              protocole Stratum (comme un vrai mineur Bitcoin).
            </p>
            <p>
              Il reçoit des tâches (jobs), envoie des <strong>shares</strong> et réagit 
              à l’activité du réseau en temps réel.
            </p>
            <p>
              Lorsqu’un événement technique survient (nouveau bloc, job important, 
              pic d’activité…), un <strong>tirage BlockPulse</strong> peut être déclenché
              automatiquement.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="bp-card">
            <h3>3. Tirages & bonus symboliques</h3>
            <p>
              À chaque tirage, un participant est sélectionné proportionnellement à son 
              nombre de tickets.  
              <strong>Plus vous avez de parts, plus vos chances augmentent.</strong>
            </p>

            <p>Deux types d'événements existent :</p>

            <ul className="bp-list">
              <li>
                💠 <strong>Tirage classique :</strong> petit bonus symbolique.
              </li>
              <li>
                🔥 <strong>Tirage spécial “Bloc Trouvé” :</strong> bonus plus élevé
                lorsqu’un bloc Bitcoin est découvert par le pool.
              </li>
            </ul>

            <p>
              Les bonus sont <strong>modestes et purement symboliques</strong>.  
              Ils servent à récompenser de manière ludique la participation au nœud.
            </p>
          </div>

        </div>

        {/* Exemple simple */}
        <div className="bp-card bp-card-full">
          <h3>4. Exemple simple</h3>
          <p>
            Vous choisissez le <strong>Pack Micro</strong> : 1 part → 1 ticket.
          </p>
          <p>
            Un autre utilisateur prend le <strong>Pack Starter</strong> : 5 parts → 5 tickets.
          </p>

          <p>Lors d’un tirage technique :</p>

          <ul className="bp-list">
            <li>Vous : 1 ticket → 1 chance</li>
            <li>L'autre personne : 5 tickets → 5 chances</li>
          </ul>

          <p>
            Si un bonus total de <strong>0,50 €</strong> est distribué :
          </p>

          <ul className="bp-list">
            <li>Vous recevez : 0,08 €</li>
            <li>L’autre personne : 0,42 €</li>
          </ul>

          <p className="bp-hero-small">
            Les bonus sont symboliques et permettent de rendre l'expérience 
            participative et ludique.  
            BlockPulse reste un projet technique expérimental.
          </p>
        </div>

      </div>
    </section>
  );
}

