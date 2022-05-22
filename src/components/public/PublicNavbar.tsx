import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/blog">
            Blog
          </NavLink>

          <NavLink className="nav-item nav-link" to="/about">
            About
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <button className="nav-item nav-link btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </ul>
      </div>
    </nav>
  );
};
export default PublicNavbar;
