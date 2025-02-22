import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../styles/PressReviewsContainer.module.css";
import Carousel from "@/components/Carousel";
import { PressReview } from "@/app/(public)/page";
import ButtonLink from "./ButtonLink";

interface PressReviewsContainerProps {
  currentPage: string;
  pressReviews: PressReview[];
  width: number;
  height: number;
}

const PressReviewsContainer: React.FC<PressReviewsContainerProps> = ({
  currentPage,
  pressReviews,
  width,
  height,
}) => {
  let divisionStyle = {};
  if (currentPage === "PressReviews") {
    divisionStyle = {
      //   backgroundColor: "#ddd9d9",
      backgroundColor: "#ffffff",
    };
  }

  return (
    <div className={styles.pressDivision} style={divisionStyle}>
      <div className={styles.pressSection}>
        {currentPage !== "PressReviews" && (
          <h3>Nos Dernières Revues De Presse</h3>
        )}
        <div className={styles.pressContent}>
          <Carousel
            images={pressReviews}
            width={width}
            height={height}
            category="pressReviews"
          />
        </div>
        {currentPage !== "PressReviews" && (
          <ButtonLink
            href="/pressReviews"
            eKey="pressReview"
            buttonTitle="Voir toutes les revues de presse"
          />
        )}
      </div>
    </div>
  );
};

export default PressReviewsContainer;
