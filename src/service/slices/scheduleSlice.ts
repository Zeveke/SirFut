import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleEvent {
  id: string;
  subjectName: string;
  startTime: string;
  endTime: string;
  status?: string; // делаем поля необязательными
  paid?: boolean;
}

interface ScheduleState {
  events: ScheduleEvent[];
}

const initialState: ScheduleState = {
  events: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<ScheduleEvent[]>) => {
      state.events = action.payload;
    },
    updateScheduleEvent: (state, action: PayloadAction<ScheduleEvent>) => {
      const updatedEvent = action.payload;
      const index = state.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        // Обновляем только поля, которые пришли в action.payload
        state.events[index] = {
          ...state.events[index],
          subjectName: updatedEvent.subjectName,
          startTime: updatedEvent.startTime,
          endTime: updatedEvent.endTime,
          status: updatedEvent.status,
          paid: updatedEvent.paid,
        };
      }
    },
  },
});

export const { setSchedule, updateScheduleEvent } = scheduleSlice.actions;
export default scheduleSlice.reducer;
