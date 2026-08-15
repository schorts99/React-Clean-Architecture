import logo from "~/assets/images/icon.png";

export function MainLayoutHeader() {
  return (
    <header className="md:hidden sticky top-0 z-20 bg-surface border-b border-outline-variant h-16">
      <div className="flex justify-between items-center w-full px-lg h-full max-w-(--container-max) mx-auto">
        <div className="flex items-center gap-md">
          <img
            className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant shrink-0 md:hidden"
            src={logo}
            alt="Simply POS logo"
            draggable="false"
          />
          <span className="text-headline-md font-headline-md font-extrabold text-primary md:hidden">
            Project
          </span>
        </div>
      </div>
    </header>
  );
}
