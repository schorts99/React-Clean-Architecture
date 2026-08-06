import { type ReactNode } from "react";

import { DependencyInjectionProvider, AuthProvider, CurrentUserProvider } from "~/contexts";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DependencyInjectionProvider>
      <AuthProvider>
        <CurrentUserProvider>
          {children}
        </CurrentUserProvider>
      </AuthProvider>
    </DependencyInjectionProvider>
  );
}
