"use client";
import Image from "next/image";
import { Media } from "@/app/(public)/membersSpace/medias/page";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/MediaCard.module.css";

function MediaCard({
  _id,
  mediaDate,
  title,
  audioUrls,
  imageUrls,
  videoUrls,
}: Media) {
  const medias: Media = {
    _id,
    mediaDate,
    title,
    audioUrls,
    imageUrls,
    videoUrls,
  };
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string): void => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  const inputDate = new Date(mediaDate);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long", // full weekday name
    day: "numeric", // day of the month
    month: "long", // full month name
    year: "numeric",
  };

  const formattedDate = inputDate
    .toLocaleString("fr-FR", options)
    .toUpperCase();

  return (
    <>
      <div className={styles.mediaCardSection}>
        <p className={styles.mediaTitle}>
          {title} - {formattedDate}
        </p>
        <div className={styles.mediaCardContent}>
          {videoUrls.length > 0 &&
            videoUrls.map((videoUrl: string, index: number) => {
              const containerWidth = 350;
              const containerHeight = 225;
              return (
                <div
                  key={`video-${index}`}
                  className={styles.imageContainer}
                  style={{
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                  }}
                >
                  <video
                    className={styles.image}
                    width={containerWidth}
                    height={containerHeight}
                    controls
                    preload="none"
                  >
                    <source
                      src={getOptimizedCloudinaryUrl(videoUrl)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })}

          {imageUrls.length > 0 &&
            imageUrls.map((imageUrl: string, index: number) => {
              const containerWidth = 250;
              const containerHeight = 175;
              return (
                <div
                  key={index}
                  className={styles.imageContainer}
                  style={{
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                  }}
                >
                  <Image
                    onClick={() =>
                      openZoomedImage(getOptimizedCloudinaryUrl(imageUrl))
                    }
                    // onClick={() => openZoomedImage(imageUrl)}
                    src={getOptimizedCloudinaryUrl(imageUrl)}
                    // src={imageUrl}
                    alt={`Image ${index}`}
                    // layout="fill"
                    // objectFit="contain"
                    loading="lazy"
                    quality={75}
                    width={containerWidth}
                    height={containerHeight}
                    className={styles.image}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {zoomedImage && (
        <div className={styles.zoomedImageContainer} onClick={closeZoomedImage}>
          <Image
            src={zoomedImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            style={{ objectFit: "contain" }}
            className={styles.zoomedImage}
          />
        </div>
      )}
    </>
  );
}

export default MediaCard;
