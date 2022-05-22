import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { useReducer } from "react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../auth/authContext";
import authReducer from "../../auth/authReducer";
import AuthContextInterface from "../../interfaces/auth/AuthContextInterface";
import AuthReducerStateInterface from "../../interfaces/auth/AuthReducerStateInterface";
import PublicDashboardRouter from "../../routers/PublicDashboardRouter";

describe("PublicDashboardRouter unit tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render PublicNavbar and children - Login", () => {
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
    const loginScreen = screen.queryByTestId("login-screen-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).not.toBe(null);
    expect(privateDashboard).toBe(null);
    expect(navBar).toBe(null);
    expect(publicNavbar).not.toBe(null);

    expect(loginScreen).not.toBe(null);

    wrapper.unmount();
  });

  it("should render PublicNavbar and children - About", () => {
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

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");
    const navBar = screen.queryByTestId("private-navbar-container");
    const publicNavbar = screen.queryByTestId("public-navbar-container");
    const loginScreen = screen.queryByTestId("login-screen-container");
    const aboutScreen = screen.queryByTestId("about-screen-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).not.toBe(null);
    expect(privateDashboard).toBe(null);
    expect(navBar).toBe(null);
    expect(publicNavbar).not.toBe(null);
    expect(loginScreen).toBe(null);

    expect(aboutScreen).not.toBe(null);

    wrapper.unmount();
  });

  it("should render PublicNavbar and children - Blog", () => {
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
        <MemoryRouter initialEntries={["/blog"]}>
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const publicDashboard = screen.queryByTestId("public-dashboard-container");
    const privateDashboard = screen.queryByTestId("private-dashboard-container");
    const navBar = screen.queryByTestId("private-navbar-container");
    const publicNavbar = screen.queryByTestId("public-navbar-container");
    const loginScreen = screen.queryByTestId("login-screen-container");
    const aboutScreen = screen.queryByTestId("about-screen-container");
    const blogScreen = screen.queryByTestId("blog-screen-container");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(publicDashboard).not.toBe(null);
    expect(privateDashboard).toBe(null);
    expect(navBar).toBe(null);
    expect(publicNavbar).not.toBe(null);
    expect(loginScreen).toBe(null);
    expect(aboutScreen).toBe(null);
    expect(blogScreen).not.toBe(null);

    wrapper.unmount();
  });

  it("should render NaPublicNavbarvbar and children - Error", () => {
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
          <PublicDashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const errorContainer = screen.queryByTestId("error-screen-container");
    const errorMessage = screen.queryByTestId("error-404-message");

    expect(wrapper.asFragment()).toMatchSnapshot();

    expect(errorContainer).not.toBe(null);
    expect(errorMessage?.innerHTML.trim()).toBe(`Error 404: No se encontró "${pathname}"`);

    wrapper.unmount();
  });
});
