"use client";

import { Tab, Row, Col, Nav } from "react-bootstrap";
import styles from "../styles/MediasDivision.module.css";

interface MediasDivisionProps {
  mediaContainers: React.ReactNode[];
}

const MediasDivision: React.FC<MediasDivisionProps> = ({ mediaContainers }) => {
  return (
    <div className={styles.mediasDivision}>
      <h3 className={styles.mediasHeader}>Nos Souvenirs</h3>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="mt-4 mb-4">
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className={styles.navbarLink}>
                  AG - CA
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className={styles.navbarLink}>
                  Concerts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className={styles.navbarLink}>
                  Moments De Détente
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth" className={styles.navbarLink}>
                  Un Choeur Au Travail
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content className={`mx-4 ${styles.tabDivision}`}>
              <Tab.Pane eventKey="first" className={styles.tabSection}>
                {mediaContainers.length && mediaContainers[0]}
              </Tab.Pane>

              <Tab.Pane eventKey="second" className={styles.tabSection}>
                {mediaContainers.length && mediaContainers[1]}
              </Tab.Pane>

              <Tab.Pane eventKey="third" className={styles.tabSection}>
                {mediaContainers.length && mediaContainers[2]}
              </Tab.Pane>

              <Tab.Pane eventKey="fourth" className={styles.tabSection}>
                {mediaContainers.length && mediaContainers[3]}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default MediasDivision;
