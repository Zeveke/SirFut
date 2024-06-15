import React, { useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import {
  getSelectedSubject,
  getUniqueSubjects,
} from "../../../service/selectors";
import { useAppSelector, useAppDispatch } from "../../../service/store";
import styles from "./styles.module.scss";
import { setSelectedSubject } from "../../../service/slices/authSlice";

export default function SchedulePage() {
  const uniqueSubjects = useAppSelector(getUniqueSubjects);
  const dispatch = useAppDispatch();
  const selectedSubject = useAppSelector(getSelectedSubject);

  const [isEditing, setIsEditing] = useState(false);

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSubject(event.target.value));
  };

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <>
      <div className={styles.schedule_page}>
        <label htmlFor="subjects-select" className={styles.select_label}>
          <select
            name="subjects"
            id="subjects-select"
            className={styles.select_dropdown}
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            <option value="">Выбрать предмет</option>
            {uniqueSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={styles.change_schedule}
          onClick={toggleEditing}
        >
          {isEditing ? "Закончить изменение расписания" : "Изменить расписание"}
        </button>
      </div>
      <Calendar isEditing={isEditing} />
    </>
  );
}

