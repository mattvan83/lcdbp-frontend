"use client";
import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col, Container } from "react-bootstrap";
import EventContainer from "@/components/EventsContainer";
import { EventGroup } from "@/app/events/page";
import styles from "../styles/EventsDivision.module.css";

interface EventsDivisionProps {
  events: {
    result: boolean;
    years: string[];
    eventsGrouped: EventGroup[];
  };
}

const EventsDivision: React.FC<EventsDivisionProps> = ({ events }) => {
  const years = events.years;
  const [selectedYear, setSelectedYear] = useState<string>(years[0]);

  const selectedEvents = events.eventsGrouped.find(
    (eventGroup: EventGroup) => eventGroup.year === Number(selectedYear)
  )?.events;

  const handleSelectYear = (eventKey: string | null): void => {
    if (eventKey !== null) {
      setSelectedYear(eventKey);
    }
  };

  return (
    <div className={styles.eventsDivision}>
      <h3>Nos Evènements</h3>
      <Dropdown onSelect={handleSelectYear} className={`mt-4`}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Année : {selectedYear}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropdownMenu}>
          {years.map((year) => (
            <Dropdown.Item
              key={year}
              eventKey={year}
              //   className={styles.dropdownItem}
            >
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedEvents && (
        <EventContainer
          currentPage="Events"
          events={selectedEvents}
          width={400}
          height={550}
        />
      )}
    </div>
  );
};

export default EventsDivision;
