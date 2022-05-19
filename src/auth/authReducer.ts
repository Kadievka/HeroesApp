import { AuthActionEnum } from "../enum/auth/AuthActionEnum";
import AuthReducerActionInterface from "../interfaces/auth/AuthReducerActionInterface";
import AuthReducerStateInterface from "../interfaces/auth/AuthReducerStateInterface";

const authReducer = (state: AuthReducerStateInterface, action: AuthReducerActionInterface): AuthReducerStateInterface => {
  switch (action.type) {
    case AuthActionEnum.LOGIN:
      return {
        ...action.payload,
        logged: true,
      };

    case AuthActionEnum.LOGOUT:
      return {
        ...action.payload,
        logged: false,
      };
  }

  return state;
};

export default authReducer;
