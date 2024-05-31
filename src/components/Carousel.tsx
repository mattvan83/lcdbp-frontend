"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";

interface ImageFields {
  title: string;
  journal: string;
  date: Date;
  city: string;
  thumbnail: string;
  thumbnailDescription: string;
}

type CarouselProps = {
  images: ImageFields[];
  width: number;
  height: number;
};

export default function Carousel({ images, width, height }: CarouselProps) {
  const [zoomedImage, setZoomedImage] = useState<ImageFields | null>(null);

  // Function to open zoomed image
  const openZoomedImage = (item: ImageFields): void => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  return (
    <>
      {images.map((item: ImageFields, index: number) => (
        <div
          key={index}
          className={styles.pressReviewContainer}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            onClick={() => openZoomedImage(item)}
            src={item.thumbnail}
            alt={item.thumbnailDescription}
            layout="fill"
            className={styles.pressReview}
          />
        </div>
      ))}

      {zoomedImage && (
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
