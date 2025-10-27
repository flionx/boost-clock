"use client";
import useTheme from "../model/useTheme";
import { MoonIcon, SunIcon } from "@/shared/ui/icons";

const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useTheme(); 

  return (
    <button
      className="w-8.5 h-8.5 flex justify-center items-center rounded-full bg-btn-ui transition"
      onClick={toggleTheme}
      >
      {theme === "dark" ? (
        <MoonIcon width={20} height={20} className="fill-black"/>
      ) : (
        <SunIcon width={20} height={20} className="fill-black"/>
      )}
    </button>
  );
};

export default ThemeToggleButton;