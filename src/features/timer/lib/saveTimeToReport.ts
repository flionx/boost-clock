import { useReportStore } from "@/features/report/store/report";
import { useTimerSettingsStore } from "../store/timer-settings";
import { TimerMode } from "../types";

export const saveTimeToReport = (autoCompleted: boolean) => {
    const mode = localStorage.getItem("time_mode") as TimerMode;
    const startStr = localStorage.getItem("time_start");
    const endStr = localStorage.getItem("time_end");

    if (!startStr || !endStr || !mode) return;

    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    const now = Date.now();

    const workedSeconds = Math.max(0, Math.min(now, end) - start) / 1000;

    const report = useReportStore.getState();
    if (mode === "work") {
        report.addWorkTime(workedSeconds);
    } else {
        report.addBreakTime(workedSeconds);
    }
        
    if (autoCompleted && mode === "work") {
        report.addPomodoroRound();        
        useTimerSettingsStore.getState().changeCurrentRound("add");
    } 
    if (mode === "longBreak") {
        useTimerSettingsStore.getState().changeCurrentRound("reset");
    }

    localStorage.removeItem("time_mode");
    localStorage.removeItem("time_start");
    localStorage.removeItem("time_end");
}
