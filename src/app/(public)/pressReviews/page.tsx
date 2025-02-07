import Image from "next/image";
import styles from "./page.module.css";
import { PressReview } from "@/app/(public)/page";
import PressReviewsDivision from "@/components/PressReviewsDivision";

export interface PressReviewGroup {
  year: number;
  pressReviews: PressReview[];
}

const { BACKEND_ADDRESS } = process.env;

export default async function PressReviews() {
  const response = await fetch(`${BACKEND_ADDRESS}/pressReviews/grouped`, {
    next: { tags: ["pressReviews"] },
  });
  const reviews = await response.json();

  return (
    <main>
      {reviews.result && <PressReviewsDivision reviews={reviews} />}
      {!reviews.result && <p>{reviews.error}</p>}
    </main>
  );
}
