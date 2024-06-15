import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { ReactComponent as HomeIcon } from "../../images/nav-icons/home.svg";
import { ReactComponent as CalendarIcon } from "../../images/nav-icons/calendar.svg";
import { ReactComponent as MoneyIcon } from "../../images/nav-icons/money.svg";
import { ReactComponent as CupIcon } from "../../images/nav-icons/cup.svg";
import { ReactComponent as PuzzleIcon } from "../../images/nav-icons/puzzle.svg";
import { ReactComponent as FolderIcon } from "../../images/nav-icons/folder-open.svg";
import { ReactComponent as SupportIcon } from "../../images/nav-icons/support.svg";
import { ReactComponent as SettingsIcon } from "../../images/nav-icons/settings.svg";
import { ReactComponent as QuestionIcon } from "../../images/nav-icons/question.svg";
import fullLogo from "../../images/full_logo.png";
import GitOffer from "../GiftOffer/GiftOffer";

export default function UserNavigation() {
  return (
    <section className={styles.side_section}>
      <img
        className={styles.logo}
        src={fullLogo}
        alt="Логотип Sirius Future."
      />
      <nav className={styles.navigation_wrapper}>
        <ul className={styles.navigation_list}>
          <li className={styles.navigation_item}>
            <NavLink
              end
              to="/user"
              className={({ isActive }) =>
                isActive ? `${styles.active} home-icon` : "home-icon"
              }
            >
              <HomeIcon className={styles.navigation_icon} />
              Главная
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink
              to="/user/schedule"
              className={({ isActive }) =>
                isActive ? `${styles.active} calendar-icon` : "calendar-icon"
              }
            >
              <CalendarIcon className={styles.navigation_icon} />
              Расписание
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <MoneyIcon className={styles.navigation_icon} />
              Оплата
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <CupIcon className={styles.navigation_icon} />
              Достижения
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <PuzzleIcon className={styles.navigation_icon} />
              Тренажеры
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <FolderIcon className={styles.navigation_icon} />
              Библиотека
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <SupportIcon className={styles.navigation_icon} />
              Проверка связи
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <SettingsIcon className={styles.navigation_icon} />
              Настройки
            </NavLink>
          </li>
          <li className={styles.navigation_item}>
            <NavLink to="#">
              <QuestionIcon className={styles.navigation_icon} />
              Вопросы
            </NavLink>
          </li>
        </ul>
      </nav>
      <GitOffer />
    </section>
  );
}
