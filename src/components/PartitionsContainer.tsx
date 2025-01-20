import React from "react";
import styles from "../styles/PartitionsContainer.module.css";
import Carousel from "@/components/Carousel";
import { Partition } from "@/app/(public)/membersSpace/partitions/page";

interface PartitionsContainerProps {
  partitions: Partition[];
}

const PartitionsContainer: React.FC<PartitionsContainerProps> = ({
  partitions,
}) => {
  return (
    <div className={styles.partitionDivision}>
      <div className={styles.partitionContent}>
        <Carousel
          images={partitions}
          width={400}
          height={550}
          category="partitions"
        />
      </div>
    </div>
  );
};

export default PartitionsContainer;
