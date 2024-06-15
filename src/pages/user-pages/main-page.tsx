import UserHeader from "../../components/UserHeader/UserHeader";
import UserNavigation from "../../components/UserNavigation/UserNavigation";
import "./pages.scss";
import { useLocation } from "react-router-dom";
import SchedulePage from "./schedule/schedule-page";
import UserPage from "./user-account/user-page";

export default function MainUserPage() {
  const location = useLocation();

  return (
    <section className="user-page">
      <UserHeader />
      <UserNavigation />
      <main className="main-content">
        {location.pathname === "/user" && <UserPage />}
        {location.pathname === "/user/schedule" && <SchedulePage />}
      </main>
    </section>
  );
}
