import Image from "next/image";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <main>
      <div className={styles.heroDivision}>
        <div className={styles.heroSection}>
          <h3>Une passion</h3>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h4>"Le Chœur, c'est l'affaire de tous"</h4>
              <p>
                Notre effectif est d’une trentaine d’hommes, répartis en quatre
                pupitres : deux de ténors, barytons, basses. <br />
                Notre volonté est de vous faire découvrir un répertoire
                polyphonique éclectique, negro-spiritual, sacré, contemporain,
                avec une place particulière pour le chant traditionnel du Jura.{" "}
                <br />
                Ensemble solidaire, respectueux, le chœur c’est l’affaire de
                Tous. Notre devise : éprouver du plaisir à se retrouver pour
                chanter et le transmettre.
              </p>
              <Button variant="primary" className={styles.heroButton}>
                Nous découvrir
              </Button>
            </div>
            <Image
              src="/heroSection.jpg"
              alt="Photo du Choeur"
              // layout="responsive"
              width={650}
              height={325}
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.newsDivision}>
        <div className={styles.newsSection}>
          <h3>Actualités</h3>
          <div className={styles.newsContent}>
            <Image
              src="/Evenement.jpg"
              alt="Evenement à venir"
              width={400}
              height={550}
              className={styles.newsEvent}
            />
            <Image
              src="/nousRecrutons.jpg"
              alt="Recrutement choristes"
              width={400}
              height={550}
              className={styles.newsEvent}
            />
          </div>
          <Button variant="primary" className={styles.newsButton}>
            Voir tous les évènements
          </Button>
        </div>
      </div>

      <div className={styles.listenDivision}>
        <div className={styles.listenSection}>
          <h3>Nos derniers chants</h3>
          <div className={styles.listenContent}></div>
          <Button variant="primary" className={styles.listenButton}>
            Ecouter plus de chants
          </Button>
        </div>
      </div>
    </main>
  );
}
