import AuthReducerStateInterface from "./AuthReducerStateInterface";

export default interface AuthContextInterface {
  user: AuthReducerStateInterface;
  dispatch: Function;
}
