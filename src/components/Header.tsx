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
import React, { useState, CSSProperties, ReactNode } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import {
  HouseFill,
  EnvelopeFill,
  GearFill,
  PersonFill,
} from "react-bootstrap-icons";
import { ConfigProvider, Modal } from "antd";
import AuthForm from "./AuthForm";
// Importing action creators from the UserSlice.
import {
  login,
  logout,
  updateActiveKey,
} from "@/lib/features/UserState/UserSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [hoveredKey, setHoveredKey] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSignInMode, setIsSignInMode] = useState<boolean>(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // console.log("hoveredKey: ", hoveredKey);

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  // console.log("user: ", user);

  const handleSelect = (eventKey: string | null): void => {
    if (eventKey) {
      dispatch(updateActiveKey(eventKey));
    }
  };

  const getNavbarTitleStyle = (keys: string[]): CSSProperties => ({
    color:
      keys.includes(user.activeKey) || keys.includes(hoveredKey)
        ? "purple"
        : "#4b5c6b", // Change colors as needed
    fontWeight:
      keys.includes(user.activeKey) || keys.includes(hoveredKey)
        ? "bold"
        : "500",
  });

  const handleLogout = (): void => {
    console.log("Logout done!");
    dispatch(logout());
  };

  const fillCnxInfos = (apiToken: string, apiUsername: string): void => {
    dispatch(login({ token: apiToken, username: apiUsername }));
  };

  const handleCnxMode = (): void => {
    setIsSignInMode(!isSignInMode);
  };

  const handleCancelModal = (): void => {
    setIsModalVisible(!isModalVisible);
    setIsSignInMode(false);
  };

  const showModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  let userSection: ReactNode;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p className={styles.userTitle}>Bienvenue {user.username}</p>
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

  let modalContent: ReactNode;
  if (!user.token) {
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
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-lg`}
              onClick={() => setShowOffcanvas(true)}
            />
            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              className={styles.navbarOffcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Le Chœur Du Bon Pays
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className={`ms-auto ${styles.navbarNav}`}
                  onSelect={handleSelect}
                >
                  {/* <NavDropdown
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
                            user.activeKey
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
                </NavDropdown> */}

                  <Nav.Link
                    as={Link}
                    href="/"
                    className={styles.navbarLink}
                    eventKey="home"
                    style={getNavbarTitleStyle(["home"])}
                    onMouseEnter={() => setHoveredKey("home")}
                    onMouseLeave={() => setHoveredKey("")}
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faHome}
                      color={
                        ["home"].includes(user.activeKey) ||
                        ["home"].includes(hoveredKey)
                          ? "purple"
                          : "#4b5c6b"
                      }
                      className={styles.navbarIcon}
                    />
                    Accueil
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    href="/#chore"
                    className={styles.navbarLink}
                    eventKey="chore"
                    style={getNavbarTitleStyle(["chore"])}
                    onMouseEnter={() => setHoveredKey("chore")}
                    onMouseLeave={() => setHoveredKey("")}
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      color={
                        ["chore"].includes(user.activeKey) ||
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
                    href="/#events"
                    className={styles.navbarLink}
                    eventKey="events"
                    style={getNavbarTitleStyle(["events"])}
                    onMouseEnter={() => setHoveredKey("events")}
                    onMouseLeave={() => setHoveredKey("")}
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      color={
                        ["events"].includes(user.activeKey) ||
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
                    href="/listenings"
                    className={styles.navbarLink}
                    eventKey="listen"
                    style={getNavbarTitleStyle(["listen"])}
                    onMouseEnter={() => setHoveredKey("listen")}
                    onMouseLeave={() => setHoveredKey("")}
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlay}
                      color={
                        ["listen"].includes(user.activeKey) ||
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
                    href="/pressReviews"
                    className={styles.navbarLink}
                    eventKey="pressReview"
                    style={getNavbarTitleStyle(["pressReview"])}
                    onMouseEnter={() => setHoveredKey("pressReview")}
                    onMouseLeave={() => setHoveredKey("")}
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      color={
                        ["pressReview"].includes(user.activeKey) ||
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
                    onClick={() => setShowOffcanvas(false)}
                  >
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      color={
                        ["contactUS"].includes(user.activeKey) ||
                        ["contactUS"].includes(hoveredKey)
                          ? "purple"
                          : "#4b5c6b"
                      }
                      className={styles.navbarIcon}
                    />
                    Nous contacter
                  </Nav.Link>

                  {user.token && (
                    <Nav.Link
                      as={Link}
                      href="#link"
                      className={styles.navbarLink}
                      eventKey="membersSpace"
                      style={getNavbarTitleStyle(["membersSpace"])}
                      onMouseEnter={() => setHoveredKey("membersSpace")}
                      onMouseLeave={() => setHoveredKey("")}
                      onClick={() => setShowOffcanvas(false)}
                    >
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        color={
                          ["membersSpace"].includes(user.activeKey) ||
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
              </Offcanvas.Body>
            </Navbar.Offcanvas>
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
