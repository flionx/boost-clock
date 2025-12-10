import { TimerMode } from "../types";

export const saveStartTime = (mode: TimerMode, timeLeftSeconds: number) => {
    const start = Date.now();
    const plannedEnd = start + timeLeftSeconds * 1000;

    localStorage.setItem("time_mode", mode);
    localStorage.setItem("time_start", String(start));
    localStorage.setItem("time_end", String(plannedEnd));
}