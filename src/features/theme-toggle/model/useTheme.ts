"use client"
import { useEffect, useState } from "react";
import { getSystemTheme } from "../lib/getSystemTheme";
type Theme = "light" | "dark";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") as Theme | null || getSystemTheme();
    setTheme(currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return {theme, toggleTheme}
}

export default useTheme