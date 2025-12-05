import CONFIG from "../../config";

export default function HowItWorks() {
  return (
    <section className="bp-section">
      <div className="bp-container">
        <h2>Comment fonctionne BlockPulse.be ?</h2>

        <div className="bp-grid-3">

          {/* Étape 1 */}
          <div className="bp-card">
            <h3>1. Participation technique (dès {CONFIG.UNIT_PRICE.toFixed(2)} €)</h3>
            <p>
              Vous choisissez un <strong>pack de participation</strong> à partir de 
              seulement {CONFIG.UNIT_PRICE.toFixed(2)} €.  
              Chaque pack contient un certain nombre de <strong>parts techniques</strong> 
              (1 part = {CONFIG.UNIT_PRICE.toFixed(2)} €).
            </p>
            <p>
              Chaque part vous donne un <strong>ticket technique</strong> utilisé lors 
              des tirages BlockPulse. Plus vous avez de parts, plus vous disposez 
              de tickets.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="bp-card">
            <h3>2. Activité technique du nœud</h3>
            <p>
              Le module ESP32 est relié au pool <strong>ViaBTC</strong> via le protocole 
              Stratum.  
              Il reçoit des tâches techniques (jobs), envoie des <strong>shares</strong> 
              et réagit en temps réel à l’activité du réseau.
            </p>
            <p>
              Lorsqu’une condition technique est détectée (nouveau job, pic
              d’activité, découverte d’un bloc…), un <strong>tirage BlockPulse</strong> 
              peut être déclenché automatiquement.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="bp-card">
            <h3>3. Tirages & bonus symboliques</h3>
            <p>
              À chaque tirage, un participant est sélectionné selon son nombre 
              de tickets. Plus vous avez de parts, plus vos chances augmentent.
            </p>

            <p>
              Deux types d’événements existent :
            </p>

            <ul className="bp-list">
              <li>
                💠 <strong>Tirage classique :</strong> petit bonus symbolique.
              </li>
              <li>
                🔥 <strong>Tirage spécial “Bloc Trouvé” :</strong> lorsqu’un bloc
                Bitcoin est découvert, un tirage exceptionnel peut être lancé avec 
                un bonus plus important.
              </li>
            </ul>

            <p>
              Les bonus sont modestes et servent uniquement à récompenser la participation.
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
            Un autre utilisateur choisit le <strong>Pack Starter</strong> : 5 parts → 5 tickets.
          </p>

          <p>Lors d’un tirage technique :</p>

          <ul className="bp-list">
            <li>vous avez 1 ticket → 1 chance</li>
            <li>l’autre personne a 5 tickets → 5 chances</li>
          </ul>

          <p>
            Si un bonus total de <strong>0,50 €</strong> est distribué :
          </p>

          <ul className="bp-list">
            <li>vous recevez 0,08 €</li>
            <li>l’autre reçoit 0,42 €</li>
          </ul>

          <p className="bp-hero-small">
            Les bonus sont symboliques et représentent une manière ludique de 
            récompenser la participation au nœud.  
            Le système reste une expérience technique expérimentale.
          </p>
        </div>

      </div>
    </section>
  );
}

