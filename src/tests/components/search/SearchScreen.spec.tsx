import { cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../../auth/authContext";
import authReducer from "../../../auth/authReducer";
import AuthContextInterface from "../../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../../interfaces/auth/AuthReducerStateInterface";
import PrivateDashboardRouter from "../../../routers/PrivateDashboardRouter";

describe("SearchScreen unit tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render the SearchScreen Component", () => {
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
        <MemoryRouter initialEntries={["/search"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const container = screen.queryByTestId("search-screen-container");
    const title = screen.queryByTestId("search-screen-title");
    const input = screen.queryByTestId("search-screen-input");
    const button = screen.queryByTestId("search-screen-button");
    const results = screen.queryByTestId("search-screen-results");
    const alert = screen.queryByTestId("search-screen-alert");
    const alertNotFound = screen.queryByTestId("search-screen-alert-not-found");
    const heroCards = screen.queryAllByTestId("hero-card-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(container).not.toBe(null);
    expect(title).not.toBe(null);
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(results).not.toBe(null);
    expect(alert).not.toBe(null);

    expect(alertNotFound).toBe(null);
    expect(heroCards.length).toBe(0);

    wrapper.unmount();
  });

  it("should set the input value in the form and get some heroes", () => {
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
        <MemoryRouter initialEntries={["/search"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const input = screen.getByTestId("search-screen-input");
    const button = screen.getByTestId("search-screen-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    fireEvent.change(input, { target: { value: "man" } });
    expect(input).toHaveAttribute("value", "man");

    fireEvent.click(button);

    const alert = screen.queryByTestId("search-screen-alert");
    const alertNotFound = screen.queryByTestId("search-screen-alert-not-found");
    const heroCards = screen.queryAllByTestId("hero-card-container");

    expect(alert).toBe(null);
    expect(alertNotFound).toBe(null);

    expect(heroCards.length > 0).toBe(true);

    wrapper.unmount();
  });

  it("should get some heroes with query params", () => {
    const defaultUser: AuthReducerStateInterface = {
      name: "mock-name",
      logged: true,
    };

    const useReducerHook = renderHook(() => useReducer(authReducer, defaultUser));

    const [user, dispatch] = useReducerHook.result.current;

    const query = "batman";

    const wrapper = render(
      <AuthContext.Provider
        value={
          {
            user,
            dispatch,
          } as AuthContextInterface
        }
      >
        <MemoryRouter initialEntries={["/search?q=" + query]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();

    const alert = screen.queryByTestId("search-screen-alert");
    const alertNotFound = screen.queryByTestId("search-screen-alert-not-found");
    const heroCards = screen.queryAllByTestId("hero-card-container");
    const input = screen.getByTestId("search-screen-input");

    expect(input).toHaveAttribute("value", query);

    expect(alert).toBe(null);
    expect(alertNotFound).toBe(null);

    expect(heroCards.length > 0).toBe(true);

    wrapper.unmount();
  });

  it("should set the input value in the form and but it will not get heroes", () => {
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
        <MemoryRouter initialEntries={["/search"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const input = screen.getByTestId("search-screen-input");
    const button = screen.getByTestId("search-screen-button");

    expect(wrapper.asFragment()).toMatchSnapshot();

    const query = "wefewfwefwes";

    fireEvent.change(input, { target: { value: query } });
    expect(input).toHaveAttribute("value", query);

    fireEvent.click(button);

    const alert = screen.queryByTestId("search-screen-alert");
    const alertNotFound = screen.getByTestId("search-screen-alert-not-found");
    const heroCards = screen.queryAllByTestId("hero-card-container");

    expect(alert).toBe(null);
    expect(heroCards.length).toBe(0);

    expect(alertNotFound.innerHTML.trim()).toBe(`No hay coincidencias para "${query}"`);

    wrapper.unmount();
  });
});
