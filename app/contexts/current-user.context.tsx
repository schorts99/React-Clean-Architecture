import { createContext, type ReactNode, useState, useContext, useEffect } from "react";
import { useRouteLoaderData } from "react-router";

import { type UserSchema } from "../../modules/common/users/infrastructure/database/schemas";

import { DependencyInjectionContext } from "~/contexts/dependency-injection.context";

import { type AuthProvider } from "../../modules/common/auth/application/interfaces";
import { UserEntity } from "../../modules/common/users/domain/entities";

export const CurrentUserContext = createContext<{
  currentUser: UserEntity | null;
}>({
  currentUser: null,
});

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const { currentUser: user } = useRouteLoaderData("root") as {
    currentUser: UserSchema | null;
  };
  const { container, TYPES } = useContext(DependencyInjectionContext);
  const authProvider = container.get<AuthProvider>(TYPES.AUTH_PROVIDER);
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(user ? UserEntity.fromPrimitives(user) : user);

  useEffect(() => {
    const unsubscribe = authProvider.onAuthChange((session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
