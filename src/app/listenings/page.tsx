import Image from "next/image";
import styles from "./page.module.css";
import AudioPlayer from "@/components/AudioPlayer";
import ListeningsContainer from "@/components/ListeningsContainer";
import { Track } from "@/app/page";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

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
      <ListeningsContainer
        currentPage="Listenings"
        audioPlayers={audioPlayers}
      />
    </main>
  );
}
