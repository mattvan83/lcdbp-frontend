"use client";

import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import Image from "next/image";
import { EventMainPage, Event, PressReview } from "@/app/page";
import PressReviewCard from "./PressReviewCard";
import EventCard from "./EventCard";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

type CarouselProps = {
  images: EventMainPage[] | Event[] | PressReview[];
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
  const [zoomedImage, setZoomedImage] = useState<
    EventMainPage | Event | PressReview | null
  >(null);

  // Function to open zoomed image
  const openZoomedImage = (item: EventMainPage | Event | PressReview): void => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  return (
    <>
      {category === "eventsMainPage" &&
        images.map((item: EventMainPage | Event | PressReview) => {
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

      {category === "events" &&
        images.map((item: EventMainPage | Event | PressReview) => {
          if ("chores" in item) {
            return (
              <EventCard
                key={item._id}
                {...item}
                openZoomedImage={openZoomedImage}
              />
            );
          }
        })}

      {category === "pressReviews" &&
        images.map((item: EventMainPage | Event | PressReview) => {
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
            src={getOptimizedCloudinaryUrl(zoomedImage.thumbnailUrl)}
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
