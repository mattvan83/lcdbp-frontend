"use client";

import styles from "../styles/Carousel.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { EventMainPage, Event, PressReview } from "@/app/page";
import { Partition } from "@/components/PartitionsDivision";
import { WorkRecording } from "@/app/membersSpace/workRecordings/page";
import PressReviewCard from "./PressReviewCard";
import EventCard from "./EventCard";
import PartitionCard from "./PartitionCard";
import WorkRecordingCard from "./WorkRecordingCard";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";
import Button from "react-bootstrap/Button";

type CarouselProps = {
  images:
    | EventMainPage[]
    | Event[]
    | PressReview[]
    | Partition[]
    | WorkRecording[];
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
  const [partitionPdf, setPartitionPdf] = useState<Partition | null>(null);
  const [workRecordingPdf, setworkRecordingPdf] =
    useState<WorkRecording | null>(null);

  // Function to open zoomed image
  const openZoomedImage = (item: EventMainPage | Event | PressReview): void => {
    setZoomedImage(item);
  };

  // Function to close zoomed image
  const closeZoomedImage = (): void => {
    setZoomedImage(null);
  };

  const openPartitionPdf = (item: Partition): void => {
    setPartitionPdf(item);
  };

  const closePartitionPdf = (): void => {
    setPartitionPdf(null);
  };

  const openWorkRecordingPdf = (item: WorkRecording): void => {
    setworkRecordingPdf(item);
  };

  const closeWorkRecordingPdf = (): void => {
    setworkRecordingPdf(null);
  };

  // console.log("partitionPdf: ", partitionPdf);

  return (
    <>
      {category === "eventsMainPage" &&
        images.map(
          (
            item:
              | EventMainPage
              | Event
              | PressReview
              | Partition
              | WorkRecording
          ) => {
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
                  {"thumbnailUrl" in item && "thumbnailDescription" in item ? (
                    <Image
                      onClick={() =>
                        openZoomedImage(
                          item as EventMainPage | Event | PressReview
                        )
                      }
                      src={item.thumbnailUrl}
                      alt={item.thumbnailDescription}
                      // layout="fill"
                      width={imageWidth}
                      height={imageHeight}
                      className={styles.event}
                    />
                  ) : null}
                </div>
              );
            }
          }
        )}

      {category === "events" &&
        images.map(
          (
            item:
              | EventMainPage
              | Event
              | PressReview
              | Partition
              | WorkRecording
          ) => {
            if ("chores" in item) {
              return (
                <EventCard
                  key={item._id}
                  {...item}
                  openZoomedImage={openZoomedImage}
                />
              );
            }
          }
        )}

      {category === "pressReviews" &&
        images.map(
          (
            item:
              | EventMainPage
              | Event
              | PressReview
              | Partition
              | WorkRecording
          ) => {
            if ("journal" in item) {
              return (
                <PressReviewCard
                  key={item._id}
                  {...item}
                  openZoomedImage={openZoomedImage}
                />
              );
            }
          }
        )}

      {category === "partitions" &&
        !partitionPdf &&
        images.map(
          (
            item:
              | EventMainPage
              | Event
              | PressReview
              | Partition
              | WorkRecording
          ) => {
            if ("partitionUrl" in item && "isAtWork" in item) {
              return (
                <PartitionCard
                  key={item._id}
                  {...item}
                  openPartitionPdf={openPartitionPdf}
                />
              );
            }
          }
        )}

      {partitionPdf && (
        <div className={styles.pdfViewerContainer}>
          <Button
            variant="primary"
            onClick={closePartitionPdf}
            className={styles.pdfViewerButton}
          >
            Fermer
          </Button>
          <iframe
            src={getOptimizedCloudinaryUrl(partitionPdf.partitionUrl)}
            className={styles.pdfViewerIFrame}
            title="PDF Viewer"
          />
        </div>
      )}

      {category === "workRecordings" &&
        images.map(
          (
            item:
              | EventMainPage
              | Event
              | PressReview
              | Partition
              | WorkRecording
          ) => {
            if ("recordingUrl" in item) {
              return (
                <WorkRecordingCard
                  key={item._id}
                  {...item}
                  openWorkRecordingPdf={openWorkRecordingPdf}
                />
              );
            }
          }
        )}

      {workRecordingPdf && (
        <div className={styles.pdfViewerContainer}>
          <Button
            variant="primary"
            onClick={closeWorkRecordingPdf}
            className={styles.pdfViewerButton}
          >
            Fermer
          </Button>
          <iframe
            src={getOptimizedCloudinaryUrl(workRecordingPdf.partitionUrl)}
            className={styles.pdfViewerIFrame}
            title="PDF Viewer"
          />
        </div>
      )}

      {zoomedImage && (
        <div className={styles.zoomedImageContainer} onClick={closeZoomedImage}>
          <Image
            src={
              category === "eventsMainPage"
                ? zoomedImage.thumbnailUrl
                : getOptimizedCloudinaryUrl(zoomedImage.thumbnailUrl)
            }
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
