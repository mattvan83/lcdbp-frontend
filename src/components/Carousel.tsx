"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";

export default function Carousel({ images, width, height }) {
  const [zoomedImage, setZoomedImage] = useState({});

  // Function to open zoomed image
  const openZoomedImage = (item) => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage({});
  };

  return (
    <>
      {images.map((item, index) => (
        <div
          className={styles.pressReviewContainer}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            key={index}
            onClick={() => openZoomedImage(item)}
            src={item.thumbnail}
            alt={item.thumbnailDescription}
            layout="fill"
            objectFit="contain"
            className={styles.pressReview}
          />
        </div>
      ))}

      {Object.keys(zoomedImage).length > 0 && (
        <div className={styles.zoomedImageContainer} onClick={closeZoomedImage}>
          <Image
            src={zoomedImage.thumbnail}
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
