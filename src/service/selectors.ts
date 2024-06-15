import { createSelector } from "reselect";
import { RootState } from "./store";
import { Subject } from "./types";

export const getLoginError = (state: RootState) => state.auth.error;

export const getAuthStatus = (state: RootState) => state.auth.isAuthenticated;

export const getUserInfo = (state: RootState) => state.auth.userInfo;

export const getExtraUsersInfo = (state: RootState) => state.auth.extraUserInfo;

export const getIsMenuOpen = (state: RootState) => state.headerMenu.isMenuOpen;

export const getUserMessagesCount = (state: RootState) =>
  state.auth.userInfo?.messages;

export const getCurrentLang = (state: RootState) => state.lang.currentLang;

export const getUserSchedule = (state: RootState) => state.auth.scheduleInfo;

export const getSubjectCount = createSelector(
  [getUserSchedule],
  (scheduleInfo: Subject[]) => {
    const subjectCount: { [subjectName: string]: number } = {};

    scheduleInfo.forEach((subject) => {
      if (subjectCount[subject.subjectName]) {
        subjectCount[subject.subjectName]++;
      } else {
        subjectCount[subject.subjectName] = 1;
      }
    });

    return subjectCount;
  }
);

export const getNearestEvent = (state: RootState): Subject | undefined => {
  const scheduleInfo: Subject[] = state.auth.scheduleInfo;
  const now = new Date().getTime();

  const upcomingLessons = scheduleInfo
    .filter((lesson) => new Date(lesson.startTime).getTime() > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  return upcomingLessons.length > 0 ? upcomingLessons[0] : undefined;
};

export const getUniqueSubjects = createSelector(
  [getUserSchedule],
  (scheduleInfo: Subject[]): string[] => {
    const uniqueSubjects: string[] = [];

    scheduleInfo.forEach((subject) => {
      if (!uniqueSubjects.includes(subject.subjectName)) {
        uniqueSubjects.push(subject.subjectName);
      }
    });

    return uniqueSubjects;
  }
);

export const getSelectedSubject = (state: RootState) =>
  state.auth.selectedSubjects;
