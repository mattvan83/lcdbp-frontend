"use client";

import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../styles/ButtonLink.module.css";
import { updateActiveKey } from "@/lib/features/UserState/UserSlice";
import { useAppDispatch } from "@/lib/hooks";

export interface ButtonLink {
  href: string;
  eKey: string;
  buttonTitle: string;
}

export default function ButtonLink({ href, eKey, buttonTitle }: ButtonLink) {
  const dispatch = useAppDispatch();

  const handleSelect = (eventKey: string | null): void => {
    if (eventKey) {
      dispatch(updateActiveKey(eventKey));
    }
  };

  return (
    <Link href={href} onClick={() => handleSelect(eKey)}>
      <Button variant="primary" className={styles.buttonLink}>
        {buttonTitle}
      </Button>
    </Link>
  );
}
