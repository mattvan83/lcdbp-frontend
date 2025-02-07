import styles from "./page.module.css";
import SimpleForm from "@/components/SimpleForm";

const { BACKEND_ADDRESS } = process.env;

export default async function ContactUs() {
  return (
    <main>
      <div className={styles.contactDivision}>
        <div className={styles.contactSection}>
          <h3>Nous Contacter</h3>
          <p>
            Vous aimez chanter ? Vous avez le goût d'apprendre et appréciez la
            vie associative ? Vous avez une oreille, une sensibilité, la notion
            du rythme, alors...
          </p>
          <p className={styles.contactIntroTitle}>
            Rejoignez nous et soyez les bienvenus !
          </p>
          <p>
            Répétition à Cousance le vendredi de 18h00 à 20h00 à compter du 23
            Août 2024 à la Salle des Frères, 8 rue de Bresse.
          </p>
          <p className={styles.contactIntroTitle}>
            N'hésitez pas à nous contacter !
          </p>
          <div className={styles.contactContent}>
            <div className={styles.contactText}>
              <h4>Notre conseil d&apos;administration</h4>
              <div className={styles.contactBodyText}>
                <span>
                  <b>Président : </b>Dominique Bon
                </span>
                <span>
                  <b>Vice-président : </b>Daniel Moine
                </span>
                <span>
                  <b>Secrétaire : </b>Patrick Delizy
                </span>
                <span>
                  <b>Secrétaire-adjoint : </b>Sylvain Grandmaison
                </span>
                <span>
                  <b>Trésorier : </b>Alain Dargaud
                </span>
                <span>
                  <b>Trésorier-adjoint : </b>Christian Debourg
                </span>
                <div className={styles.contactBodyAdministrators}>
                  <span>
                    <b>Administrateurs : </b>Vincenz Engesser
                  </span>
                  <span>Guy Morel</span>
                  <span>Eric Yessad</span>
                </div>
                <br></br>
                <span>
                  <b>Membre honoraire : </b>Gérard Besançon
                </span>
              </div>
            </div>
            <div className={styles.contactForm}>
              <SimpleForm backendAddress={BACKEND_ADDRESS} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
