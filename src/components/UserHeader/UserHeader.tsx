import styles from "./styles.module.scss";
import { getUserInfo, getUserMessagesCount } from "../../service/selectors";
import { useAppDispatch, useAppSelector } from "../../service/store";
import { Link } from "react-router-dom";
import chat from "../../images/chat.png";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { openHeaderMenu } from "../../service/slices/menuSlice";

export default function UserHeader() {
  const userInfo = useAppSelector(getUserInfo);
  const messagesCount = useAppSelector(getUserMessagesCount);

  const dispatch = useAppDispatch();

  const handleOpenMenu = () => {
    dispatch(openHeaderMenu());
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_welcome}>
        Добро пожаловать, <span>{userInfo?.userName}</span>!
      </div>

      <div className={styles.header_content}>
        <HeaderMenu />

        <Link to="#" className={styles.messages_link}>
          {" "}
          {/**lets assume we have an inbox page **/}
          <img src={chat} alt="Новые сообщения." className={styles.avatar} />
          {messagesCount ? (
            <span className={styles.messages_count}>{messagesCount}</span>
          ) : null}
        </Link>
        <button
          type="button"
          className={styles.header_avatar_button}
          onClick={handleOpenMenu}
        >
          <img
            src={userInfo?.userPhoto}
            alt="Фотография профиля."
            className={styles.avatar}
          />
        </button>
      </div>
    </header>
  );
}
