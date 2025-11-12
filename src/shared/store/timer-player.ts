import { create } from "zustand";
import { useTimerSettingsStore } from "./timer-settings";
import createTimerWorker from "@/features/timer/lib/createTimerWorker";
import { TimerMode } from "../types/timer";
interface TimerPlayerState {
    mode: TimerMode,
    timeLeft: number,
    isRunning: boolean,
    toggle: VoidFunction,
    skip: VoidFunction,
    reset: VoidFunction,
    switchMode: (mode: TimerMode) => void,
}

export const useTimerPlayerStore = create<TimerPlayerState>((set, get) => {
    const settings = useTimerSettingsStore.getState();
    let worker = createTimerWorker(message => {
        if (message.type === "tick") set({timeLeft: Math.ceil(message.duration)})
        if (message.type === "done") get().skip();
    })

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
            if (worker) {
                if (isRunning) worker.postMessage({type: "stop"});
                else worker.postMessage({type: "start", duration: timeLeft});
            }
            set({isRunning: !isRunning})
        },
        skip: () => {
            const nextMode = get().mode === "work" ? "break" : "work";
            get().switchMode(nextMode);
        },
        reset: () => {
            const {mode} = get();
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            if (worker) worker.postMessage({type: "stop"});
            set({timeLeft: minutes * 60, isRunning: false});
        },
        switchMode: (mode) => {
            const settings = useTimerSettingsStore.getState();
            const minutes = settings[`${mode}Duration`];
            if (worker) worker.postMessage({type: "stop"});
            set({mode, timeLeft: minutes * 60, isRunning: false})
        }
    }
})