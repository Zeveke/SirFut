import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

export default function GitOffer() {
  return (
    <div className={styles.gift_wrapper}>
      <p className={styles.gift_title}>Учитесь бесплатно</p>
      <p className={styles.gift_description}>
        Приводите друзей с детьми заниматься в Sirius Future и получайте
        подарки!
      </p>
      <NavLink to="#">Узнать</NavLink>
    </div>
  );
}
