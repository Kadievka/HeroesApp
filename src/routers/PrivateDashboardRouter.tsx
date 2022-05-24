import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DcScreen from "../components/dc/DcScreen";
import HeroScreen from "../components/hero/HeroScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import AboutScreen from "../components/public/AboutScreen";
import BlogScreen from "../components/public/BlogScreen";
import SearchScreen from "../components/search/SearchScreen";
import ErrorScreen from "../components/ui/ErrorScreen";
import Navbar from "../components/ui/Navbar";

const PrivateDashboardRouter = () => {
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;

  localStorage.setItem("lastPath", lastPath);

  return (
    <>
      <Navbar />

      <div className="container" data-testid="private-dashboard-container">
        <Routes>
          <Route path="/" element={<MarvelScreen />} />
          <Route path="marvel" element={<MarvelScreen />} />
          <Route path="/login" element={<MarvelScreen />} />

          <Route path="/about" element={<AboutScreen />} />
          <Route path="/blog" element={<BlogScreen />} />

          <Route path="dc" element={<DcScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/*" element={<ErrorScreen />} />
        </Routes>
      </div>
    </>
  );
};

export default PrivateDashboardRouter;
