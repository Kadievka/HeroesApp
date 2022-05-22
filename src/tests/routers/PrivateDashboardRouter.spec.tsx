import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../auth/authContext";
import authReducer from "../../auth/authReducer";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../interfaces/auth/AuthReducerStateInterface";
import PrivateDashboardRouter from "../../routers/PrivateDashboardRouter";

describe("PrivateDashboardRouter unit tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render Navbar and children", () => {
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
        <MemoryRouter>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");
    const navBar = screen.queryByTestId("private-navbar-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).toBe(null);
    expect(privateDashboard).not.toBe(null);
    expect(navBar).not.toBe(null);

    wrapper.unmount();
  });
});
