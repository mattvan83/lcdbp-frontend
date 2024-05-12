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
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.infosFooter}>
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={75}
            height={75}
            className={styles.imageInfosFooter}
          />
          <div className={styles.explorerMenu}>
            <span>
              <b>EXPLORER</b>
            </span>
            <span>Accueil</span>
            <span>Le Chœur</span>
            <span>Évènements</span>
            <span>Nous Écouter</span>
            <span>Revue de Presse</span>
            <span>Nous contacter</span>
          </div>
          <div className={styles.contactMenu}>
            <span>
              <b>CONTACTS</b>
            </span>
            <span>
              <b>Adresse : </b>Salle des Frères, 8 rue de Bresse, 39190
              Cousances
            </span>
            <span>
              <b>Émail : </b>lechoeurdubonpays@outlook.fr
            </span>
            <span>
              <b>Tél : </b>06 08 64 61 78
            </span>
          </div>
        </div>

        <div className={styles.logosFooter}>
          <Image
            src="/footer/200505_174217.png"
            alt="Logo Cousance"
            width={100}
            height={100}
            className={styles.logoFooter}
          />
          <Image
            src="/footer/logo-PORTE-DU-JURA-couleur-officiel.png"
            alt="Logo Portes du Jura"
            width={100}
            height={100}
            className={styles.logoFooter}
          />
          <Image
            src="/footer/Conseil_departemental_du_Jura_logo.png"
            alt="Logo du Conseil département du Jura"
            width={100}
            height={100}
            className={styles.logoFooter}
          />
          <Image
            src="/footer/CA Franche-Comte.png"
            alt="Logo Crédit Agricole Franche-Comté"
            width={100}
            height={100}
            className={styles.logoFooter}
          />
          <Image
            src="/footer/LOGO DEBRAND.jpg"
            alt="Logo Debrand"
            width={100}
            height={100}
            className={styles.logoFooter}
          />
        </div>
      </footer>
    </>
  );
}
