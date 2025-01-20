"use client";

import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { WorkRecording } from "@/app/(public)/membersSpace/workRecordings/page";
import styles from "../styles/WorkRecordingsDivision.module.css";

interface WorkRecordingsDivisionProps {
  workRecordingsContainers: React.ReactNode[];
}

const WorkRecordingsDivision: React.FC<WorkRecordingsDivisionProps> = ({
  workRecordingsContainers,
}) => {
  return (
    <div className={styles.workRecordingsDivision}>
      <h3>Nos Enregistrements de Travail</h3>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                {workRecordingsContainers && workRecordingsContainers[0]}
              </Tab.Pane>

              <Tab.Pane eventKey="second" className={styles.tabSection}>
                {workRecordingsContainers && workRecordingsContainers[1]}
              </Tab.Pane>

              <Tab.Pane eventKey="third" className={styles.tabSection}>
                {workRecordingsContainers && workRecordingsContainers[2]}
              </Tab.Pane>

              <Tab.Pane eventKey="fourth" className={styles.tabSection}>
                {workRecordingsContainers && workRecordingsContainers[3]}
              </Tab.Pane>

              <Tab.Pane eventKey="fifth" className={styles.tabSection}>
                {workRecordingsContainers && workRecordingsContainers[4]}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default WorkRecordingsDivision;
