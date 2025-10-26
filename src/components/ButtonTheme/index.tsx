"use client";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";

const ButtonTheme = () => {
    const {theme, toggleTheme} = useTheme(); 

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