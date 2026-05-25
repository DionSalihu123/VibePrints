"use client";

import useDarkMode from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } =
    useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
