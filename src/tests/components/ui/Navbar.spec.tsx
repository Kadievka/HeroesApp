import { cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../../auth/authContext";
import authReducer from "../../../auth/authReducer";
import AuthContextInterface from "../../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../../interfaces/auth/AuthReducerStateInterface";
import PrivateDashboardRouter from "../../../routers/PrivateDashboardRouter";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar unit tests", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render the Navbar Component", () => {
    const defaultUser: AuthReducerStateInterface = {
      name: "Pedro",
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
        <MemoryRouter initialEntries={["/"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const marvelTitle = screen.getByTestId("marvel-screen-title");
    const container = screen.queryByTestId("private-navbar-container");
    const button = screen.queryByTestId("private-navbar-logout-button");
    const userName = screen.getByTestId("private-navbar-user-name");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(userName.innerHTML.trim()).toBe("Pedro");
    expect(marvelTitle.innerHTML.trim()).toBe("MarvelScreen");

    expect(container).not.toBe(null);
    expect(button).not.toBe(null);

    expect(mockNavigate).toBeCalledTimes(0);

    wrapper.unmount();
  });

  it("should render the Navbar Component and remove logged user", () => {
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
        <MemoryRouter initialEntries={["/"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const marvelTitle = screen.getByTestId("marvel-screen-title");
    const container = screen.queryByTestId("private-navbar-container");
    const button = screen.getByTestId("private-navbar-logout-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(marvelTitle.innerHTML.trim()).toBe("MarvelScreen");

    expect(container).not.toBe(null);
    expect(button).not.toBe(null);

    fireEvent.click(button);

    const [newUser] = useReducerHook.result.current;

    expect(newUser).toStrictEqual({
      name: "",
      logged: false,
    });

    expect(mockNavigate).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
