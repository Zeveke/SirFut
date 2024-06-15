import { getSubjectCount } from "../../../service/selectors";
import { useAppSelector } from "../../../service/store";
import styles from "./styles.module.scss";

export default function Balance() {
  const list = useAppSelector(getSubjectCount);

  const isEmpty = Object.keys(list).length === 0;

  return (
    <div className={styles.balance_wrapper}>
      <p className={styles.balance_title}>Баланс занятий</p>
      {isEmpty ? (
        <p className={styles.no_balance_message}>Нет данных по предметам</p>
      ) : (
        <ul className={styles.balance_list}>
          {Object.entries(list).map(([title, count], index) => (
            <li
              key={index}
              id={`item-${title}`}
              className={styles.balance_list_item}
            >
              <p>{title}</p>
              <span className={styles.balance_list_count}>
                <p>{count}</p>
              </span>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className={styles.balance_button}>
        Button
      </button>
    </div>
  );
}
