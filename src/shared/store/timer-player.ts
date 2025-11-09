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

export const useTimerPlayerStore = create<TimerPlayerState>((set, get) => {
    const settings = useTimerSettingsStore.getState();

    useTimerSettingsStore.subscribe(newSettings => {
        const {mode, isRunning} = get();
        if (isRunning) return;
        const minutes = mode === "work" ? newSettings.workDuration : 
            mode === "break" ? newSettings.breakDuration : newSettings.longBreakDuration;
            set({timeLeft: minutes * 60})
    })

    return {
        mode: "work" as const,
        timeLeft: settings.workDuration * 60,
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
            else get().skip();
        },
        switchMode: (mode) => {
            const settings = useTimerSettingsStore.getState();
            const minutes = mode === "work" ? settings.workDuration : 
                mode === "break" ? settings.breakDuration : settings.longBreakDuration;
            set({mode, timeLeft: minutes * 60, isRunning: false})
        }
    }
})