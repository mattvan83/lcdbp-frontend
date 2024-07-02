"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";
import { PressReview } from "@/app/page";
import PressReviewCard from "./PressReviewCard";

type CarouselProps = {
  images: PressReview[];
  width: number;
  height: number;
};

export default function Carousel({ images, width, height }: CarouselProps) {
  const [zoomedImage, setZoomedImage] = useState<PressReview | null>(null);

  // Function to open zoomed image
  const openZoomedImage = (item: PressReview): void => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  return (
    <>
      {images.map((item: PressReview) => (
        // <div
        //   key={item._id}
        //   className={styles.pressReviewContainer}
        //   style={{ width: `${width}px`, height: `${height}px` }}
        // >
        //   <Image
        //     onClick={() => openZoomedImage(item)}
        //     src={item.thumbnailUrl}
        //     alt={item.thumbnailDescription}
        //     layout="fill"
        //     className={styles.pressReview}
        //   />
        // </div>
        // <div onClick={() => openZoomedImage(item)}>
        <PressReviewCard
          key={item._id}
          {...item}
          openZoomedImage={openZoomedImage}
        />
        // </div>
      ))}

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
