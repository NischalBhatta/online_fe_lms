import React from "react";
import {
  HomePage,
  DashboardPage,
  ForgetPassword,
  SignInPage,
  SignUpPage,
  BookLanding,
} from "../pages";

import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../components/layout/DefaultLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        {/* private pages */}
        <Route path="/user" element={<DashboardPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
