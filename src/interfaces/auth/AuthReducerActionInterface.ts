import { AuthActionEnum } from "../../enum/auth/AuthActionEnum";
import AuthReducerStateInterface from "./AuthReducerStateInterface";

export default interface AuthReducerActionInterface {
  type: AuthActionEnum;
  payload: AuthReducerStateInterface;
}
