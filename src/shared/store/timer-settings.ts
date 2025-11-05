"use client"
import { create } from "zustand"

interface TimerSettingsState {
    workDuration: number,
    breakDuration: number,
    longBreakDuration: number,
    setWorkDuration: (minutes: number) => void,
    setBreakDuration: (minutes: number) => void,
    setLongBreakDuration: (minutes: number) => void,
}

export const useTimerSettingsStore = create<TimerSettingsState>(set => ({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    setWorkDuration: (minutes) => set({workDuration: minutes}),
    setBreakDuration: (minutes) => set({breakDuration: minutes}),
    setLongBreakDuration: (minutes) => set({longBreakDuration: minutes}),
}))