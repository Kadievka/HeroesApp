import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "../auth/authContext";
import PrivateDashboardRouter from "./PrivateDashboardRouter";
import PublicDashboardRouter from "./PublicDashboardRouter";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={user && user.name ? <PrivateDashboardRouter /> : <PublicDashboardRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
