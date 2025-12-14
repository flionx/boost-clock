"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/shared/ui/icons";
import { getSystemTheme } from "../lib/getSystemTheme";

const ThemeToggleButton = () => {
  const [isMounted, setIsMouted] = useState(false);
  const {theme, setTheme, resolvedTheme} = useTheme();

  useEffect(() => {
    setIsMouted(true);
  }, [])
  
  const toggleTheme = () => setTheme(() => {
    if (theme === "system") return getSystemTheme() === "dark" ? "light" : "dark";
    return theme === "dark" ? "light" : "dark"
  })

  if (!isMounted) return (
    <div className="w-8.5 h-8.5 flex justify-center items-center rounded-full btn-ui"></div>
  )

  return (
    <button
      className="w-8.5 h-8.5 flex justify-center items-center rounded-full btn-ui"
      onClick={toggleTheme}
      >
      {resolvedTheme === "dark" ? (
        <MoonIcon width={20} height={20} className="fill-black"/>
      ) : (
        <SunIcon width={20} height={20} className="fill-black"/>
      )}
    </button>
  );
};

export default ThemeToggleButton;