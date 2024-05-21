"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faXmark,
  faEye,
  faHome,
  faCircleInfo,
  faCalendar,
  faCirclePlay,
  faNewspaper,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
// import { IconContext } from "react-icons";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  HouseFill,
  EnvelopeFill,
  GearFill,
  PersonFill,
} from "react-bootstrap-icons";
import { Modal } from "antd";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [activeKey, setActiveKey] = useState("");
  const [hoveredKey, setHoveredKey] = useState("");
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // console.log("activeKey: ", activeKey);
  // console.log("hoveredKey: ", hoveredKey);

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };

  const getNavbarTitleStyle = (keys) => ({
    color:
      keys.includes(activeKey) || keys.includes(hoveredKey)
        ? "purple"
        : "#4b5c6b", // Change colors as needed
    fontWeight:
      keys.includes(activeKey) || keys.includes(hoveredKey) ? "bold" : "500",
  });

  const handleLogout = () => {
    console.log("Logout done!");
    // dispatch(logout());
    // dispatch(removeAllBookmark());
  };

  const handleCancelModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsSignInMode(false);
  };

  const handleCnxMode = () => {
    setIsSignInMode(!isSignInMode);
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let userSection;
  if (userToken) {
    userSection = (
      <>
        <div className={styles.logoutSection}>
          <p>Welcome {username} / </p>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <p className={styles.userTitle}>Espace membres</p>
      </>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <div className={styles.userSection}>
          <FontAwesomeIcon
            icon={faXmark}
            color={"white"}
            className={styles.userIcon}
            onClick={showModal}
          />
          <p className={styles.userTitle}>Espace membres</p>
        </div>
      );
    } else {
      userSection = (
        <div className={styles.userSection}>
          <FontAwesomeIcon
            icon={faUser}
            color={"white"}
            className={styles.userIcon}
            onClick={showModal}
          />
          <p className={styles.userTitle}>Espace membres</p>
        </div>
      );
    }
  }

  let modalContent;
  if (!userToken) {
    if (!isSignInMode) {
      modalContent = (
        <div className={styles.registerSection}>
          <p>Sign-up</p>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <Button
            variant="primary"
            className={styles.heroButton}
            onClick={handleCnxMode}
          >
            Créer un compte
          </Button>
        </div>
      );
    } else {
      modalContent = (
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button id="connection" onClick={() => handleConnection()}>
            Connect
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerIcons}>
          <Image src="/Logo.jpg" alt="Logo" width={100} height={100} />
          {userSection}
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
              <Nav
                className={`ms-auto ${styles.navbarNav}`}
                onSelect={handleSelect}
              >
                <NavDropdown
                  title={
                    <span
                      style={getNavbarTitleStyle([
                        "home",
                        "home1",
                        "home2",
                        "home3",
                        "home4",
                      ])}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        color={
                          ["home", "home1", "home2", "home3", "home4"].includes(
                            activeKey
                          ) ||
                          ["home", "home1", "home2", "home3", "home4"].includes(
                            hoveredKey
                          )
                            ? "purple"
                            : "#4b5c6b"
                        }
                        className={styles.navbarIcon}
                      />
                      Accueil
                    </span>
                  }
                  id="basic-nav-dropdown"
                  className={styles.navbarDropdown}
                  onMouseEnter={() => setHoveredKey("home")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <NavDropdown.Item
                    as={Link}
                    href="#action/3.1"
                    eventKey="home1"
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    href="#action/3.2"
                    eventKey="home2"
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    href="#action/3.3"
                    eventKey="home3"
                  >
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    href="#action/3.4"
                    eventKey="home4"
                  >
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  eventKey="chore"
                  style={getNavbarTitleStyle(["chore"])}
                  onMouseEnter={() => setHoveredKey("chore")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    color={
                      ["chore"].includes(activeKey) ||
                      ["chore"].includes(hoveredKey)
                        ? "purple"
                        : "#4b5c6b"
                    }
                    className={styles.navbarIcon}
                  />
                  Le Chœur
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  eventKey="events"
                  style={getNavbarTitleStyle(["events"])}
                  onMouseEnter={() => setHoveredKey("events")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    color={
                      ["events"].includes(activeKey) ||
                      ["events"].includes(hoveredKey)
                        ? "purple"
                        : "#4b5c6b"
                    }
                    className={styles.navbarIcon}
                  />
                  Évènements
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  eventKey="listen"
                  style={getNavbarTitleStyle(["listen"])}
                  onMouseEnter={() => setHoveredKey("listen")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <FontAwesomeIcon
                    icon={faCirclePlay}
                    color={
                      ["listen"].includes(activeKey) ||
                      ["listen"].includes(hoveredKey)
                        ? "purple"
                        : "#4b5c6b"
                    }
                    className={styles.navbarIcon}
                  />
                  Nous Écouter
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  eventKey="pressReview"
                  style={getNavbarTitleStyle(["pressReview"])}
                  onMouseEnter={() => setHoveredKey("pressReview")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    color={
                      ["pressReview"].includes(activeKey) ||
                      ["pressReview"].includes(hoveredKey)
                        ? "purple"
                        : "#4b5c6b"
                    }
                    className={styles.navbarIcon}
                  />
                  Revue de Presse
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="#link"
                  className={styles.navbarLink}
                  eventKey="contactUS"
                  style={getNavbarTitleStyle(["contactUS"])}
                  onMouseEnter={() => setHoveredKey("contactUS")}
                  onMouseLeave={() => setHoveredKey("")}
                >
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    color={
                      ["contactUS"].includes(activeKey) ||
                      ["contactUS"].includes(hoveredKey)
                        ? "purple"
                        : "#4b5c6b"
                    }
                    className={styles.navbarIcon}
                  />
                  Nous contacter
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Modal
          className={styles.modal}
          open={isModalVisible}
          onCancel={handleCancelModal}
          footer={null}
          closable
          centered
        >
          {modalContent}
        </Modal>
      </header>
    </>
  );
}
