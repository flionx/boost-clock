"use client"
import { create } from "zustand"
import { TimerMinutesOperation, TimerMode } from "../types/timer"

interface TimerSettingsState {
    workDuration: number,
    breakDuration: number,
    longBreakDuration: number,
    setDuration: (mode: TimerMode, minutes: number) => void,
    changeMinutes: (mode: TimerMode, type: TimerMinutesOperation) => void
}

export const useTimerSettingsStore = create<TimerSettingsState>(set => ({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    setDuration: (mode, minutes) => set({
        [`${mode}Duration`]: validateDuration(minutes)
    }),
    changeMinutes: (mode, type) => set(state => {
        const minutes = state[`${mode}Duration`];
        const changeValue = type === '+' ? 1 : -1;
        const newMinutes = validateDuration(minutes + changeValue)
        return {
            [`${mode}Duration`]: newMinutes
        }
    })
}))

const validateDuration = (value: number) => Math.max(1, Math.round(value))