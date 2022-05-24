import { cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../../auth/authContext";
import authReducer from "../../../auth/authReducer";
import AuthContextInterface from "../../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../../interfaces/auth/AuthReducerStateInterface";
import PublicDashboardRouter from "../../../routers/PublicDashboardRouter";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("PublicNavbar unit tests", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render the PublicNavbar Component in AboutScreen", () => {
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
        <MemoryRouter initialEntries={["/about"]}>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const aboutScreenContainer = screen.queryByTestId("about-screen-container");
    const publicNavbarContainer = screen.queryByTestId("public-navbar-container");
    const loginScreenContainer = screen.queryByTestId("login-screen-container");
    const button = screen.getByTestId("public-navbar-login-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(aboutScreenContainer).not.toBe(null);
    expect(publicNavbarContainer).not.toBe(null);
    expect(button).not.toBe(null);

    expect(loginScreenContainer).toBe(null);

    expect(mockNavigate).toBeCalledTimes(0);

    wrapper.unmount();
  });

  it("should got to LoginScreen when login button is clicked", () => {
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
        <MemoryRouter initialEntries={["/about"]}>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const aboutScreenContainer = screen.queryByTestId("about-screen-container");
    const publicNavbarContainer = screen.queryByTestId("public-navbar-container");
    const loginScreenContainer = screen.queryByTestId("login-screen-container");
    const button = screen.getByTestId("public-navbar-login-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(aboutScreenContainer).not.toBe(null);
    expect(publicNavbarContainer).not.toBe(null);
    expect(button).not.toBe(null);

    expect(loginScreenContainer).toBe(null);

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    wrapper.unmount();
  });
});
