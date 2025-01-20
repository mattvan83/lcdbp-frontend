import React from "react";
import styles from "../styles/WorkRecordingsContainer.module.css";
import Carousel from "@/components/Carousel";
import { WorkRecording } from "@/app/(public)/membersSpace/workRecordings/page";

interface WorkRecordingsContainerProps {
  workRecordings: WorkRecording[];
}

const WorkRecordingsContainer: React.FC<WorkRecordingsContainerProps> = ({
  workRecordings,
}) => {
  return (
    <div className={styles.workRecordingsDivision}>
      <div className={styles.workRecordingsContent}>
        <Carousel
          images={workRecordings}
          width={400}
          height={550}
          category="workRecordings"
        />
      </div>
    </div>
  );
};

export default WorkRecordingsContainer;
