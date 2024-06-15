import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "../../../service/store";
import { getNearestEvent } from "../../../service/selectors";
import { setupInterval } from "../../../utils/helper-functions";

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
}

export default function Countdown() {
  const nearestEvent = useAppSelector(getNearestEvent);
  const [countdown, setCountdown] = useState<CountdownProps>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (!nearestEvent) return;

    const countDownDate = new Date(nearestEvent.startTime).getTime();

    const intervalId = setupInterval(countDownDate, setCountdown);

    return () => clearInterval(intervalId);
  }, [nearestEvent]);

  return (
    <article className={styles.countdown_container}>
      <p className={styles.countdown_title}>
        Следующее занятие <br /> начнется через:
      </p>
      <div className={styles.countdown_timer}>
        <div>
          <span className={styles.countdown_time}>{countdown.days}</span>
          <span className={styles.countdown_time_type}>д</span>
        </div>
        <div>
          <span className={styles.countdown_time}>{countdown.hours}</span>
          <span className={styles.countdown_time_type}>ч</span>
        </div>
        <div>
          <span className={styles.countdown_time}>{countdown.minutes}</span>
          <span className={styles.countdown_time_type}>мин</span>
        </div>
      </div>

      <button type="button" className={styles.countdown_button}>
        Button
      </button>
    </article>
  );
}
