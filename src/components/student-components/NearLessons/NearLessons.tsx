import { getUserSchedule } from "../../../service/selectors";
import { useAppSelector } from "../../../service/store";
import { monthDeclensions } from "../../../utils/constants";
import styles from "./styles.module.scss";
import { ReactComponent as TeacherIcon } from "../../../images/teacher.svg";
import { useMemo } from "react";

export default function NearLessons() {
  const scheduleInfo = useAppSelector(getUserSchedule);

  const upcomingLessons = useMemo(() => {
    return scheduleInfo
      .filter((lesson) => new Date(lesson.startTime) > new Date())
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 3);
  }, [scheduleInfo]);

  if (upcomingLessons.length === 0) {
    return (
      <div className={styles.upcoming_lessons}>
        <p className={styles.upcoming_lessons_title}>Ближайшие уроки</p>
        <p className={styles.no_lessons_message}>Нет предстоящих уроков</p>
      </div>
    );
  }

  return (
    <div className={styles.upcoming_lessons}>
      <p className={styles.upcoming_lessons_title}>Ближайшие уроки</p>
      <ul className={styles.lesson_list}>
        {upcomingLessons.map((lesson, index) => {
          const lessonDate = new Date(lesson.startTime);
          const day = lessonDate.getDate();
          const month = monthDeclensions[lessonDate.getMonth()];

          return (
            <li key={index} className={styles.lesson}>
              <div className={styles.lesson_date}>
                <p>{day}</p>
                <p>{month}</p>
              </div>
              <p className={styles.lesson_title}>{lesson.subjectName}</p>
              <p className={styles.lesson_time}>
                {lessonDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(lesson.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className={styles.lesson_teacher_wrapper}>
                <TeacherIcon />
                <p className={styles.lesson_teacher}>{lesson.teacher}</p>
              </div>

              <div className={styles.lesson_buttons_wrapper}>
                <button type="button" className={styles.lesson_button_active}>
                  Button
                </button>
                <button type="button" className={styles.lesson_button}>
                  Button
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" className={styles.lessons_button}>
        Button
      </button>
    </div>
  );
}
