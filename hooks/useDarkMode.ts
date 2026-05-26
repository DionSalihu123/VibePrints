"use client";

import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    toggleDarkMode,
  };
}
