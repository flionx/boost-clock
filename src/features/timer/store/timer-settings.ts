"use client"
import { create } from "zustand"
import { LongBreakChange, TimerMinutesOperation, TimerMode } from "@/features/timer/types"
import { MAX_TIMER_DURATION, MIN_TIMER_DURATION } from "@/features/tasks/constants"
import { createJSONStorage, persist } from "zustand/middleware"

export interface TimerSettingsState {
    workDuration: number,
    breakDuration: number,
    longBreakDuration: number,
    longBreakInterval: number,
    autoSwitchTo: {
        work: boolean,
        break: boolean,
    }
    currentRound: number,
    soundEnabled: boolean,
    soundCountRepeat: number,
    setDuration: (mode: TimerMode, minutes: number) => void,
    setAutoSwitch: (mode: TimerMode, value: boolean) => void,
    changeMinutes: (mode: TimerMode, type: TimerMinutesOperation) => void,
    setLongBreakInterval: (value: number) => void
    changeCurrentRound: (type: LongBreakChange) => void,
    setSoundEnabled: (enabled: boolean) => void,
    setSoundCountRepeat: (count: number) => void,
    resetSettings: VoidFunction
}

const initSettings = () => ({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoSwitchTo: {
        work: false,
        break: false,
    },
    soundEnabled: true,
    soundCountRepeat: 0
})

export const useTimerSettingsStore = create<TimerSettingsState>()(
    persist(
        (set, get) => ({
            ...initSettings(),
            currentRound: 0,
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
            }),
            setLongBreakInterval: (value) => set({ longBreakInterval: value }),
            setAutoSwitch: (mode, value) => set(state => ({
                autoSwitchTo: {...state.autoSwitchTo, [`${mode}`]: value }
            })),
            changeCurrentRound: (type) => set({ 
                currentRound: type === "add" ? get().currentRound + 1 : 0 
            }),
            setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
            setSoundCountRepeat: (count) => set({ soundCountRepeat: Math.min(count, 4) }),
            resetSettings: () => set({
                ...initSettings()
            })
        }),
        {
            name: "timer-settings-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                workDuration: state.workDuration,
                breakDuration: state.breakDuration,
                longBreakDuration: state.longBreakDuration,
                longBreakInterval: state.longBreakInterval,
                autoSwitchTo: state.autoSwitchTo,
                soundEnabled: state.soundEnabled,
                soundCountRepeat: state.soundCountRepeat
            })
        }
    )
)

const validateDuration = (value: number) => Math.max(MIN_TIMER_DURATION, Math.min(Math.round(value), MAX_TIMER_DURATION))