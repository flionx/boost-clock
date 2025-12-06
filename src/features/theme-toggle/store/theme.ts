"use client"
import { create } from "zustand"
import { Theme } from "../types";
import { getSystemTheme } from "../lib/getSystemTheme";

interface TimerSettingsState {
    theme: Theme,
    setTheme: (theme: Theme) => void,
    toggleTheme: VoidFunction
}
// todo: change to next-themes
export const useThemeStore = create<TimerSettingsState>((set, get) => ({
    theme: "light",
    setTheme: theme => {
        changeTheme(theme);
        localStorage.setItem("theme", theme);
        set({ theme })
    },
    toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        set({ theme: newTheme })
    }
}))

const initTheme = () => {
    const userTheme = localStorage.getItem("theme") as Theme | null || getSystemTheme();
    document.documentElement.classList.toggle("dark", userTheme === "dark");
    return userTheme
}

const changeTheme = (userTheme: Theme) => document.documentElement.classList.toggle("dark", userTheme === "dark");