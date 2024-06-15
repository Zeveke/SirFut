import {
  getExtraUsersInfo,
  getIsMenuOpen,
  getUserInfo,
} from "../../service/selectors";
import { closeHeaderMenu } from "../../service/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../service/store";
import styles from "./styles.module.scss";
import exit from "../../images/exit.svg";
import { logout, toggleUser } from "../../service/slices/authSlice";
import {
  extraUserInfo,
  scheduleInfo,
  scheduleInfoExtra,
  testUserInfo,
} from "../../utils/mock-data";
import { useState } from "react";

export default function HeaderMenu() {
  const currentUser = useAppSelector(getUserInfo);
  const extraUsers = useAppSelector(getExtraUsersInfo);
  const isMenuOpen = useAppSelector(getIsMenuOpen);
  const dispatch = useAppDispatch();

  const handleCloseMenu = () => {
    dispatch(closeHeaderMenu());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeHeaderMenu());
  };

  //this check is necessary because mock data stays the same
  const [activeUserType, setActiveUserType] = useState<"main" | "extra">(
    "main"
  );

  const handleToggleUser = () => {
    if (activeUserType === "main") {
      dispatch(
        toggleUser({
          userInfo: extraUserInfo,
          extraUserInfo: [testUserInfo],
          scheduleInfo: scheduleInfoExtra,
        })
      );
      setActiveUserType("extra");
    } else {
      dispatch(
        toggleUser({
          userInfo: testUserInfo,
          extraUserInfo: [extraUserInfo],
          scheduleInfo: scheduleInfo,
        })
      );
      setActiveUserType("main");
    }
    handleCloseMenu(); // Close the menu after toggling the user
  };

  return (
    <article>
      {isMenuOpen ? (
        <div className={styles.menu}>
          <button
            type="button"
            className={styles.close_button}
            onClick={handleCloseMenu}
          ></button>
          <p className={styles.menu_toggle_title}>Смена пользователя</p>

          <div>
            <div className={styles.you_item}>
              <img
                src={currentUser?.userPhoto}
                alt="Ваше фото."
                className={styles.user_photo}
              />
              <div>
                <p className={styles.user_name}> {currentUser?.userName}</p>
                <p>Это вы</p>
              </div>
            </div>
            <ul className={styles.menu_list}>
              {extraUsers.map((user) => (
                <li
                  key={user.id}
                  className={`${styles.you_item} ${styles.extra_item}`}
                  onClick={handleToggleUser}
                >
                  <img
                    src={user.userPhoto}
                    alt="Фото пользователя."
                    className={styles.user_photo}
                  />
                  <p className={styles.user_name}>{user.userName}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.logout_button}
            type="button"
            onClick={handleLogout}
          >
            <p className={styles.logout_text}>Выход</p>
            <img src={exit} alt="Выйти из личного кабинета." />
          </button>
        </div>
      ) : null}
    </article>
  );
}
