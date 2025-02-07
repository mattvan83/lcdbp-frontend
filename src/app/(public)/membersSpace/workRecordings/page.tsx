import React from "react";
import WorkRecordingsDivision from "@/components/WorkRecordingsDivision";
import WorkRecordingsContainer from "@/components/WorkRecordingsContainer";
import { cookies } from "next/headers";
import styles from "./page.module.css";

const { BACKEND_ADDRESS } = process.env;

export interface WorkRecording {
  _id: string;
  title: string;
  artwork: string;
  partitionUrl: string;
  partitionThumbnailUrl: string;
  authorMusic: string;
  recordingUrl: string;
  recordingDescription: string;
}

interface WorkRecordingGroup {
  voice: string;
  workRecordings: WorkRecording[];
}

export default async function WorkRecordings() {
  // Get the token from cookies
  const cookieStore = cookies();
  const userToken = cookieStore.get("user_token")?.value;

  // const response = await fetch(
  //   `${BACKEND_ADDRESS}/studiedWorks/groupedWorkRecordings`
  // );
  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedRecordingsWorks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: userToken,
      }),
      next: { tags: ["recordings"] },
    }
  );
  const workRecordings = await response.json();

  // console.log("workRecordings: ", workRecordings);

  const workRecordingsContainers = workRecordings.result
    ? workRecordings.workRecordingsGrouped.map(
        (workRecordingsGroup: WorkRecordingGroup) => (
          <WorkRecordingsContainer
            key={workRecordingsGroup.voice}
            workRecordings={workRecordingsGroup.workRecordings}
          />
        )
      )
    : workRecordings.error;

  return (
    <main>
      {userToken && workRecordings.result && (
        <WorkRecordingsDivision
          workRecordingsContainers={workRecordingsContainers}
        />
      )}
      {userToken && !workRecordings.result && <p>{workRecordings.error}</p>}
    </main>
  );
}
