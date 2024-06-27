import Image from "next/image";
import styles from "./page.module.css";
import PressReviewsContainer from "@/components/PressReviewsContainer";
import { PressReview } from "@/app/page";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default async function PressReviews() {
  const response = await fetch(`${BACKEND_ADDRESS}/pressReviews/list`);
  const reviews = await response.json();

  const pressReviews = reviews.result ? reviews.pressReviews : reviews.error;

  return (
    <main>
      <PressReviewsContainer
        currentPage="PressReviews"
        pressReviews={pressReviews}
        width={400}
        height={550}
      />
    </main>
  );
}
