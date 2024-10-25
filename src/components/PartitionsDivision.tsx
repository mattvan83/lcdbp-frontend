"use client";

import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import PartitionsContainer from "@/components/PartitionsContainer";
import { EventGroup } from "@/app/events/page";
import styles from "../styles/PartitionsDivision.module.css";

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

interface PartitionsDivisionProps {
  partitions: {
    result: boolean;
    categories: string[];
    partitionsGrouped: PartitionGroup[];
  };
}

const PartitionsDivision: React.FC<PartitionsDivisionProps> = ({
  partitions,
}) => {
  const { categories } = partitions;
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const selectedPartitions = partitions.partitionsGrouped.find(
    (partitionGroup: PartitionGroup) =>
      partitionGroup.category === selectedCategory
  )?.partitions;

  const handleSelectCategory = (eventKey: string | null): void => {
    if (eventKey !== null) {
      setSelectedCategory(eventKey);
    }
  };

  return (
    <div className={styles.partitionsDivision}>
      <h3>Nos Partitions</h3>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                {selectedPartitions && (
                  <PartitionsContainer partitions={selectedPartitions} />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PartitionsDivision;
