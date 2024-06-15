import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./styles.scss";
import { useAppSelector } from "../../service/store";
import { getSelectedSubject, getUserSchedule } from "../../service/selectors";
import { EventContentArg, EventClickArg } from "@fullcalendar/core";
import { ReactComponent as PayStatus } from "../../images/pay-status.svg";
import { useMemo } from "react";

interface CalendarProps {
  isEditing: boolean;
}

export default function Calendar({ isEditing }: CalendarProps) {
  const scheduleInfo = useAppSelector(getUserSchedule);
  const selectedSubject = useAppSelector(getSelectedSubject);

  const events = useMemo(() => {
    return selectedSubject
      ? scheduleInfo
          .filter((event) => event.subjectName === selectedSubject)
          .map((event) => ({
            title: event.subjectName,
            start: event.startTime,
            end: event.endTime,
            extendedProps: {
              status: event.status,
              paid: event.paid,
            },
          }))
      : scheduleInfo.map((event) => ({
          title: event.subjectName,
          start: event.startTime,
          end: event.endTime,
          extendedProps: {
            status: event.status,
            paid: event.paid,
          },
        }));
  }, [scheduleInfo, selectedSubject]);

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { start, end, title, extendedProps } = eventInfo.event;
    const startTime = new Date(start as Date).toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = end
      ? new Date(end as Date).toLocaleTimeString("ru", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    const status = extendedProps.status;
    const isPaid = !extendedProps.paid;

    let backgroundColor;
    let textDecoration;
    switch (status) {
      case "attend":
        backgroundColor = "#D7F0D6";
        break;
      case "rejected":
        backgroundColor = "#FFFFFF";
        textDecoration = "line-through";
        break;
      case "pending":
        backgroundColor = "#F5F5F5";
        break;
      default:
        backgroundColor = "#FFFFFF";
    }

    return (
      <div
        style={{
          backgroundColor,
          textDecoration,
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <div className="event-time">
          {startTime} - {endTime}
          {isPaid && (
            <span className="event-pay-status">
              <PayStatus />{" "}
            </span>
          )}
        </div>
        <div className="event-title">{title}</div>
      </div>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (isEditing) {
      const updatedTitle = prompt("Изменить название события:", clickInfo.event.title);
      if (updatedTitle !== null) {
        clickInfo.event.setProp("title", updatedTitle);
        // Дополнительно можно реализовать сохранение изменений в вашем хранилище данных
      }
    }
  };

  return (
    <section className="calendar_section">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ru"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next today",
        }}
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
        buttonText={{
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День",
          list: "Список",
        }}
        dayMaxEventRows={true}
        handleWindowResize={true}
        eventClick={handleEventClick}
      />
    </section>
  );
}

