"use client"
import { create } from "zustand";
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import createAudioTimer from "../lib/createAudioTimer";
import { TimerMode } from "../types";
import { saveStartTime } from "../lib/saveStartTime";
import { saveTimeToReport } from "../lib/saveTimeToReport";
interface TimerPlayerState {
    mode: TimerMode,
    timeLeft: number,
    isRunning: boolean,
    toggle: VoidFunction,
    skip: (playSound?: boolean) => void,
    reset: VoidFunction,
    switchMode: (mode: TimerMode) => void,
    restoreFromStorage: VoidFunction
}

export const useTimerPlayerStore = create<TimerPlayerState>((set, get) => {
    const settings = useTimerSettingsStore.getState();
    
    let timer = createAudioTimer(
        (timeLeft) => set({timeLeft}), // tick
        () => get().skip(false), // done
        () => useTimerSettingsStore.getState().soundEnabled,
        () => useTimerSettingsStore.getState().soundCountRepeat,
    )

    useTimerSettingsStore.subscribe(newSettings => {
        const {mode, isRunning} = get();
        if (isRunning) return;
        set({timeLeft: newSettings[`${mode}Duration`] * 60})
    })

    return {
        mode: "work" as const,
        timeLeft: settings.workDuration * 60,
        isRunning: false,
        toggle: () => {
            const {isRunning, timeLeft, mode} = get();
            if (isRunning) {
                timer.stop();
                set({isRunning: false});
                saveTimeToReport(false);
            } else {
                timer.start(timeLeft);
                set({isRunning: true});
                saveStartTime(mode, timeLeft);
            }  
        },
        skip: (playSound = true) => {
            const nextMode = get().mode === "work" ? "break" : "work";
            if (playSound) {
                timer.playSound();
            }
            saveTimeToReport(true);
            get().switchMode(nextMode);
            if (useTimerSettingsStore.getState().autoSwitchTo[nextMode]) {
                get().toggle()
            }
        },
        reset: () => {
            const {mode} = get();
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            timer.stop();
            saveTimeToReport(false);
            set({timeLeft: minutes * 60, isRunning: false});
        },
        switchMode: (mode) => {
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            timer.stop();
            saveTimeToReport(false);
            set({mode, timeLeft: minutes * 60, isRunning: false})
        },
        restoreFromStorage: () => {
            const endTimeStr = localStorage.getItem('timer_end_time');
            const isActive = localStorage.getItem('timer_active') === 'true';
            const mode = localStorage.getItem("time_mode") as TimerMode;

            if (isActive && endTimeStr) {
                saveTimeToReport(false);
                const endTime = parseInt(endTimeStr, 10);
                const now = Date.now();
                const timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
                
                if (timeLeft > 0) {
                    set({timeLeft, isRunning: true});
                    timer.start(timeLeft);
                    if (mode) saveStartTime(mode, timeLeft);
                } else {
                    localStorage.removeItem('timer_end_time');
                    localStorage.removeItem('timer_active');
                    get().skip();
                }
            }
        }
    }
})