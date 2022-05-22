import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import AboutScreen from "../components/public/AboutScreen";
import BlogScreen from "../components/public/BlogScreen";
import PublicNavbar from "../components/public/PublicNavbar";
import ErrorScreen from "../components/ui/ErrorScreen";

const PublicDashboardRouter = () => {
  return (
    <>
      <PublicNavbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/blog" element={<BlogScreen />} />
          <Route path="/*" element={<ErrorScreen />} />
        </Routes>
      </div>
    </>
  );
};

export default PublicDashboardRouter;
