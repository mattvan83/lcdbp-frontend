"use client";
import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col, Container } from "react-bootstrap";
import PressReviewsContainer from "@/components/PressReviewsContainer";
import { PressReview } from "@/app/page";
import { PressReviewGroup } from "@/app/pressReviews/page";
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

  const handleSelectYear = (eventKey: string | null): void => {
    if (eventKey !== null) {
      setSelectedYear(eventKey);
    }
  };

  const pressReviews = reviews.pressReviewsGrouped.find(
    (pressReviewGroup: PressReviewGroup) =>
      pressReviewGroup.year === Number(selectedYear)
  )?.pressReviews;

  return (
    <div className={styles.pressReviewsDivision}>
      <h3>Nos revues de presse</h3>
      <DropdownButton
        id="dropdown-basic-button"
        title={`Année : ${selectedYear}`}
        onSelect={handleSelectYear}
        className="mt-4"
      >
        {years.map((year) => (
          <Dropdown.Item key={year} eventKey={year}>
            {year}
          </Dropdown.Item>
        ))}
      </DropdownButton>

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
