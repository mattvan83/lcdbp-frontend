import Image from "next/image";
import styles from "./page.module.css";
import { PressReview } from "@/app/page";
import PressReviewsDivision from "@/components/PressReviewsDivision";

export interface PressReviewGroup {
  year: number;
  pressReviews: PressReview[];
}

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default async function PressReviews() {
  const response = await fetch(`${BACKEND_ADDRESS}/pressReviews/grouped`);
  const reviews = await response.json();

  return (
    <main>
      {reviews.result && <PressReviewsDivision reviews={reviews} />}
      {!reviews.result && <p>{reviews.error}</p>}
    </main>
  );
}
