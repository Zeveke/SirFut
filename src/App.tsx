import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import MainUserPage from "./pages/user-pages/main-page";
import ProtectedRouteElement from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRouteElement>
              <MainUserPage />
            </ProtectedRouteElement>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
