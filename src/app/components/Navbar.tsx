"use client";

import { useState } from "react";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
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
  "/projects": {
    name: "projects",
  },
  "/contact": {
    name: "contact",
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <aside className="-ml-[8px] mb-1 tracking-tight">
      <div className="lg:sticky lg:top-0 px-1">
        <nav
          className="hidden md:flex lg:sticky lg:top-0 px-1 flex-row justify-between relative pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
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

        <div className="dark:text-[#bb9af7] flex md:hidden justify-between items-center px-4 py-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-md focus:outline-none focus:ring text-2xl"
          >
            <IoMenu />
          </button>
          <ThemeSwitcher />
        </div>

        {drawerOpen && (
          <div
            className="fixed inset-0 bg-[#0f4b6e] bg-opacity-50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <div
          className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#24283b] z-50
          transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg text-[#7aa2f7] font-semibold">Menu</h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-md focus:outline-none focus:ring text-[#7aa2f7] text-2xl"
            >
              <IoClose />
            </button>
          </div>
          <nav className="flex flex-col mt-4 space-y-2 px-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setDrawerOpen(false)}
                  className={`block py-2 px-3 rounded ${
                    isActive
                      ? "bg-[#9ece6a] text-[#24283b]"
                      : "text-[#bb9af7] hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
