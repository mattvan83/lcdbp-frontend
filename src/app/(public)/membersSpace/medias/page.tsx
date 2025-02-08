import React from "react";
import MediasDivision from "@/components/MediasDivision";
import MediasContainer from "@/components/MediasContainer";
import { cookies } from "next/headers";
import styles from "./page.module.css";

const { BACKEND_ADDRESS } = process.env;

export interface Media {
  _id: string;
  mediaDate: Date;
  title: string;
  audioUrls: string[];
  imageUrls: string[];
  videoUrls: string[];
}

export interface MediaGroupedByYear {
  year: number;
  medias: Media[];
}

interface MediaGroupedByCategory {
  mediaCategory: string;
  years: string[];
  yearsGrouped: MediaGroupedByYear[];
}

export default async function Medias() {
  // Get the token from cookies
  const cookieStore = cookies();
  const userToken = cookieStore.get("user_token")?.value;

  const response = await fetch(`${BACKEND_ADDRESS}/medias/groupedMedias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: userToken,
    }),
    next: { tags: ["medias"] },
  });
  const medias = await response.json();

  const mediaContainers = medias.result
    ? medias.mediasGrouped.map(
        (mediasGroupedByCategory: MediaGroupedByCategory) => (
          <MediasContainer
            key={mediasGroupedByCategory.mediaCategory}
            yearsArray={mediasGroupedByCategory.years}
            mediasGroupedByYear={mediasGroupedByCategory.yearsGrouped}
          />
        )
      )
    : medias.error;

  return (
    <main>
      {userToken && medias.result && (
        <MediasDivision mediaContainers={mediaContainers} />
      )}
      {userToken && !medias.result && <p>{medias.error}</p>}
    </main>
  );
}
