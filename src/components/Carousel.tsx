"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";

export default function Carousel({ images }) {
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
        <Image
          key={index}
          onClick={() => openZoomedImage(item)}
          src={item.thumbnail}
          alt={item.thumbnailDescription}
          width={400}
          height={550}
          //   layout="fill"
          //   objectFit="cover"
          objectFit="contain"
          className={styles.pressReview}
        />
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
