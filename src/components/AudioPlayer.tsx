import styles from "../styles/AudioPlayer.module.css";
import Image from "next/image";
// import React, { useState } from "react";

export default function AudioPlayer({
  title,
  artwork,
  audioFile,
  authorText,
  authorMusic,
  arrangement,
  harmonization,
  thumbnail,
  thumbnailDescription,
}) {
  //   const [isPlaying, setIsPlaying] = useState(false);

  //   const togglePlay = () => {
  //     setIsPlaying(!isPlaying);
  //   };

  return (
    <div className={styles.audioPlayer}>
      <Image
        src={thumbnail}
        alt={thumbnailDescription}
        // layout="responsive"
        width={200}
        height={200}
        className={styles.audioPlayerImage}
      />
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
        <div>
          <audio src={audioFile} controls={true}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}
