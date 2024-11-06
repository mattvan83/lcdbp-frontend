import Image from "next/image";
import styles from "../styles/WorkRecordingCard.module.css";
import { WorkRecording } from "@/components/WorkRecordingsDivision";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

interface WorkRecordingCard {
  _id: string;
  title: string;
  artwork: string;
  partitionUrl: string;
  partitionThumbnailUrl: string;
  authorMusic: string;
  recordingUrl: string;
  recordingDescription: string;
  openWorkRecordingPdf: (event: WorkRecording) => void;
}

function WorkRecordingCard({
  _id,
  title,
  artwork,
  partitionUrl,
  partitionThumbnailUrl,
  authorMusic,
  recordingUrl,
  recordingDescription,
  openWorkRecordingPdf,
}: WorkRecordingCard) {
  const workRecording: WorkRecording = {
    _id,
    title,
    artwork,
    partitionUrl,
    partitionThumbnailUrl,
    authorMusic,
    recordingUrl,
    recordingDescription,
  };

  const oPartitionThumbnailUrl = getOptimizedCloudinaryUrl(
    partitionThumbnailUrl
  );
  //   const oRecordingUrl = getOptimizedCloudinaryUrl(recordingUrl);

  return (
    <div className={styles.workRecordingCardContainer}>
      <div className={styles.workRecordingCard}>
        <div className={styles.workRecordingImageContainer}>
          <Image
            className={styles.partitionImage}
            src={oPartitionThumbnailUrl}
            alt="Image de première page de partition"
            layout="fill"
            // width={160}
            // height={180}
            onClick={() => openWorkRecordingPdf(workRecording)}
          />
        </div>

        <div className={styles.details}>
          {title && artwork ? (
            <p className={styles.workRecordingTitle}>
              {title} {" / "}
              {artwork}
            </p>
          ) : (
            <p className={styles.workRecordingTitle}>{title}</p>
          )}

          {authorMusic && recordingDescription && (
            <p className={styles.workRecordingAuthor}>
              <span>
                <b> Musique : </b>
                {authorMusic}
              </span>
              <br />
              <span>
                <b> Voix : </b>
                {recordingDescription}
              </span>
            </p>
          )}
        </div>

        <audio
          src={recordingUrl}
          controls={true}
          className={styles.audioPlayerControls}
          preload="auto"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default WorkRecordingCard;
