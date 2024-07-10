// import { useDispatch, useSelector } from "react-redux";
// import { addBookmark, removeBookmark } from "../reducers/bookmarks";
// import { addHiddenArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/EventCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Event } from "@/app/page";

interface EventCard {
  _id: string;
  title: string;
  postalCode: string;
  city: string;
  place: string;
  chores: string[];
  thumbnailUrl: string;
  thumbnailDescription: string;
  eventDate: Date;
  price: string;
  openZoomedImage: (event: Event) => void;
}

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

function EventCard({
  _id,
  title,
  postalCode,
  city,
  place,
  chores,
  thumbnailUrl,
  thumbnailDescription,
  eventDate,
  price,
  openZoomedImage,
}: EventCard) {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user.value);

  //   const handleLike = () => {
  //     fetch(`${BACKEND_ADDRESS}/activities/favorite/${token}/${activityId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // console.log("DATA:", data);
  //         data.result && dispatch(updateFavoriteActivities(data.activity));
  //       })
  //       .catch((error) => {
  //         console.error("Erreur:", error);
  //       });
  //   };

  const event: Event = {
    _id,
    title,
    postalCode,
    city,
    place,
    chores,
    thumbnailUrl,
    thumbnailDescription,
    eventDate,
    price,
  };

  const inputDate = new Date(eventDate);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long", // full weekday name
    day: "numeric", // day of the month
    month: "long", // full month name
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = inputDate
    .toLocaleString("fr-FR", options)
    .replace(":", "h")
    .toUpperCase();

  return (
    <div className={styles.eventCardContainer}>
      <div className={styles.eventCard}>
        <Image
          className={styles.eventImage}
          src={thumbnailUrl}
          alt={thumbnailDescription}
          width={160}
          height={180}
          onClick={() => openZoomedImage(event)}
        />

        <div className={styles.details}>
          <div className={styles.dateFavoriteContainer}>
            <p className={styles.eventDate}>{formattedDate}</p>

            {/* <div
              className={styles.favorite}
              onClick={() => handleLike()}
            >
              {!user.favoriteActivities.find(
                (activity) => activity.id === activityId
              ) ? (
                <Icon
                  className={styles.heartIcon}
                  name="heart-outline"
                  size={20}
                  color="#EB5757"
                />
              ) : (
                <Icon
                  className={styles.heartIcon}
                  name="heart"
                  size={20}
                  color="#EB5757"
                />
              )}
            </div> */}
          </div>

          <p className={styles.eventTitle}>{title}</p>

          <div className={styles.locationContainer}>
            <p className={styles.eventLocation}>{`${postalCode} ${city}`}</p>
            {/* {distanceText} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
