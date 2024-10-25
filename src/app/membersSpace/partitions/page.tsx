import { useState } from "react";
import React from "react";
import PartitionsDivision from "@/components/PartitionsDivision";
import styles from "./page.module.css";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default async function Partitions() {
  const response = await fetch(
    `${BACKEND_ADDRESS}/studiedWorks/groupedPartitions`
  );
  const partitions = await response.json();

  // const [showPdf, setShowPdf] = useState(false); // State to control visibility of iframe

  // const togglePdfViewer = () => {
  //   setShowPdf(!showPdf); // Toggle showPdf state
  // };

  return (
    <main>
      {partitions.result && <PartitionsDivision partitions={partitions} />}
      {!partitions.result && <p>{partitions.error}</p>}

      {/* <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        {showPdf && (
          <iframe
            src="/sample.pdf"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PDF Viewer"
          />
        )}
        <button
          className={styles.closeButton}
          onClick={togglePdfViewer}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#ffffff",
            border: "1px solid #cccccc",
            borderRadius: "5px",
          }}
        >
          Close PDF
        </button>
      </div> */}
    </main>
  );
}
