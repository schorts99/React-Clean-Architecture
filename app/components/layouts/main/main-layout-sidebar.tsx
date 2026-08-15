import { useLocation } from "react-router";
import { LayoutDashboard, Network, DraftingCompass, EthernetPort } from "lucide-react";

import logo from "../../../assets/images/icon.png";

const NAV_ITEMS = [
  { id: "", label: "Overview", Icon: LayoutDashboard },
  { id: "entities", label: "Entities", Icon: Network },
  { id: "use-cases", label: "Use Cases", Icon: DraftingCompass },
  { id: "infrastructures", label: "Infrastructure", Icon: EthernetPort },
];

export function MainLayoutSidebar() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 pt-16 pb-lg w-64 bg-surface-container-lowest border-r border-outline-variant z-30">
      <div className="px-lg mb-xl">
        <div className="flex items-center gap-md mb-sm">
          <img
            className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant shrink-0"
            src={logo}
            alt="Simply POS logo"
            draggable="false"
          />

          <div>
            <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
              Project
            </h2>
            <p className="text-label-md font-label-md text-on-surface-variant">
              v1.0.0
            </p>
          </div>
        </div>
      </div>

      <ul className="flex flex-col grow">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === `/${item.id}`;

          return (
            <li key={item.id}>
              <a
                href={`/${item.id}`}
                className={[
                  "flex items-center gap-md px-lg py-md transition-all duration-200",
                  isActive
                    ? "text-secondary border-r-2 border-secondary font-bold opacity-80 translate-x-1"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-secondary",
                ].join(" ")}
              >
                <item.Icon className="h-[24px] w-[24px]" />
                <span className="text-label-md font-label-md">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
