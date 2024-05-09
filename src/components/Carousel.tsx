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
      {/* Render the images */}
      {images.map((item, index) => (
        // <div key={item.id} onClick={() => openZoomedImage(item)}>
        <Image
          key={item.id}
          onClick={() => openZoomedImage(item)}
          src={item.thumbnail}
          alt={item.thumbnailDescription}
          width={400}
          height={550}
          //   layout="fill"
          //   objectFit="cover"
          className={styles.pressReview}
        />
        // </div>
      ))}

      {/* Render the zoomed image */}
      {Object.keys(zoomedImage).length && (
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
