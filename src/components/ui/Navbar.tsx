import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerActionInterface from "../../interfaces/auth/AuthReducerActionInterface";
import { AuthActionEnum } from "../../enum/auth/AuthActionEnum";

const Navbar = () => {
  const { user, dispatch }: AuthContextInterface = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    const action: AuthReducerActionInterface = {
      type: AuthActionEnum.LOGOUT,
      payload: {
        name: "",
        logged: false,
      },
    };

    dispatch(action);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" data-testid="private-navbar-container">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/marvel">
            Marvel
          </NavLink>

          <NavLink className="nav-item nav-link" to="/dc">
            DC
          </NavLink>

          <NavLink className="nav-item nav-link" to="/search">
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-info" data-testid="private-navbar-user-name">
            {user.name}
          </span>

          <button className="nav-item nav-link btn" data-testid="private-navbar-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
