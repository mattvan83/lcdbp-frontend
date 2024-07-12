"use client";
import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../styles/ListeningsContainer.module.css";
import { updateActiveKey } from "@/lib/features/UserState/UserSlice";
import { useAppDispatch } from "@/lib/hooks";
import ButtonLink from "./ButtonLink";

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
          <h3>Nos Derniers Chants</h3>
        ) : (
          <h3>Nos Chants</h3>
        )}
        <div className={styles.listenContent}>{audioPlayers}</div>
        {currentPage !== "Listenings" && (
          <ButtonLink
            href="/listenings"
            eKey="listen"
            buttonTitle="Ecouter plus de chants"
          />
        )}
      </div>
    </div>
  );
};

export default ListeningsContainer;
