import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import AuthContext from "../../auth/authContext";
import authReducer from "../../auth/authReducer";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../interfaces/auth/AuthReducerStateInterface";
import AppRouter from "../../routers/AppRouter";

describe("AppRouter unit tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render PublicDashboardRouter when there is not user", () => {
    const defaultUser: AuthReducerStateInterface = {
      name: "",
      logged: false,
    };

    const useReducerHook = renderHook(() => useReducer(authReducer, defaultUser));

    const [user, dispatch] = useReducerHook.result.current;

    const wrapper = render(
      <AuthContext.Provider
        value={
          {
            user,
            dispatch,
          } as AuthContextInterface
        }
      >
        <AppRouter />
      </AuthContext.Provider>,
    );

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).not.toBe(null);
    expect(privateDashboard).toBe(null);

    wrapper.unmount();
  });

  it("should render PrivateDashboardRouter when there is a logged user", () => {
    const defaultUser: AuthReducerStateInterface = {
      name: "mock-name",
      logged: true,
    };

    const useReducerHook = renderHook(() => useReducer(authReducer, defaultUser));

    const [user, dispatch] = useReducerHook.result.current;

    const wrapper = render(
      <AuthContext.Provider
        value={
          {
            user,
            dispatch,
          } as AuthContextInterface
        }
      >
        <AppRouter />
      </AuthContext.Provider>,
    );

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).toBe(null);
    expect(privateDashboard).not.toBe(null);

    wrapper.unmount();
  });
});
