import React from "react";
import { Routes, Route } from "react-router-dom";
import DcScreen from "../components/dc/DcScreen";
import HeroScreen from "../components/hero/HeroScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import SearchScreen from "../components/search/SearchScreen";
import ErrorScreen from "../components/ui/ErrorScreen";
import Navbar from "../components/ui/Navbar";

const PrivateDashboardRouter = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<MarvelScreen />} />
          <Route path="marvel" element={<MarvelScreen />} />
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
