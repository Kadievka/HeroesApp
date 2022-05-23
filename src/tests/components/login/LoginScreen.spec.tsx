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

describe("LoginScreen unit tests", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render the LoginScreen Component and add logged user", () => {
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
        <MemoryRouter initialEntries={["/login"]}>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("login-screen-container");
    const button = screen.getByTestId("login-screen-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).not.toBe(null);
    expect(button).not.toBe(null);

    fireEvent.click(button);

    const [newUser] = useReducerHook.result.current;

    expect(newUser).toStrictEqual({
      name: "Kadievka Salcedo",
      logged: true,
    });

    expect(mockNavigate).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it("should call navigate to '/' when the lastPath is '/login' ", () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("/login");

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
        <MemoryRouter initialEntries={["/login"]}>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("login-screen-container");
    const button = screen.getByTestId("login-screen-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).not.toBe(null);
    expect(button).not.toBe(null);

    fireEvent.click(button);

    const [newUser] = useReducerHook.result.current;

    expect(newUser).toStrictEqual({
      name: "Kadievka Salcedo",
      logged: true,
    });

    expect(mockNavigate).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
