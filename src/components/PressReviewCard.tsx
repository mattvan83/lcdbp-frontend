// import { useDispatch, useSelector } from "react-redux";
// import { addBookmark, removeBookmark } from "../reducers/bookmarks";
// import { addHiddenArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/PressReviewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

function PressReviewCard(props) {
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

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3 style={{ marginRight: "5px" }}>{props.title}</h3>
        {/* <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        {!props.isHome || (
          <FontAwesomeIcon
            onClick={() => handleEyeSlashClick()}
            icon={faEyeSlash}
            className={styles.eyeSlashIcon}
          />
        )} */}
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={314}
      />
      <p>{props.description}</p>
    </div>
  );
}

export default PressReviewCard;
