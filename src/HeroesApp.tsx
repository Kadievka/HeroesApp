import React, { useEffect, useReducer } from "react";
import AuthContext from "./auth/authContext";
import authReducer from "./auth/authReducer";
import AuthContextInterface from "./interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "./interfaces/auth/AuthReducerStateInterface";
import AppRouter from "./routers/AppRouter";

const HeroesApp = () => {
  const defaultUser: AuthReducerStateInterface = {
    name: "",
    logged: false,
  };

  const init = () => {
    const stringUser = localStorage.getItem("user");

    return stringUser ? JSON.parse(stringUser) : defaultUser;
  };

  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={
        {
          user,
          dispatch,
        } as AuthContextInterface
      }
    >
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default HeroesApp;
