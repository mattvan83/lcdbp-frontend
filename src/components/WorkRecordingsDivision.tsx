"use client";

import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import WorkRecordingsContainer from "@/components/WorkRecordingsContainer";
import styles from "../styles/WorkRecordingsDivision.module.css";

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

interface WorkRecordingsDivisionProps {
  workRecordings: {
    result: boolean;
    voices: string[];
    workRecordingsGrouped: WorkRecordingGroup[];
  };
}

const WorkRecordingsDivision: React.FC<WorkRecordingsDivisionProps> = ({
  workRecordings,
}) => {
  const { voices } = workRecordings;
  const [selectedVoice, setSelectedVoice] = useState<string>(voices[0]);

  const selectedWorkRecordings = workRecordings.workRecordingsGrouped.find(
    (workRecordingsGroup: WorkRecordingGroup) =>
      workRecordingsGroup.voice === selectedVoice
  )?.workRecordings;

  const handleSelectVoice = (eventKey: string | null): void => {
    if (eventKey !== null) {
      if (eventKey === "first") {
        setSelectedVoice("baryton");
      } else if (eventKey === "second") {
        setSelectedVoice("bass");
      } else if (eventKey === "third") {
        setSelectedVoice("tenor1");
      } else if (eventKey === "fourth") {
        setSelectedVoice("tenor2");
      } else if (eventKey === "fifth") {
        setSelectedVoice("tutti");
      }
    }
  };

  return (
    <div className={styles.workRecordingsDivision}>
      <h3>Nos Enregistrements de Travail</h3>

      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        onSelect={handleSelectVoice}
      >
        <Row className="mt-4 mb-4">
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className={styles.navbarLink}>
                  Barytons
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className={styles.navbarLink}>
                  Basses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className={styles.navbarLink}>
                  Ténors 1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth" className={styles.navbarLink}>
                  Ténors 2
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth" className={styles.navbarLink}>
                  Tutti
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content className={`mx-4 ${styles.tabDivision}`}>
              <Tab.Pane eventKey="first" className={styles.tabSection}>
                {selectedWorkRecordings && (
                  <WorkRecordingsContainer
                    workRecordings={selectedWorkRecordings}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="second" className={styles.tabSection}>
                {selectedWorkRecordings && (
                  <WorkRecordingsContainer
                    workRecordings={selectedWorkRecordings}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="third" className={styles.tabSection}>
                {selectedWorkRecordings && (
                  <WorkRecordingsContainer
                    workRecordings={selectedWorkRecordings}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="fourth" className={styles.tabSection}>
                {selectedWorkRecordings && (
                  <WorkRecordingsContainer
                    workRecordings={selectedWorkRecordings}
                  />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="fifth" className={styles.tabSection}>
                {selectedWorkRecordings && (
                  <WorkRecordingsContainer
                    workRecordings={selectedWorkRecordings}
                  />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default WorkRecordingsDivision;
