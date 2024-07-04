"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";
import { Event } from "@/app/page";
import { PressReview } from "@/app/page";
import PressReviewCard from "./PressReviewCard";

type CarouselProps = {
  images: Event[] | PressReview[];
  width: number;
  height: number;
  category: string;
};

export default function Carousel({
  images,
  width,
  height,
  category,
}: CarouselProps) {
  const [zoomedImage, setZoomedImage] = useState<Event | PressReview | null>(
    null
  );

  // Function to open zoomed image
  const openZoomedImage = (item: Event | PressReview): void => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  return (
    <>
      {category === "events" &&
        images.map((item: Event | PressReview) => {
          if (!("journal" in item)) {
            const containerWidth = width;
            const containerHeight = height;
            const imageWidth = containerWidth;
            const imageHeight = containerHeight;
            return (
              <div
                key={item._id}
                className={styles.eventContainer}
                style={{
                  width: `${containerWidth}px`,
                  height: `${containerHeight}px`,
                }}
              >
                <Image
                  onClick={() => openZoomedImage(item)}
                  src={item.thumbnailUrl}
                  alt={item.thumbnailDescription}
                  // layout="fill"
                  width={imageWidth}
                  height={imageHeight}
                  className={styles.event}
                />
              </div>
            );
          }
        })}
      {category === "pressReviews" &&
        images.map((item: Event | PressReview) => {
          if ("journal" in item) {
            return (
              <PressReviewCard
                key={item._id}
                {...item}
                openZoomedImage={openZoomedImage}
              />
            );
          }
        })}
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
