"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ButtonTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    const systemTheme: "light" | "dark" =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const currentTheme = storedTheme || systemTheme;
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

  return (
    <button
      className="w-8.5 h-8.5 flex justify-center items-center rounded-full bg-btn-ui transition"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Image src="/icons/moon.svg" alt="moon" width={20} height={20} />
      ) : (
        <Image src="/icons/sun.svg" alt="sun" width={20} height={20} />
      )}
    </button>
  );
};

export default ButtonTheme;