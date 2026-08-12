import { type ReactNode } from "react";

import {
  DependencyInjectionProvider,
  AuthProvider,
  CurrentUserProvider,
  CQRSProvider,
} from "~/contexts";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DependencyInjectionProvider>
      <AuthProvider>
        <CurrentUserProvider>
          <CQRSProvider>
            {children}
          </CQRSProvider>
        </CurrentUserProvider>
      </AuthProvider>
    </DependencyInjectionProvider>
  );
}
