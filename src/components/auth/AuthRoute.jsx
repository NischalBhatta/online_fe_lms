import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  //User Real Data
  const isAuth = true;
  return isAuth ? children : <Navigate to="/signin" />;
};
