import { type ReactNode } from "react";

import { MainLayoutSidebar } from "~/components/layouts/main/main-layout-sidebar";
import { MainLayoutHeader } from "~/components/layouts/main/main-layout-header";
import { MainLayoutBottomNavigation } from "~/components/layouts/main/main-layout-bottom-navigation";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <MainLayoutSidebar />

      <div className="flex flex-col min-h-screen md:ml-64">
        <MainLayoutHeader />

        <main className="grow p-md sm:p-lg md:p-xl lg:p-xxl max-w-(--container-max) mx-auto w-full pb-28 md:pb-xl">
          {children}
        </main>
      </div>

      <MainLayoutBottomNavigation />
    </div>
  );
}
