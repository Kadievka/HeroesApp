import { createContext } from "react";
import AuthContextInterface from "../interfaces/auth/AuthContextInterface";

const AuthContext = createContext({} as AuthContextInterface);

export default AuthContext;
