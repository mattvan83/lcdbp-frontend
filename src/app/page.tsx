import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";
import AudioPlayer from "@/components/AudioPlayer";
import Carousel from "@/components/Carousel";
import ListeningsContainer from "@/components/ListeningsContainer";
import PressReviewsContainer from "@/components/PressReviewsContainer";
import SimpleForm from "@/components/SimpleForm";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export interface Event {
  _id: string;
  thumbnailUrl: string;
  thumbnailDescription: string;
}

export interface Track {
  _id: string;
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

export interface PressReview {
  _id: string;
  title: string;
  journal: string;
  city: string;
  thumbnailUrl: string;
  thumbnailDescription: string;
  pressReviewDate: Date;
  lastPressReview: boolean;
}

const eventImages: Event[] = [
  {
    _id: "1",
    thumbnailUrl: "/Prochaines_prestations.jpg",
    thumbnailDescription: "Prochaines prestations",
  },
  {
    _id: "2",
    thumbnailUrl: "/24-09-29_Concert_Château-Chalon.jpg",
    thumbnailDescription: "Concert Château-Chalon le 24 Septembre 2024",
  },
  {
    _id: "3",
    thumbnailUrl: "/nousRecrutons.jpg",
    thumbnailDescription: "Recrutement choristes",
  },
];

export default async function Home() {
  // Get last listenings
  const responseAudio = await fetch(`${BACKEND_ADDRESS}/listenings`);
  const tracks = await responseAudio.json();

  // console.log("tracks.listenings: ", tracks.listenings);

  const lastAudioPlayers = tracks.result
    ? tracks.listenings
        .filter((track: Track) => track.lastListening === true)
        .map((track: Track) => <AudioPlayer key={track._id} {...track} />)
    : tracks.error;

  // Get last press reviews
  const responsePress = await fetch(`${BACKEND_ADDRESS}/pressReviews/list`);
  const reviews = await responsePress.json();

  const lastPressReviews = reviews.result
    ? reviews.pressReviews.filter(
        (pressReview: PressReview) => pressReview.lastPressReview === true
      )
    : reviews.error;

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

      <div className={styles.pressDivision} id="events">
        <div className={styles.pressSection}>
          <h3>Actualités</h3>
          <div className={styles.pressContent}>
            {/* <Image
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
            /> */}
            <Carousel
              images={eventImages}
              width={400}
              height={550}
              category="events"
            />
          </div>
          {/* <Button variant="primary" className={styles.newsButton}>
            Voir tous les évènements
          </Button> */}
        </div>
      </div>

      <ListeningsContainer currentPage="Home" audioPlayers={lastAudioPlayers} />

      <PressReviewsContainer
        currentPage="Home"
        pressReviews={lastPressReviews}
        width={400}
        height={550}
      />

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
