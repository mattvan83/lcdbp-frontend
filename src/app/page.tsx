import Image from "next/image";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";
import AudioPlayer from "@/components/AudioPlayer";
import Carousel from "@/components/Carousel";
import SimpleForm from "@/components/SimpleForm";

const pressReviews = [
  {
    title:
      "Inauguration et bénédiction de la chapelle restaurée Notre-Dame du Chêne",
    journal: "L'Echo du Revermont",
    date: new Date("2024-06-1"),
    city: "Cousance",
    thumbnail: "/press/2024-06_L_Echo_du_Revermont-min.jpg",
    thumbnailDescription:
      "Revue de presse du 1 Juin 2024 : Inauguration et bénédiction de la chapelle restaurée Notre-Dame du Chêne",
    lastPressReview: true,
  },
  {
    title: "Le Chœur du Bon Pays a un nouveau bureau",
    journal: "Le Progrès",
    date: new Date("2024-02-23"),
    city: "Cousance",
    thumbnail: "/press/2024-02-23_Le_Progres-min.png",
    thumbnailDescription:
      "Revue de presse du 23 Février 2024 : Le Chœur du Bon Pays a un nouveau bureau",
    lastPressReview: true,
  },
  {
    title: "Six concerts au programme du Chœur du Bon Pays",
    journal: "L'Indépendant",
    date: new Date("2024-01-30"),
    city: "Cousance",
    thumbnail: "/press/2024-01-24_L_independant-min.png",
    thumbnailDescription:
      "Revue de presse du 30 Janvier 2024 : Six concerts au programme du Chœur du Bon Pays",
    lastPressReview: true,
  },
  {
    title: "Une église comble pour le concert (de Noël ?) du comité des fêtes",
    journal: "Le Progrès",
    date: new Date("2023-12-10"),
    city: "Beaufort-Orbagna",
    thumbnail: "/press/Concert_Beaufort-Orbagna_23-12-10-min.jpg",
    thumbnailDescription:
      "Revue de presse du 10 Décembre 2023 : Une église comble pour le concert (de Noël ?) du comité des fêtes",
    lastPressReview: true,
  },
  {
    title: "Le 'Chœur du Bon Pays' en concert ce dimanche",
    journal: "Le Progrès",
    date: new Date("2023-12-6"),
    city: "Saint-Etienne-Du-Bois",
    thumbnail: "/press/2023-12-06_Le_Progres-min.png",
    thumbnailDescription:
      "Revue de presse du 6 Décembre 2023 : Le 'Chœur du Bon Pays' en concert ce dimanche",
    lastPressReview: true,
  },
  {
    title:
      "Le 'Chœur du Bon Pays' a produit son répertoire de gospel devant une centaine de spectateurs",
    journal: "Le Progrès",
    date: new Date("2023-4-15"),
    city: "Saint-Etienne-Du-Bois",
    thumbnail: "/press/Concert_St Etienne_du_Bois_23-04-15-min.jpg",
    thumbnailDescription:
      "Revue de presse du 15 Avril 2023 : Le 'Chœur du Bon Pays' a produit son répertoire de gospel devant une centaine de spectateurs",
    lastPressReview: true,
  },
  {
    title: "La chorale conserve une trentaine de membres",
    journal: "Le Progrès",
    date: new Date("2023-1-24"),
    city: "Cousance",
    thumbnail: "/press/AG_21-01-23-min.jpg",
    thumbnailDescription:
      "Revue de presse du 24 Janvier 2023 : La chorale conserve une trentaine de membres",
    lastPressReview: true,
  },
];

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

interface Track {
  title: string;
  artwork: string;
  audioUrl: string;
  authorText: string;
  authorMusic: string;
  arrangement: string;
  harmonization: string;
  thumbnailUrl: string;
  thumbnailDescription: string;
  recordingDate: Date;
  lastListening: boolean;
}

export default async function Home() {
  const response = await fetch(`${BACKEND_ADDRESS}/listenings`);
  const tracks = await response.json();

  // console.log("tracks.listenings: ", tracks.listenings);

  const audioPlayers = tracks.result
    ? tracks.listenings
        .filter((track: Track) => track.lastListening === true)
        .map((track: Track, index: number) => (
          <AudioPlayer key={index} {...track} />
        ))
    : tracks.error;

  return (
    <main>
      <div className={styles.heroDivision} id="chore">
        <div className={styles.heroSection}>
          <h3>Une passion</h3>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h4>&quot;Le Chœur, c&apos;est l&apos;affaire de tous&quot;</h4>
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
              {/* <Button variant="primary" className={styles.heroButton}>
                Nous découvrir
              </Button> */}
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

      <div className={styles.newsDivision} id="events">
        <div className={styles.newsSection}>
          <h3>Actualités</h3>
          <div className={styles.newsContent}>
            <Image
              src="/Prochaines_prestations.jpg"
              alt="Prochaines prestations"
              width={400}
              height={550}
              className={styles.newsEvent}
            />
            <Image
              src="/24-09-29_Concert_Château-Chalon.jpg"
              alt="Concert Château-Chalon le 24 Septembre 2024"
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
          {/* <Button variant="primary" className={styles.newsButton}>
            Voir tous les évènements
          </Button> */}
        </div>
      </div>

      <div className={styles.listenDivision} id="listenings">
        <div className={styles.listenSection}>
          <h3>Nos derniers chants</h3>
          <div className={styles.listenContent}>{audioPlayers}</div>
          {/* <Button variant="primary" className={styles.listenButton}>
            Ecouter plus de chants
          </Button> */}
        </div>
      </div>

      <div className={styles.pressDivision} id="pressReviews">
        <div className={styles.pressSection}>
          <h3>Nos dernières revues de presse</h3>
          <div className={styles.pressContent}>
            <Carousel images={pressReviews} width={400} height={550} />
          </div>
          {/* <Button variant="primary" className={styles.pressButton}>
            Voir toutes les revues de presse
          </Button> */}
        </div>
      </div>

      <div className={styles.contactDivision} id="contactUs">
        <div className={styles.contactSection}>
          <h3>Nous contacter</h3>
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
              <h5>
                Envie de nous rejoindre ou d&apos;obtenir des renseignements ?
              </h5>
              <SimpleForm backendAddress={BACKEND_ADDRESS} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
