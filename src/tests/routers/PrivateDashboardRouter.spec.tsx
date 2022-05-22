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

  it("should render Navbar and children - Marvel", () => {
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

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");
    const navBar = screen.queryByTestId("private-navbar-container");
    const marvelTitle = screen.queryByTestId("marvel-screen-title");
    const dcTitle = screen.queryByTestId("dc-screen-title");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).toBe(null);
    expect(privateDashboard).not.toBe(null);

    expect(navBar).not.toBe(null);

    expect(marvelTitle).not.toBe(null);
    expect(dcTitle).toBe(null);

    wrapper.unmount();
  });

  it("should render Navbar and children - DC", () => {
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
        <MemoryRouter initialEntries={["/dc"]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const marvelTitle = screen.queryByTestId("marvel-screen-title");
    const dcTitle = screen.queryByTestId("dc-screen-title");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(marvelTitle).toBe(null);
    expect(dcTitle).not.toBe(null);

    wrapper.unmount();
  });

  it("should render Navbar and children - Search", () => {
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

    const marvelTitle = screen.queryByTestId("marvel-screen-title");
    const dcTitle = screen.queryByTestId("dc-screen-title");
    const search = screen.queryByTestId("search-screen-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(marvelTitle).toBe(null);
    expect(dcTitle).toBe(null);

    expect(search).not.toBe(null);

    wrapper.unmount();
  });

  it("should render Navbar and children - Error", () => {
    const defaultUser: AuthReducerStateInterface = {
      name: "mock-name",
      logged: true,
    };

    const useReducerHook = renderHook(() => useReducer(authReducer, defaultUser));

    const [user, dispatch] = useReducerHook.result.current;

    const pathname = "/fwefewf";

    const wrapper = render(
      <AuthContext.Provider
        value={
          {
            user,
            dispatch,
          } as AuthContextInterface
        }
      >
        <MemoryRouter initialEntries={[pathname]}>
          <PrivateDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const marvelTitle = screen.queryByTestId("marvel-screen-title");
    const dcTitle = screen.queryByTestId("dc-screen-title");
    const search = screen.queryByTestId("search-screen-container");
    const errorContainer = screen.queryByTestId("error-screen-container");
    const errorMessage = screen.queryByTestId("error-404-message");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(marvelTitle).toBe(null);
    expect(dcTitle).toBe(null);
    expect(search).toBe(null);

    expect(errorContainer).not.toBe(null);
    expect(errorMessage?.innerHTML.trim()).toBe(`Error 404: No se encontró "${pathname}"`);

    wrapper.unmount();
  });
});
