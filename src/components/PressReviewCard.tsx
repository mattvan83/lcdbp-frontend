// import { useDispatch, useSelector } from "react-redux";
// import { addBookmark, removeBookmark } from "../reducers/bookmarks";
// import { addHiddenArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/PressReviewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PressReview } from "@/app/(public)/page";

interface PressReviewCard {
  _id: string;
  title: string;
  journal: string;
  city: string;
  thumbnailUrl: string;
  thumbnailDescription: string;
  pressReviewDate: Date;
  lastPressReview: boolean;
  openZoomedImage: (pressReview: PressReview) => void;
}

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

function PressReviewCard({
  _id,
  title,
  journal,
  city,
  thumbnailUrl,
  thumbnailDescription,
  pressReviewDate,
  lastPressReview,
  openZoomedImage,
}: PressReviewCard) {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user.value);

  //   const handleBookmarkClick = () => {
  //     if (!user.token) {
  //       return;
  //     }

  //     fetch(`${BACKEND_ADDRESS}/users/canBookmark/${user.token}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.result && data.canBookmark) {
  //           if (props.isBookmarked) {
  //             dispatch(removeBookmark(props));
  //           } else {
  //             dispatch(addBookmark(props));
  //           }
  //         }
  //       });
  //   };

  //   const handleEyeSlashClick = () => {
  //     dispatch(addHiddenArticle(props));
  //   };

  // let iconStyle = {};
  // if (props.isBookmarked) {
  //   iconStyle = { color: "#E9BE59" };
  // }

  const pressReview: PressReview = {
    _id,
    title,
    journal,
    city,
    thumbnailUrl,
    thumbnailDescription,
    pressReviewDate,
    lastPressReview,
  };

  const inputDate = new Date(pressReviewDate);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long", // full weekday name
    day: "numeric", // day of the month
    month: "long", // full month name
    year: "numeric",
  };

  const formattedDate = inputDate.toLocaleString("fr-FR", options);

  let srcPress = null;
  let altSrcPress = null;

  switch (journal.toLowerCase()) {
    case "la voix du jura":
      srcPress = "/press/VoixDuJura.png";
      altSrcPress = "Logo de la Voix du Jura";
      break;
    case "l'indépendant":
      srcPress = "/press/Independant.jpg";
      altSrcPress = "Logo de l'Indépendant";
      break;
    case "la voix de l'ain":
      srcPress = "/press/VoixAin.png";
      altSrcPress = "Logo de la Voix de l'Ain";
      break;
    case "le journal de saône et loire":
      srcPress = "/press/JSL.png";
      altSrcPress = "Logo du Journal de Saône et Loire";
      break;
    case "bulletin municipal":
      srcPress = "/press/Cousance.png";
      altSrcPress = "Logo de la municipalité de Cousance";
      break;
    case "le progrès":
      srcPress = "/press/Progres.png";
      altSrcPress = "Logo du Progrès";
      break;
    default:
      console.log(`${journal} not found`);
  }

  return (
    <div className={styles.pressReviewCard}>
      <div className={styles.pressReviewLogoContainer}>
        {srcPress && altSrcPress ? (
          <Image src={srcPress} alt={altSrcPress} width={75} height={25} />
        ) : (
          <span className={styles.pressReviewText}>{journal}</span>
        )}

        {/* <FontAwesomeIcon
          //   onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          //   style={iconStyle}
          className={styles.bookmarkIcon}
        /> */}
      </div>
      <span
        className={styles.pressReviewTitle}
        onClick={() => openZoomedImage(pressReview)}
      >
        {title}
      </span>
      <div className={styles.pressReviewDateCityContainer}>
        <span className={styles.pressReviewText}>{formattedDate}</span>
        <span className={styles.pressReviewText}>{city}</span>
      </div>
    </div>
  );
}

export default PressReviewCard;
