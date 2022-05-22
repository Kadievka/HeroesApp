import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../auth/authContext";
import authReducer from "../../auth/authReducer";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../interfaces/auth/AuthReducerStateInterface";
import PrivateDashboardRouter from "../../routers/PrivateDashboardRouter";
import PublicDashboardRouter from "../../routers/PublicDashboardRouter";

describe("PublicDashboardRouter unit tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render PublicNavbar and children", () => {
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
        <MemoryRouter>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");
    const navBar = screen.queryByTestId("private-navbar-container");
    const publicNavbar = screen.queryByTestId("public-navbar-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).not.toBe(null);
    expect(privateDashboard).toBe(null);
    expect(navBar).toBe(null);
    expect(publicNavbar).not.toBe(null);

    wrapper.unmount();
  });
});
