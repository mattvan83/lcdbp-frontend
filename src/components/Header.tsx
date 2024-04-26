"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
// import { IconContext } from "react-icons";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  HouseFill,
  EnvelopeFill,
  GearFill,
  PersonFill,
} from "react-bootstrap-icons";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerIcons}>
          <Image src="/Logo.jpg" alt="Logo" width={100} height={100} />
          <div className={styles.userSection}>
            <FontAwesomeIcon
              icon={faUser}
              color={"white"}
              className={styles.userIcon}
            />
            <p className={styles.userTitle}>Espace membres</p>
          </div>
        </div>
        <Navbar expand="lg" className={styles.navbarBootstrap}>
          <Container className={styles.navbarContainer}>
            <Navbar.Brand href="#home" className={styles.navbarBrand}>
              LCDBP
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={styles.navbarCollapse}
            >
              <Nav className={`ms-auto ${styles.navbarNav}`}>
                <NavDropdown
                  title="Accueil"
                  id="basic-nav-dropdown"
                  className={styles.navbarDropdown}
                  active={false}
                >
                  <NavDropdown.Item as={Link} href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  active={false}
                >
                  Le Chœur
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  active={false}
                >
                  Évènements
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  active={false}
                >
                  Nous Écouter
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  active={false}
                >
                  Revue de Presse
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  active={false}
                >
                  Nous contacter
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
