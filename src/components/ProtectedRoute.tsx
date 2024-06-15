import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthStatus } from "../service/selectors";

interface IProtectedRouteElementProps {
  children: React.ReactNode;
}

const ProtectedRouteElement: React.FC<IProtectedRouteElementProps> = ({
  children,
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getAuthStatus);

  if (!isAuthenticated) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
