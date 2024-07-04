"use client";

import styles from "./page.module.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Image from "next/image";

export default function Chore() {
  return (
    // <div className={styles.directionDivision}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="mt-4 mb-4">
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Une Direction</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Une Passion</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Une Ville</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Un Passé</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Un Avenir</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className={`mx-4 ${styles.tabDivision}`}>
            <Tab.Pane eventKey="first" className={styles.tabSection}>
              <h3>Notre Chef</h3>
              <div className={styles.directionHeader}>
                <Image
                  src="/JPV.jpg"
                  alt="Photo de profil de Jean-Paul Vanhoutte"
                  width={200}
                  height={240}
                  className={styles.profilImage}
                />
                <p className={styles.directionText}>
                  Jean-Paul Vanhoutte a commencé le piano au conservatoire de
                  Tourcoing à l’âge de 10 ans, puis s’est orienté vers le
                  hautbois. Il est rentré à l’âge de 17 ans chez les «
                  Crick-Sicks », chœur d’hommes réputé de Tourcoing. Il fait son
                  service militaire dans la musique du 8ème RCS d’Amiens. A 30
                  ans, la mobilité de son métier d’hôtelier lui fait cesser
                  toute activité musicale.
                </p>
              </div>

              <p className={styles.directionText}>
                Sa carrière l’amène en 2005 en Bourgogne-Franche-Comté, il fera
                un bref passage à l’harmonie Revermontaise de
                Savigny-en-Revermont. Puis retour dans le nord pour la fin de sa
                carrière professionnelle pendant laquelle il retrouvera le chœur
                d’hommes de Tourcoing.
              </p>
              <p className={styles.directionText}>
                Une fois en retraite, de retour à Savigny-en-Revermont, le
                besoin de chanter reste présent, sa recherche de chœur d’hommes
                le mène à rentrer en 2019 au « Chœur du Bon Pays » de Cousance.
                Il a été très vite intégré dans le pupitre des basses, sous la
                baguette de Roland Ménéguz.
              </p>
              <p className={styles.directionText}>
                Ce dernier ayant quitté ses fonctions en juin 2022, c’est
                d’abord en tant qu’intérim que Jean-Paul Vanhoutte a pris la
                direction du Chœur du Bon Pays. Puis, après le Concert de
                Château-Chalon en octobre 2022, le conseil d’administration a
                confirmé et officialisé son poste de chef de chœur.
              </p>
            </Tab.Pane>
            <Tab.Pane eventKey="second" className={styles.tabSection}>
              <h3>Une Passion</h3>
              <div className={styles.passionHeader}>
                <Image
                  src="/Chore.jpg"
                  alt="Photo du choeur d'hommes du Bon Pays"
                  width={700}
                  height={500}
                  className={styles.choreImage}
                />
                <div className={styles.passionText}>
                  <p className={styles.directionText}>
                    Notre effectif est d’une trentaine d’hommes, répartis en
                    quatre pupitres : deux de ténors, barytons, basses.
                  </p>
                  <p className={styles.directionText}>
                    Notre volonté est de vous faire découvrir un répertoire
                    polyphonique éclectique, negro-spiritual, sacré,
                    contemporain, avec une place particulière pour le chant
                    traditionnel du Jura.
                  </p>
                  <p className={styles.directionText}>
                    Ensemble solidaire, respectueux, le chœur c’est l’affaire de
                    Tous. Notre devise : éprouver du plaisir à se retrouver pour
                    chanter et le transmettre.
                  </p>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    // </div>
  );
}
