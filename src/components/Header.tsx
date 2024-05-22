"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserGroup,
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
import { ConfigProvider, Modal } from "antd";
import AuthForm from "./AuthForm";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [activeKey, setActiveKey] = useState("");
  const [hoveredKey, setHoveredKey] = useState("");
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(false);

  // console.log("activeKey: ", activeKey);
  // console.log("hoveredKey: ", hoveredKey);
  // console.log("userToken: ", userToken);
  // console.log("username: ", username);

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
    setUserToken("");
    setUsername("");
    // dispatch(logout());
    // dispatch(removeAllBookmark());
  };

  const fillCnxInfos = (apiToken, apiUsername) => {
    setUserToken(apiToken);
    setUsername(apiUsername);
  };

  const handleCnxMode = () => {
    setIsSignInMode(!isSignInMode);
  };

  const handleCancelModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsSignInMode(false);
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let userSection;
  if (userToken) {
    userSection = (
      <div className={styles.logoutSection}>
        <p className={styles.userTitle}>Bienvenue {username}</p>
        <Button
          variant="primary"
          onClick={() => handleLogout()}
          style={{ fontSize: "14px" }}
        >
          Déconnexion
        </Button>
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

  let modalContent;
  if (!userToken) {
    if (!isSignInMode) {
      modalContent = (
        <div className={styles.modalSection}>
          <p className={styles.modalTitle}>Création de compte</p>
          <AuthForm
            showModal={showModal}
            isSignInMode={isSignInMode}
            handleCnxMode={handleCnxMode}
            fillCnxInfos={fillCnxInfos}
          />
        </div>
      );
    } else {
      modalContent = (
        <div className={styles.modalSection}>
          <p className={styles.modalTitle}>Connexion</p>
          <AuthForm
            showModal={showModal}
            isSignInMode={isSignInMode}
            handleCnxMode={handleCnxMode}
            fillCnxInfos={fillCnxInfos}
          />
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
            {/* <Navbar.Brand href="#home" className={styles.navbarBrand}>
              LCDBP
            </Navbar.Brand> */}
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
                  href="/#contactUs"
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

                {userToken && (
                  <Nav.Link
                    as={Link}
                    href="#link"
                    className={styles.navbarLink}
                    eventKey="membersSpace"
                    style={getNavbarTitleStyle(["membersSpace"])}
                    onMouseEnter={() => setHoveredKey("membersSpace")}
                    onMouseLeave={() => setHoveredKey("")}
                  >
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      color={
                        ["membersSpace"].includes(activeKey) ||
                        ["membersSpace"].includes(hoveredKey)
                          ? "purple"
                          : "#4b5c6b"
                      }
                      className={styles.navbarIcon}
                    />
                    Espace membres
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <ConfigProvider
          theme={{
            components: {
              Modal: {
                contentBg: "#eee0e0",
              },
            },
          }}
        >
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
        </ConfigProvider>
      </header>
    </>
  );
}
