export type SubjectStatus = "attend" | "rejected" | "pending" | null;
export type Languages = "RU" | "EN" | null;

export interface Subject {
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SubjectStatus;
  paid: boolean;
  teacher: string;
}

export interface loginPaylpad {
  userInfo: UserInfo | null;
  extraUserInfo: UserInfo[];
  scheduleInfo: Subject[];
}

export interface UserInfo {
  userPhoto: string | undefined;
  userName: string | null;
  id: string | null;
  messages: number | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  userInfo: UserInfo | null;
  scheduleInfo: Subject[];
  extraUserInfo: UserInfo[];
  selectedSubjects: string | undefined;
}

export interface ITestUserAuth {
  email: string;
  password: string;
}

export interface IHeaderMenu {
  isMenuOpen: boolean;
}

export interface ILang {
  currentLang: Languages;
}
