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
  "/blog": {
   name: "blog",
  },
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
          className="relative hidden flex-row justify-between px-1 pb-0 fade md:relative md:flex md:overflow-auto md:scroll-pr-6 lg:sticky lg:top-0"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`relative m-1 flex align-middle px-2 py-1 transition-all ${
                    isActive
                      ? "text-theme-text"
                      : "text-theme-muted hover:text-theme-primary"
                  }`}
                >
                  <span
                    className={`relative px-[1px] transition-all duration-300 ${
                      isActive
                        ? "rounded-sm bg-theme-accent text-theme-contrast"
                        : "hover:bg-theme-panel hover:text-theme-accent"
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

        <div className="flex items-center justify-between px-4 py-2 text-theme-primary md:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-2xl focus:outline-none focus:ring focus:ring-theme-border/50"
          >
            <IoMenu />
          </button>
          <ThemeSwitcher />
        </div>

        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-theme-overlay/50"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <div
          className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-theme-surface
          transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="flex items-center justify-between border-b border-theme-border/30 p-4">
            <h2 className="text-lg font-semibold text-theme-border">Menu</h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-md p-2 text-2xl text-theme-border focus:outline-none focus:ring focus:ring-theme-border/50"
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
                      ? "bg-theme-accent text-theme-contrast"
                      : "text-theme-primary hover:bg-theme-panel"
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
