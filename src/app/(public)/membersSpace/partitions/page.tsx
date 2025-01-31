import React from "react";
import PartitionsDivision from "@/components/PartitionsDivision";
import PartitionsContainer from "@/components/PartitionsContainer";
import { cookies } from "next/headers";
import styles from "./page.module.css";

const { BACKEND_ADDRESS } = process.env;

export interface Partition {
  _id: string;
  code: string;
  title: string;
  artwork: string;
  partitionUrl: string;
  partitionThumbnailUrl: string;
  authorMusic: string;
  isAtWork: boolean;
}

interface PartitionGroup {
  category: string;
  partitions: Partition[];
}

export default async function Partitions() {
  // Get the token from cookies
  const cookieStore = cookies();
  const userToken = cookieStore.get("user_token")?.value;

  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedPartitionsWorks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: userToken,
      }),
    }
  );
  const partitions = await response.json();

  const partitionsContainers = partitions.result
    ? partitions.partitionsGrouped.map((partitionsGroup: PartitionGroup) => (
        <PartitionsContainer
          key={partitionsGroup.category}
          partitions={partitionsGroup.partitions}
        />
      ))
    : partitions.error;

  return (
    <main>
      {userToken && partitions.result && (
        <PartitionsDivision partitionsContainers={partitionsContainers} />
      )}
      {userToken && !partitions.result && <p>{partitions.error}</p>}
    </main>
  );
}
