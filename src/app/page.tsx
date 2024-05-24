import Image from "next/image";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";
import AudioPlayer from "@/components/AudioPlayer";
import Carousel from "@/components/Carousel";
import SimpleForm from "@/components/SimpleForm";

const tracks = [
  {
    title: "O Cher Jura",
    artwork: "",
    audioFile: "/data/O_cher_Jura_(extrait).mp3",
    authorText: "Henri Cordier",
    authorMusic: "Henri Cordier",
    arrangement: "Jean Sarrazin",
    harmonization: "",
    thumbnail: "/data/Jura.jpg",
    thumbnailDescription: "Photo du Jura",
  },
  {
    title: "Still Ruht Der See",
    artwork: "",
    audioFile: "/data/Still_ruht_der_See_(extrait).mp3",
    authorText: "Heinrich Pfeil",
    authorMusic: "Heinrich Pfeil",
    arrangement: "",
    harmonization: "",
    thumbnail: "/data/Heinrich_Pfeil.jpg",
    thumbnailDescription: "Heinrich Pfeil",
  },
  {
    title: "Tête En l'Air",
    artwork: "",
    audioFile: "/data/Tete_en_l'air_(extrait).mp3",
    authorText: "Jacques Higelin",
    authorMusic: "Jacques Higelin",
    arrangement: "Roland Ménéguz",
    harmonization: "",
    thumbnail: "/data/JacquesHigelin.jpeg",
    thumbnailDescription: "Jacques Higelin",
  },
  {
    title: "Va Pensiero",
    artwork: "Chœur des Hébreux",
    audioFile: "/data/Va_pensiero_(extrait).mp3",
    authorText: "",
    authorMusic: "Guiseppe Verdi",
    arrangement: "",
    harmonization: "",
    thumbnail: "/data/GuiseppeVerdi.jpg",
    thumbnailDescription: "Guiseppe Verdi",
  },
];

const pressReviews = [
  {
    title: "Le Chœur du Bon Pays a repris les répétitions",
    journal: "Le Progrès",
    date: new Date("2021-9-7T00:00:00"),
    city: "Cousance",
    thumbnail: "/press/210926_162048.jpg",
    thumbnailDescription: "Revue de presse du 7 Septembre 2021",
  },
  {
    title: "Commémoration en mémoire des Résistants du maquis de Lanézia",
    journal: "La Voix du Jura",
    date: new Date("2021-8-3T00:00:00"),
    city: "Cuisia",
    thumbnail: "/press/210828_193917.jpg",
    thumbnailDescription: "Revue de presse du 3 Août 2021 ",
  },
  {
    title: "Le Chœur du Bon Pays prépare son avenir",
    journal: "Actu Lons et Région",
    date: new Date("2021-7-8T00:00:00"),
    city: "Cousance",
    thumbnail: "/press/210727_165940.jpg",
    thumbnailDescription: "Revue de presse du 8 Juillet 2021 ",
  },
];

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default function Home() {
  const audioPlayers = tracks.map((track, index) => (
    <AudioPlayer key={index} {...track} />
  ));

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
          <div className={styles.listenContent}>{audioPlayers}</div>
          <Button variant="primary" className={styles.listenButton}>
            Ecouter plus de chants
          </Button>
        </div>
      </div>

      <div className={styles.pressDivision}>
        <div className={styles.pressSection}>
          <h3>Nos dernières revues de presse</h3>
          <div className={styles.pressContent}>
            <Carousel images={pressReviews} width={400} height={550} />
          </div>
          <Button variant="primary" className={styles.pressButton}>
            Voir toutes les revues de presse
          </Button>
        </div>
      </div>

      <div className={styles.contactDivision} id="contactUs">
        <div className={styles.contactSection}>
          <h3>Nous contacter</h3>
          <div className={styles.contactContent}>
            <div className={styles.contactText}>
              <h4>Notre conseil d'administration</h4>
              <div className={styles.contactBodyText}>
                <span>
                  <b>Président honoraire : </b>Edouard De Thoisy
                </span>
                <span>
                  <b>Président : </b>Gérard Besançon
                </span>
                <span>
                  <b>Vice-président : </b>Dominique Bon
                </span>
                <span>
                  <b>Secrétaire : </b>Patrick Delizy
                </span>
                <span>
                  <b>Secrétaire : </b>Patrick Delizy
                </span>
                <span>
                  <b>Secrétaire-adjoint : </b>Jean-Claude Chattot
                </span>
                <span>
                  <b>Trésorier : </b>Jean-Paul Vanhoutte
                </span>
                <span>
                  <b>Trésorier-adjoint : </b>Alain Dargaud
                </span>
                <div className={styles.contactBodyAdministrators}>
                  <span>
                    <b>Administrateurs : </b>Jean-Bernard Boé
                  </span>
                  <span>Christian Debourg</span>
                  <span>Vincenz Engesser</span>
                  <span>Jean-Louis Tozzo</span>
                </div>
              </div>
            </div>
            <div className={styles.contactForm}>
              <h5>Envie de nous rejoindre ou d'obtenir des renseignements ?</h5>
              <SimpleForm backendAddress={BACKEND_ADDRESS} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
