import styles from "../styles/AudioPlayer.module.css";
import Image from "next/image";
import { Track } from "@/app/page";

export default function AudioPlayer({
  title,
  artwork,
  audioUrl,
  authorText,
  authorMusic,
  arrangement,
  harmonization,
  thumbnailUrl,
  thumbnailDescription,
  recordingDate,
  lastListening,
}: Track) {
  //   const [isPlaying, setIsPlaying] = useState(false);

  //   const togglePlay = () => {
  //     setIsPlaying(!isPlaying);
  //   };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.audioPlayerImageContainer}>
        <Image
          src={thumbnailUrl}
          alt={thumbnailDescription}
          layout="fill"
          // objectFit="cover"
          // layout="responsive"
          // width={200}
          // height={200}
          className={styles.audioPlayerImage}
          // style={{ width: "200px", height: "200px" }}
        />
      </div>

      <div className={styles.audioPlayerRightSection}>
        <div className={styles.audioPlayerTextSection}>
          {title && artwork ? (
            <span
              className={`${styles.audioPlayerText} ${styles.audioPlayerTitle}`}
            >
              {title}
              {" / "}
              {artwork}
            </span>
          ) : (
            <span
              className={`${styles.audioPlayerText} ${styles.audioPlayerTitle}`}
            >
              {title}
            </span>
          )}
          {authorMusic && authorText === authorMusic ? (
            <span className={styles.audioPlayerText}>
              <b>Paroles et Musique : </b>
              {authorText}
            </span>
          ) : (
            <>
              {authorText && (
                <span className={styles.audioPlayerText}>
                  <b> Paroles : </b>
                  {authorText}
                </span>
              )}
              <span className={styles.audioPlayerText}>
                <b> Musique : </b>
                {authorMusic}
              </span>
            </>
          )}
          {arrangement && (
            <span className={styles.audioPlayerText}>
              <b> Arrangement : </b>
              {arrangement}
            </span>
          )}
          {harmonization && (
            <span className={styles.audioPlayerText}>
              <b> Harmonisation : </b>
              {harmonization}
            </span>
          )}
        </div>
        <audio
          src={audioUrl}
          controls={true}
          className={styles.audioPlayerControls}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
