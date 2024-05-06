import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
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
              Ensemble solidaire, respectueux, le chœur c’est l’affaire de Tous.
              Notre devise : éprouver du plaisir à se retrouver pour chanter et
              le transmettre.
            </p>
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
    </main>
  );
}
