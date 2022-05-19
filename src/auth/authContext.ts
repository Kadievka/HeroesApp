import { createContext } from "react";
import AuthReducerStateInterface from "../interfaces/auth/AuthReducerStateInterface";

const AuthContext = createContext({} as AuthReducerStateInterface);

export default AuthContext;
