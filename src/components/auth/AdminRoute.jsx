import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//use inside UserLayout (AuthRoute already ensures the user is logged in)
export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);

  return user?.role === "admin" ? children : <Navigate to="/user" replace />;
};
