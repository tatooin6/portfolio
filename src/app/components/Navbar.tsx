import Link from "next/link";
import ThemeSwitcher from './common/ThemeSwitcher';

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/blog": {
    name: "blog",
  },
  "/experience": {
    name: "experience",
  },
};

const Navbar = () => {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-0 px-1">
        <nav
          className="flex flex-row justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-gray-400 dark:text-gray-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-end px-2">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
