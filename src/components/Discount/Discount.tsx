import styles from "./styles.module.scss";

export default function Discount() {
  return (
    <article className={styles.discout_container}>
      <p className={styles.discout_title}>
        До 31 декабря любой курс со скидкой 20%
      </p>
      <p className={styles.discout_description}>
        До конца года у вас есть уникальная возможность воспользоваться нашей
        новогодней скидкой 20% на любой курс!
      </p>
    </article>
  );
}
