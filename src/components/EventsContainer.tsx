import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../styles/EventsContainer.module.css";
import Carousel from "@/components/Carousel";
import { Event } from "@/app/(public)/page";
import ButtonLink from "./ButtonLink";

interface EventsContainerProps {
  currentPage: string;
  events: Event[];
  width: number;
  height: number;
}

const EventsContainer: React.FC<EventsContainerProps> = ({
  currentPage,
  events,
  width,
  height,
}) => {
  let divisionStyle = {};
  if (currentPage === "Events") {
    divisionStyle = {
      //   backgroundColor: "#ddd9d9",
      backgroundColor: "#ffffff",
    };
  }

  return (
    <div className={styles.eventDivision} style={divisionStyle}>
      <div className={styles.eventSection}>
        {currentPage !== "Events" && <h3>Actualités</h3>}
        <div className={styles.eventContent}>
          <Carousel
            images={events}
            width={width}
            height={height}
            category="events"
          />
        </div>
        {currentPage !== "Events" && (
          <ButtonLink
            href="/events"
            eKey="events"
            buttonTitle="Voir tous les évènements"
          />
        )}
      </div>
    </div>
  );
};

export default EventsContainer;
