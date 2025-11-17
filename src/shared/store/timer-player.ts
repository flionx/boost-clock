import { create } from "zustand";
import { useTimerSettingsStore } from "./timer-settings";
import { TimerMode } from "../types/timer";
import createAudioTimer from "@/features/timer/lib/createAudioTimer";
interface TimerPlayerState {
    mode: TimerMode,
    timeLeft: number,
    isRunning: boolean,
    toggle: VoidFunction,
    skip: VoidFunction,
    reset: VoidFunction,
    switchMode: (mode: TimerMode) => void,
    restoreFromStorage: VoidFunction
}

export const useTimerPlayerStore = create<TimerPlayerState>((set, get) => {
    const settings = useTimerSettingsStore.getState();
    
    let timer = createAudioTimer(
        (timeLeft) => set({timeLeft}), // tick
        () => get().skip() // done
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
            const {isRunning, timeLeft} = get();
            if (isRunning) {
                timer.stop();
                set({isRunning: false})
            } else {
                timer.start(timeLeft);
                set({isRunning: true})
            }  
        },
        skip: () => {
            const nextMode = get().mode === "work" ? "break" : "work";
            timer.playSound()
            get().switchMode(nextMode);
        },
        reset: () => {
            const {mode} = get();
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            timer.stop()
            set({timeLeft: minutes * 60, isRunning: false});
        },
        switchMode: (mode) => {
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            timer.stop();
            set({mode, timeLeft: minutes * 60, isRunning: false})
        },
        restoreFromStorage: () => {
            const endTimeStr = localStorage.getItem('timer_end_time');
            const isActive = localStorage.getItem('timer_active') === 'true';
            
            if (isActive && endTimeStr) {
                const endTime = parseInt(endTimeStr, 10);
                const now = Date.now();
                const timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
                
                if (timeLeft > 0) {
                    set({timeLeft, isRunning: true});
                    timer.start(timeLeft);
                } else {
                    localStorage.removeItem('timer_end_time');
                    localStorage.removeItem('timer_active');
                    timer.playSound();
                    get().skip();
                }
            }
        }
    }
})