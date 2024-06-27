"use client";
import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../styles/ListeningsContainer.module.css";
import { updateActiveKey } from "@/lib/features/UserState/UserSlice";
import { useAppDispatch } from "@/lib/hooks";

interface ListeningsContainerProps {
  currentPage: string;
  audioPlayers: React.ReactNode;
}

const ListeningsContainer: React.FC<ListeningsContainerProps> = ({
  currentPage,
  audioPlayers,
}) => {
  const dispatch = useAppDispatch();

  const handleSelect = (eventKey: string | null): void => {
    if (eventKey) {
      dispatch(updateActiveKey(eventKey));
    }
  };

  return (
    <div className={styles.listenDivision}>
      <div className={styles.listenSection}>
        {currentPage !== "Listenings" ? (
          <h3>Nos derniers chants</h3>
        ) : (
          <h3>Nos chants</h3>
        )}
        <div className={styles.listenContent}>{audioPlayers}</div>
        {currentPage !== "Listenings" && (
          <Link href="/listenings" onClick={() => handleSelect("listen")}>
            <Button variant="primary" className={styles.listenButton}>
              Ecouter plus de chants
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListeningsContainer;
