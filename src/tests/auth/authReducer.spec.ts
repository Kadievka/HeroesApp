import authReducer from "../../auth/authReducer";
import { AuthActionEnum } from "../../enum/auth/AuthActionEnum";
import AuthReducerActionInterface from "../../interfaces/auth/AuthReducerActionInterface";
import AuthReducerStateInterface from "../../interfaces/auth/AuthReducerStateInterface";

describe("authReducer unit tests", () => {
  it("should return logged true when the action is login", () => {
    const state: AuthReducerStateInterface = {
      name: "",
      logged: false,
    };
    const action: AuthReducerActionInterface = {
      type: AuthActionEnum.LOGIN,
      payload: state,
    };
    const newState = authReducer(state, action);
    expect(newState).toStrictEqual({
      name: "",
      logged: true,
    });
  });

  it("should return logged false when the action is logout", () => {
    const state: AuthReducerStateInterface = {
      name: "",
      logged: true,
    };
    const action: AuthReducerActionInterface = {
      type: AuthActionEnum.LOGOUT,
      payload: state,
    };
    const newState = authReducer(state, action);
    expect(newState).toStrictEqual({
      name: "",
      logged: false,
    });
  });
});
