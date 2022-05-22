import React, { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import { AuthActionEnum } from "../../enum/auth/AuthActionEnum";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerActionInterface from "../../interfaces/auth/AuthReducerActionInterface";

const LoginScreen = () => {
  const { dispatch }: AuthContextInterface = useContext(AuthContext);

  const navigate: NavigateFunction = useNavigate();

  const lastPath: string = localStorage.getItem("lastPath") || "/";

  const handleLogin = () => {
    const action: AuthReducerActionInterface = {
      type: AuthActionEnum.LOGIN,
      payload: {
        name: "Kadievka Salcedo",
        logged: false,
      },
    };

    dispatch(action);

    navigate(lastPath === "/login" ? "/" : `${lastPath}`);
  };

  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
