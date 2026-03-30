"use client";

import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme
      ? storedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    root.classList.toggle("dark", isDark);
    setDark(isDark);
    setMounted(true);
  }, []);

  function darkModeHandler(): void {
    const nextThemeIsDark = !dark;
    document.documentElement.classList.toggle("dark", nextThemeIsDark);
    localStorage.setItem("theme", nextThemeIsDark ? "dark" : "light");
    setDark(nextThemeIsDark);
  }

  if (!mounted) {
    return <div className="h-6 w-6" aria-hidden="true" />;
  }

  return (
    <div className="text-xl text-theme-primary">
      <button
        type="button"
        onClick={darkModeHandler}
        aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      >
        {dark && <IoSunny />}
        {!dark && <IoMoon />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
