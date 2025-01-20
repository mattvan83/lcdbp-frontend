"use client";

import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col, Container } from "react-bootstrap";
import PressReviewsContainer from "@/components/PressReviewsContainer";
import { PressReview } from "@/app/(public)/page";
import { PressReviewGroup } from "@/app/(public)/pressReviews/page";
import styles from "../styles/PressReviewsDivision.module.css";

interface PressReviewsDivisionProps {
  reviews: {
    result: boolean;
    years: string[];
    pressReviewsGrouped: PressReviewGroup[];
  };
}

const PressReviewsDivision: React.FC<PressReviewsDivisionProps> = ({
  reviews,
}) => {
  const years = reviews.years;
  const [selectedYear, setSelectedYear] = useState<string>(years[0]);

  const pressReviews = reviews.pressReviewsGrouped.find(
    (pressReviewGroup: PressReviewGroup) =>
      pressReviewGroup.year === Number(selectedYear)
  )?.pressReviews;

  const handleSelectYear = (eventKey: string | null): void => {
    if (eventKey !== null) {
      setSelectedYear(eventKey);
    }
  };

  return (
    <div className={styles.pressReviewsDivision}>
      <h3>Nos Revues De Presse</h3>
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

      {pressReviews && (
        <PressReviewsContainer
          currentPage="PressReviews"
          pressReviews={pressReviews}
          width={400}
          height={550}
        />
      )}
    </div>
  );
};

export default PressReviewsDivision;
