import React from "react";
import WorkRecordingsDivision from "@/components/WorkRecordingsDivision";
import styles from "./page.module.css";

const { BACKEND_ADDRESS } = process.env;

export default async function WorkRecordings() {
  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedWorkRecordings`
  );
  const workRecordings = await response.json();

  //   console.log("workRecordings: ", workRecordings);

  return (
    <main>
      {workRecordings.result && (
        <WorkRecordingsDivision workRecordings={workRecordings} />
      )}
      {!workRecordings.result && <p>{workRecordings.error}</p>}
    </main>
  );
}
