import { createContext, type ReactNode, useMemo } from "react";
import { Container } from "inversify";

import { createBrowserContainer } from "../../di/container.browser";
import { TYPES } from "../../di/types";

export const DependencyInjectionContext = createContext({
  container: new Container(),
  TYPES,
});

export function DependencyInjectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const container = useMemo(() => createBrowserContainer(), []);

  return (
    <DependencyInjectionContext.Provider value={{ container, TYPES }}>
      {children}
    </DependencyInjectionContext.Provider>
  );
}
