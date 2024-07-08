"use client";

import styles from "./page.module.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Image from "next/image";
import ChoreDescription from "@/components/ChoreDescription";

export default function Chore() {
  return (
    // <div className={styles.directionDivision}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="mt-4 mb-4">
        <Col md={3}>
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
        <Col md={9}>
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
                <p className={styles.directionFirstText}>
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

            <Tab.Pane eventKey="third" className={styles.tabSection}>
              <h3>Cousance, Notre Ville d'Accueil</h3>
              <div className={styles.cityHeader}>
                <Image
                  src="/Cousance.png"
                  alt="Photo de l'écusson de la ville de Cousance"
                  width={700}
                  height={500}
                  className={styles.cityImage}
                />
                <div className={styles.cityText}>
                  <p className={styles.directionText}>
                    Nous avons adopté le nom de "Chœur du Bon Pays", en
                    référence au Revermont, cette zone géographique des premiers
                    contreforts du massif jurassien avec pour siège social la
                    commune de Cousance, Porte du Jura.
                  </p>
                  <p className={styles.directionText}>
                    Nous ne remercierons jamais assez Cousance et ses élus pour
                    leur accueil, leur aide et la mise à disposition de moyens
                    logistiques pour nos répétitions et nos concerts.
                  </p>
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane
              eventKey="fourth"
              className={`${styles.tabSection} ${styles.pastSection}`}
            >
              <ChoreDescription
                index={1}
                headerTitle="Notre Naissance"
                thumbnailUrl1="https://res.cloudinary.com/dp7dvsuvo/image/upload/v1719914112/lcdbp/pressReviews/images/sktwi22l4ly48ge1gundefined_szcese.jpg"
                width1={350}
                height1={350}
                thumbnailUrl2="/Naissance_LCDBP.jpg"
                width2={350}
                height2={250}
                description="Le 10 septembre 2010, par la volonté d’un petit groupe
                    d’hommes de se retrouver pour chanter, a lieu la première
                    répétition, à la salle des Sœurs de l’Alliance à
                    Lons-le-Saunier sous la direction de Monique Gros, dix
                    choristes sont présents."
              />
              <ChoreDescription
                index={2}
                headerTitle="Notre Baptême"
                thumbnailUrl1="/Bapteme1.jpg"
                width1={350}
                height1={250}
                thumbnailUrl2="/Bapteme2.jpg"
                width2={350}
                height2={250}
                description="Première prestation à Montciel, Lons-le-Saunier le 13 février 2011."
              />
              <ChoreDescription
                index={3}
                headerTitle="Notre Confirmation"
                thumbnailUrl1="https://res.cloudinary.com/dp7dvsuvo/image/upload/v1719914108/lcdbp/pressReviews/images/sktwi22l4ly48gawgundefined_yaa1mb.jpg"
                width1={350}
                height1={250}
                thumbnailUrl2="https://res.cloudinary.com/dp7dvsuvo/image/upload/v1719914107/lcdbp/pressReviews/images/sktwi22l4ly48gac7undefined_wegtmh.jpg"
                width2={350}
                height2={350}
                description="Premier concert public et présentation officielle, le 3 juin 2011 en l’église de Gizia, petit village au fond d’une reculée, avec 19 choristes devant 250 personnes."
              />
            </Tab.Pane>

            <Tab.Pane eventKey="fifth" className={styles.tabSection}>
              <h3>Notre Avenir</h3>
              <div className={styles.futureHeader1}>
                <Image
                  src="/Future1.jpg"
                  alt="Image d'une horloge"
                  width={450}
                  height={450}
                  className={styles.futureImage}
                />
                <div className={styles.futureText}>
                  <p className={styles.directionText}>
                    Ouvrir notre chœur aux actifs, en adaptant nos horaires de
                    répétition, c’est une opportunité qui s’offre à nous pour
                    accueillir, recevoir, offrir notre enthousiasme, notre
                    solidarité, notre humilité, la force d’être ensemble pour
                    transmettre la beauté des chants, contemporains, sacrés,
                    traditionnels de notre culture jurassienne, c’est cela notre
                    avenir.
                  </p>
                  <p className={styles.directionText}>
                    <b>
                      Cet objectif est à l’étude : Si vous êtes intéressé par ce
                      projet, dites-le nous dans le menu « Nous Contacter » !
                    </b>
                  </p>
                </div>
              </div>

              <div className={styles.futureHeader2}>
                <div className={styles.futureText}>
                  <p className={styles.directionText}>
                    <b>
                      Notre Avenir : Consacrer un déplacement par an sur
                      deux-trois jours, avec nos conjointes en alliant concert
                      et tourisme.
                    </b>
                  </p>
                  <p className={styles.directionText}>
                    Nous sommes demandés en Haute-Garonne, en Normandie, en
                    Savoie, en Alsace, dans le Nord, en Provence…, alors
                    profitons de ces invitations pour passer un peu de temps
                    ensemble, faire connaitre notre commune, canton, département
                    du Jura, à travers nos chants.
                  </p>
                </div>
                <Image
                  src="/Future2.jpg"
                  alt="Carte de France"
                  width={450}
                  height={450}
                  className={styles.futureImage}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    // </div>
  );
}
