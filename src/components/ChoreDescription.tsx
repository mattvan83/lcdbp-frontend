"use client";

import styles from "../styles/ChoreDescription.module.css";
import { useState } from "react";
import Image from "next/image";

type ChoreDescriptionProps = {
  headerTitle: string;
  thumbnailUrl1: string;
  width1: number;
  height1: number;
  thumbnailUrl2: string;
  width2: number;
  height2: number;
  description: string;
};

export default function ChoreDescription({
  headerTitle,
  thumbnailUrl1,
  width1,
  height1,
  thumbnailUrl2,
  width2,
  height2,
  description,
}: ChoreDescriptionProps) {
  const [zoomedImage, setZoomedImage] = useState<{
    thumbnailUrl: string;
    thumbnailDescription: string;
  } | null>(null);

  // Function to open zoomed image
  const openZoomedImage = ({
    thumbnailUrl,
    thumbnailDescription,
  }: {
    thumbnailUrl: string;
    thumbnailDescription: string;
  }): void => {
    setZoomedImage({
      thumbnailUrl,
      thumbnailDescription,
    });
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  return (
    <>
      <div className={styles.choreDescriptionContainer}>
        <h3>{headerTitle}</h3>
        <div className={styles.choreDescriptionContent}>
          <div className={styles.choreDescriptionImages}>
            <Image
              onClick={() =>
                openZoomedImage({
                  thumbnailUrl: thumbnailUrl1,
                  thumbnailDescription: "Thumbnail 1",
                })
              }
              src={thumbnailUrl1}
              alt="Thumbnail 1"
              width={width1}
              height={height1}
              className={styles.choreDescriptionImage}
            />
            <Image
              onClick={() =>
                openZoomedImage({
                  thumbnailUrl: thumbnailUrl2,
                  thumbnailDescription: "Thumbnail 2",
                })
              }
              src={thumbnailUrl2}
              alt="Thumbnail 2"
              width={width2}
              height={height2}
              className={styles.choreDescriptionImage}
            />
          </div>
          <p>{description}</p>
        </div>
      </div>

      {zoomedImage && (
        <div className={styles.zoomedImageContainer} onClick={closeZoomedImage}>
          <Image
            src={zoomedImage.thumbnailUrl}
            alt={zoomedImage.thumbnailDescription}
            layout="fill"
            objectFit="contain"
            className={styles.zoomedImage}
          />
        </div>
      )}
    </>
  );
}
