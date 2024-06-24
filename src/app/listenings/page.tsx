import Image from "next/image";
import styles from "./page.module.css";
import AudioPlayer from "@/components/AudioPlayer";

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

export default async function Listenings() {
  const response = await fetch(`${BACKEND_ADDRESS}/listenings`);
  const tracks = await response.json();

  // console.log("tracks.listenings: ", tracks.listenings);

  const audioPlayers = tracks.result
    ? tracks.listenings.map((track: Track, index: number) => (
        <AudioPlayer key={index} {...track} />
      ))
    : tracks.error;

  return (
    <main>
      <div className={styles.listenDivision} id="listenings">
        <div className={styles.listenSection}>
          <h3>Nos derniers chants</h3>
          <div className={styles.listenContent}>{audioPlayers}</div>
        </div>
      </div>
    </main>
  );
}
