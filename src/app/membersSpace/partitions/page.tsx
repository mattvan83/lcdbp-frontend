import React from "react";
import PartitionsDivision from "@/components/PartitionsDivision";
import styles from "./page.module.css";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default async function Partitions() {
  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedPartitions`
  );
  const partitions = await response.json();

  return (
    <main>
      {partitions.result && <PartitionsDivision partitions={partitions} />}
      {!partitions.result && <p>{partitions.error}</p>}
    </main>
  );
}
