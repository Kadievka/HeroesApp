import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/authContext";
import AuthContextInterface from "../interfaces/auth/AuthContextInterface";
import PrivateRoutePropsInterface from "../interfaces/routers/PrivateRoutePropsInterface";

const PrivateRoute = ({ children }: PrivateRoutePropsInterface) => {
  const { user }: AuthContextInterface = useContext(AuthContext);

  return user.logged ? children : <Navigate to="login" />;
};

export default PrivateRoute;
