"use client";

import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Partition } from "@/app/membersSpace/partitions/page";
import PartitionsContainer from "@/components/PartitionsContainer";
import styles from "../styles/PartitionsDivision.module.css";

interface PartitionsDivisionProps {
  partitionsContainers: React.ReactNode[];
}

const PartitionsDivision: React.FC<PartitionsDivisionProps> = ({
  partitionsContainers,
}) => {
  // const { categories } = partitions;
  // const [selectedCategory, setSelectedCategory] = useState<string>(
  //   categories[0]
  // );

  // const selectedPartitions = partitions.partitionsGrouped.find(
  //   (partitionGroup: PartitionGroup) =>
  //     partitionGroup.category === selectedCategory
  // )?.partitions;

  // const handleSelectCategory = (eventKey: string | null): void => {
  //   if (eventKey !== null) {
  //     if (eventKey === "first") {
  //       setSelectedCategory("A");
  //     } else if (eventKey === "second") {
  //       setSelectedCategory("B");
  //     } else if (eventKey === "third") {
  //       setSelectedCategory("C");
  //     } else if (eventKey === "fourth") {
  //       setSelectedCategory("D");
  //     } else if (eventKey === "fifth") {
  //       setSelectedCategory("E");
  //     }
  //   }
  // };

  return (
    <div className={styles.partitionsDivision}>
      <h3>Nos Partitions</h3>

      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        // onSelect={handleSelectCategory}
      >
        <Row className="mt-4 mb-4">
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className={styles.navbarLink}>
                  Profanes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className={styles.navbarLink}>
                  Religieux
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className={styles.navbarLink}>
                  Classique
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth" className={styles.navbarLink}>
                  Traditionnel
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth" className={styles.navbarLink}>
                  Noël
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content className={`mx-4 ${styles.tabDivision}`}>
              <Tab.Pane eventKey="first" className={styles.tabSection}>
                {partitionsContainers && partitionsContainers[0]}
              </Tab.Pane>

              <Tab.Pane eventKey="second" className={styles.tabSection}>
                {partitionsContainers && partitionsContainers[1]}
              </Tab.Pane>

              <Tab.Pane eventKey="third" className={styles.tabSection}>
                {partitionsContainers && partitionsContainers[2]}
              </Tab.Pane>

              <Tab.Pane eventKey="fourth" className={styles.tabSection}>
                {partitionsContainers && partitionsContainers[3]}
              </Tab.Pane>

              <Tab.Pane eventKey="fifth" className={styles.tabSection}>
                {partitionsContainers && partitionsContainers[4]}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PartitionsDivision;
