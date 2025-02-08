"use client";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import EventContainer from "@/components/EventsContainer";
import {
  MediaGroupedByYear,
  Media,
} from "@/app/(public)/membersSpace/medias/page";
import styles from "../styles/MediasContainer.module.css";

interface MediasContainerProps {
  yearsArray: string[];
  mediasGroupedByYear: MediaGroupedByYear[];
}

const MediasContainer: React.FC<MediasContainerProps> = ({
  yearsArray,
  mediasGroupedByYear,
}) => {
  const years = yearsArray;
  const [selectedYear, setSelectedYear] = useState<string>(years[0]);

  const selectedMedias = mediasGroupedByYear.find(
    (mediasGroup: MediaGroupedByYear) =>
      mediasGroup.year === Number(selectedYear)
  )?.medias;

  const handleSelectYear = (eventKey: string | null): void => {
    if (eventKey !== null) {
      setSelectedYear(eventKey);
    }
  };

  return (
    <div className={styles.mediasContainer}>
      <Dropdown onSelect={handleSelectYear} className={`mt-4`}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Année : {selectedYear}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropdownMenu}>
          {years.map((year) => (
            <Dropdown.Item key={year} eventKey={year}>
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedMedias && (
        <EventContainer
          currentPage="Events"
          medias={selectedMedias}
          width={400}
          height={550}
        />
      )}
    </div>
  );
};

export default MediasContainer;
