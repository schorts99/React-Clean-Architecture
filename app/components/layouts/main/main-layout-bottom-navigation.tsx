import { useLocation } from "react-router";
import { LayoutDashboard, Network, DraftingCompass, EthernetPort } from "lucide-react";

const NAV_ITEMS = [
  { id: "", label: "Overview", Icon: LayoutDashboard },
  { id: "entities", label: "Entities", Icon: Network },
  { id: "use-cases", label: "Use Cases", Icon: DraftingCompass },
  { id: "infrastructures", label: "Infra", Icon: EthernetPort },
];

export function MainLayoutBottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-surface-container-lowest shadow-nav-top pt-sm pb-md px-md z-50 md:hidden flex justify-around items-center">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === `/${item.id}`;

        return (
          <a
            key={item.id}
            href={`/${item.id}`}
            className={[
              "flex flex-col items-center gap-xs p-sm min-w-[64px] transition-colors duration-200",
              isActive
                ? "text-secondary"
                : "text-on-surface-variant hover:text-secondary",
            ].join(" ")}
          >
            <item.Icon className="h-[24px] w-[24px]" />
            <span
              className={[
                "text-label-md font-label-md",
                isActive && "font-bold",
                item.id === "use-cases" && "whitespace-nowrap",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
