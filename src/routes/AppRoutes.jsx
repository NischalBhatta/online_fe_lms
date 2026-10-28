import React from "react";
import {
  HomePage,
  DashboardPage,
  ForgetPassword,
  SignInPage,
  SignUpPage,
  BookLanding,
  Books,
  ReviewPage,
  UserPage,
  UserProfile,
  EditBookPage,
  NewBookPage,
  BorrowPage,
  VerifyUser,
} from "../pages";

import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "@components/layout/DefaultLayout";
import { UserLayout } from "@components/layout/UserLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="activate-user" element={<VerifyUser />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        {/* private pages */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="books" element={<Books />} />
          <Route path="new-book" element={<NewBookPage />} />
          <Route path="edit-book" element={<EditBookPage />} />
          <Route path="book-landing" element={<BookLanding />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="all" element={<UserPage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="borrow-history" element={<BorrowPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
