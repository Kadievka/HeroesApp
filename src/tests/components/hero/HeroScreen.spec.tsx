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

describe("HeroScreen unit tests", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render the HeroScreen Component", () => {
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
        <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("hero-screen-container");
    const image = screen.queryByTestId("hero-screen-image");
    const button = screen.queryByTestId("hero-screen-return-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).not.toBe(null);
    expect(image).not.toBe(null);
    expect(button).not.toBe(null);

    wrapper.unmount();
  });

  it("should return to home page when hero is not found", () => {
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
        <MemoryRouter initialEntries={["/hero/efwqfgwefgweq"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("hero-screen-container");
    const image = screen.queryByTestId("hero-screen-image");
    const button = screen.queryByTestId("hero-screen-return-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).toBe(null);
    expect(image).toBe(null);
    expect(button).toBe(null);

    wrapper.unmount();
  });

  it("should go to previous page when return button is clicked", () => {
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
        <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("hero-screen-container");
    const image = screen.queryByTestId("hero-screen-image");
    const button = screen.getByTestId("hero-screen-return-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).not.toBe(null);
    expect(image).not.toBe(null);
    expect(button).not.toBe(null);

    fireEvent.click(button);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);

    wrapper.unmount();
  });
});
