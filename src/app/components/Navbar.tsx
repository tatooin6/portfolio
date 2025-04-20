"use client";

import Link from "next/link";
import ThemeSwitcher from "./common/ThemeSwitcher";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  //"/blog": {
  //  name: "blog",
  //},
  "/experience": {
    name: "experience",
  },
  "/contact": {
    name: "contact",
  },
  "/projects": {
    name: "projects",
  },
};

const Navbar = () => {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-1 tracking-tight">
      <div className="lg:sticky lg:top-0 px-1">
        <nav
          className="flex flex-row justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`${isActive ? "" : "text-gray-500 hover:text-blue-500"} transition-all hover:text-neutral-800 dark:hover:text-[#9ece6a] dark:text-[#bb9af7] flex align-middle relative py-1 px-2 m-1`}
                >
                  <span
                    className={`relative px-[1px] transition-all duration-300 ${
                      isActive
                        ? "bg-[#9ece6a] text-[#24283b] rounded-sm"
                        : "hover:bg-[#24283b] hover:text-[#9ece6a]"
                    }`}
                  >
                    {name[0]}
                  </span>
                  {name.slice(1)}
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
