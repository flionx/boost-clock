import { create } from "zustand";
import { useTimerSettingsStore } from "./timer-settings";
import { TimerMode } from "../types/timer";
interface TimerPlayerState {
    mode: TimerMode,
    timeLeft: number,
    isRunning: boolean,
    toggle: VoidFunction,
    skip: VoidFunction,
    reset: VoidFunction,
    tick: VoidFunction,
    switchMode: (mode: TimerMode) => void,
}

export const useTimerPlayerStore = create<TimerPlayerState>((set, get) => ({
    mode: "work" as const,
    timeLeft: useTimerSettingsStore.getState().workDuration * 60,
    isRunning: false,
    toggle: () => set(c => ({isRunning: !c.isRunning})),
    skip: () => {
        const nextMode = get().mode === "work" ? "break" : "work";
        get().switchMode(nextMode);
    },
    reset: () => {
        const {mode} = get();
        const settings = useTimerSettingsStore.getState();
        const minutes = mode === "work" ? settings.workDuration : 
            mode === "break" ? settings.breakDuration : settings.longBreakDuration;
        set({timeLeft: minutes * 60, isRunning: false})
    },
    tick: () => {
        const {timeLeft} = get();
        if (timeLeft > 0) set({timeLeft: timeLeft - 1})
        get().skip();
    },
    switchMode: (mode) => {
        const settings = useTimerSettingsStore.getState();
        const minutes = mode === "work" ? settings.workDuration : 
            mode === "break" ? settings.breakDuration : settings.longBreakDuration;
        set({mode, timeLeft: minutes * 60, isRunning: false})
    }
}))