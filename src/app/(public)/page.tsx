import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";
import AudioPlayer from "@/components/AudioPlayer";
import Carousel from "@/components/Carousel";
import ListeningsContainer from "@/components/ListeningsContainer";
import PressReviewsContainer from "@/components/PressReviewsContainer";
import SimpleForm from "@/components/SimpleForm";
import ButtonLink from "@/components/ButtonLink";

const { BACKEND_ADDRESS } = process.env;

export interface News {
  _id: string;
  thumbnailUrl: string;
  thumbnailDescription: string;
  newsDate: Date;
}

export interface Event {
  _id: string;
  title: string;
  postalCode: string;
  city: string;
  place: string;
  chores: string[];
  thumbnailUrl: string;
  thumbnailDescription: string;
  eventDate: Date;
  price: string;
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

export default async function Home() {
  // Get last news
  const responseNews = await fetch(`${BACKEND_ADDRESS}/news/list`);
  const news = await responseNews.json();

  const lastNews = news.result ? news.news : news.error;

  // Get last events
  const responseEvents = await fetch(`${BACKEND_ADDRESS}/events/listMainPage`);
  const events = await responseEvents.json();

  const eventsAsNews = events.result
    ? events.events.map((event: Event) => {
        return {
          _id: event._id,
          thumbnailUrl: event.thumbnailUrl,
          thumbnailDescription: event.thumbnailDescription,
          newsDate: event.eventDate,
        };
      })
    : events.error;

  const newsConcatenated = [...lastNews, ...eventsAsNews];

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
      <div className={styles.heroDivision}>
        <div className={styles.heroSection}>
          <h3>Une Passion</h3>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h4>&quot;Le Chœur, c&apos;est l&apos;affaire de tous&quot;</h4>
              <p>
                Notre effectif est d’une trentaine d’hommes, répartis en quatre
                pupitres : deux de ténors, barytons, basses.
              </p>
              <p>
                Notre volonté est de vous faire découvrir un répertoire
                polyphonique éclectique, negro-spiritual, sacré, contemporain,
                avec une place particulière pour le chant traditionnel du Jura.{" "}
              </p>
              <p>
                Ensemble solidaire, respectueux, le chœur c’est l’affaire de
                Tous. Notre devise : éprouver du plaisir à se retrouver pour
                chanter et le transmettre.
              </p>
              <ButtonLink
                href="/chore"
                eKey="chore"
                buttonTitle="Nous découvrir"
              />
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

      <div className={styles.pressDivision}>
        <div className={styles.pressSection}>
          <h3>Actualités</h3>
          <div className={styles.pressContent}>
            <Carousel
              images={newsConcatenated}
              width={400}
              height={550}
              category="eventsMainPage"
            />
          </div>
          {/* <Button variant="primary" className={styles.newsButton}>
            Voir tous les évènements
          </Button> */}
          <ButtonLink
            href="/events"
            eKey="events"
            buttonTitle="Voir tous les évènements"
          />
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
          <h3>Nous Contacter</h3>
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
              <h4>
                Envie de nous rejoindre ou d&apos;obtenir des renseignements ?
              </h4>
              <SimpleForm backendAddress={BACKEND_ADDRESS} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
