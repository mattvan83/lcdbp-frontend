import Image from "next/image";
import styles from "../styles/PartitionCard.module.css";
import { Partition } from "@/components/PartitionsDivision";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

function PartitionCard({
  _id,
  code,
  title,
  artwork,
  partitionUrl,
  partitionThumbnailUrl,
  authorMusic,
  isAtWork,
}: Partition) {
  const partition: Partition = {
    _id,
    code,
    title,
    artwork,
    partitionUrl,
    partitionThumbnailUrl,
    authorMusic,
    isAtWork,
  };

  const optimizedUrl = getOptimizedCloudinaryUrl(partitionThumbnailUrl);

  return (
    <div className={styles.partitionCardContainer}>
      <div className={styles.partitionCard}>
        <div className={styles.partitionCodeContainer}>
          <p className={styles.partitionCode}>{code}</p>
        </div>

        <div className={styles.partitionImageContainer}>
          <Image
            className={styles.partitionImage}
            src={optimizedUrl}
            alt="Image de première page de partition"
            layout="fill"
            // width={160}
            // height={180}
            //   onClick={() => openZoomedImage(event)}
          />
        </div>

        <div className={styles.details}>
          {title && artwork ? (
            <p className={styles.partitionTitle}>
              {title} {" / "}
              {artwork}
            </p>
          ) : (
            <p className={styles.partitionTitle}>{title}</p>
          )}

          {authorMusic && (
            <p className={styles.partitionAuthor}>
              <b> Musique : </b>
              {authorMusic}
            </p>
          )}

          {isAtWork && (
            <p className={styles.partitionIsAtWork}>En Cours d'Etude</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartitionCard;
