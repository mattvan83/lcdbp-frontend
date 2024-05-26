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
            <Link href="/" className={styles.explorerMenuLink}>
              Accueil
            </Link>
            <Link href="/#chore" className={styles.explorerMenuLink}>
              Le Chœur
            </Link>
            <Link href="/#events" className={styles.explorerMenuLink}>
              Évènements
            </Link>
            <Link href="/#listenings" className={styles.explorerMenuLink}>
              Nous Écouter
            </Link>
            <Link href="/#pressReviews" className={styles.explorerMenuLink}>
              Revue de Presse
            </Link>
            <Link href="/#contactUs" className={styles.explorerMenuLink}>
              Nous contacter
            </Link>
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
          <a href="https://www.mairie-cousance.fr/" target="_blank">
            <Image
              src="/footer/200505_174217.png"
              alt="Logo Cousance"
              width={100}
              height={100}
              className={styles.logoFooter}
            />
          </a>
          <a href="http://www.ccportedujura.fr/" target="_blank">
            <Image
              src="/footer/logo-PORTE-DU-JURA-couleur-officiel.png"
              alt="Logo Portes du Jura"
              width={100}
              height={100}
              className={styles.logoFooter}
            />
          </a>
          <a href="https://www.jura.fr/" target="_blank">
            <Image
              src="/footer/Conseil_departemental_du_Jura_logo.png"
              alt="Logo du Conseil département du Jura"
              width={100}
              height={100}
              className={styles.logoFooter}
            />
          </a>
          <a
            href="https://www.credit-agricole.fr/particulier/agence/franche-comte.html"
            target="_blank"
          >
            <Image
              src="/footer/CA Franche-Comte.png"
              alt="Logo Crédit Agricole Franche-Comté"
              width={100}
              height={100}
              className={styles.logoFooter}
            />
          </a>
          <a
            href="https://www.facebook.com/sarldebrand/?locale=fr_FR"
            target="_blank"
          >
            <Image
              src="/footer/LOGO DEBRAND.jpg"
              alt="Logo Debrand"
              width={100}
              height={100}
              className={styles.logoFooter}
            />
          </a>
        </div>
      </footer>
    </>
  );
}
