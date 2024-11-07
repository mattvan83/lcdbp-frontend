import React from "react";
import PartitionsDivision from "@/components/PartitionsDivision";
import PartitionsContainer from "@/components/PartitionsContainer";
import styles from "./page.module.css";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

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
  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedPartitions`
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
      {partitions.result && (
        <PartitionsDivision partitionsContainers={partitionsContainers} />
      )}
      {!partitions.result && <p>{partitions.error}</p>}
    </main>
  );
}
