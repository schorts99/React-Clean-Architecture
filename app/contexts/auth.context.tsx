import { createContext, type ReactNode, useState, useContext, useEffect } from "react";
import { useRouteLoaderData } from "react-router";

import { DependencyInjectionContext } from "~/contexts/dependency-injection.context";

import { type AuthProvider as IAuthProvider } from "../../modules/common/auth/providers";

export const AuthContext = createContext({
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated: isAuth } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };
  const { container, TYPES } = useContext(DependencyInjectionContext);
  const authProvider = container.get<IAuthProvider>(TYPES.AUTH_PROVIDER);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

  useEffect(() => {
    const unsubscribe = authProvider.onAuthChange((session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
