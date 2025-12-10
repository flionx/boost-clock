import { create } from "zustand";
import { useTasksStore } from "@/features/tasks/store/tasks";
interface ReportState {
    date: string,
    todayWorkTime: number,
    todayBreakTime: number,
    todayCompletedTasks: number,
    totalWorkTime: number,
    totalBreakTime: number,
    pomodoroRounds: number,
    totalCompletedTasks: number,
    tasksOnTime: number,
    tasksOutOfTime: number,
    addWorkTime: (seconds: number) => void,
    addBreakTime: (seconds: number) => void,
    addPomodoroRound: VoidFunction,
    addCompletedTasks: (type: "OnTime" | "OutOfTime") => void,
    saveToLocalStorage: VoidFunction,
    resetReport: VoidFunction,
}

const initReport = () => ({
    date: new Date().toISOString().split("T")[0], // '2025-08-12'
    todayWorkTime: 0,
    todayBreakTime: 0,
    todayCompletedTasks: 0,
    totalWorkTime: 0,
    totalBreakTime: 0,
    pomodoroRounds: 0,
    totalCompletedTasks: 0,
    tasksOnTime: 0,
    tasksOutOfTime: 0,
})

export const useReportStore = create<ReportState>((set, get) => ({
    ...initReport(),
    addWorkTime: (seconds) => {
        const mins = convertToMins(seconds);
        set({
            todayWorkTime: get().todayWorkTime + mins,
            totalWorkTime: get().totalWorkTime + mins,
        })
        setTimeout(() => get().saveToLocalStorage(), 0);
    },
    addBreakTime: (seconds: number) => {
        const mins = convertToMins(seconds);
        set({
            todayBreakTime: get().todayBreakTime + mins,
            totalBreakTime: get().totalBreakTime + mins,
        })
        setTimeout(() => get().saveToLocalStorage(), 0);
    },
    addPomodoroRound: () => {
        useTasksStore.getState().roundTasks();
        set(state => ({
            pomodoroRounds: state.pomodoroRounds + 1 
        }))
        setTimeout(() => get().saveToLocalStorage(), 0);
    },
    addCompletedTasks: (type) => {
        set(state => ({
            todayCompletedTasks: get().todayCompletedTasks + 1,
            totalCompletedTasks: get().totalCompletedTasks + 1,
            [`tasks${type}`]: state[`tasks${type}`] + 1
        }))
        setTimeout(() => get().saveToLocalStorage(), 0);
    },
    saveToLocalStorage: () => {
        const state = get();
        const report = {
            date: state.date,
            todayWorkTime: state.todayWorkTime,
            todayBreakTime: state.todayBreakTime,
            todayCompletedTasks: state.todayCompletedTasks,
            totalWorkTime: state.totalWorkTime,
            totalBreakTime: state.totalBreakTime,
            pomodoroRounds: state.pomodoroRounds,
            totalCompletedTasks: state.totalCompletedTasks,
            tasksOnTime: state.tasksOnTime,
            tasksOutOfTime: state.tasksOutOfTime,
        };
        localStorage.setItem("report", JSON.stringify(report));
    },
    resetReport: () => {
        set(initReport());
        setTimeout(() => get().saveToLocalStorage(), 0);
    }
}))

const convertToMins = (seconds: number) => {
    const mins = seconds / 60;
    return Number(mins.toFixed(3))
}

if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("report");
    if (saved) {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().split("T")[0];
        
        if (parsed.date === today) {
            useReportStore.setState(parsed);
        } else {
            useReportStore.setState({
                ...parsed,
                date: today,
                todayWorkTime: 0,
                todayBreakTime: 0,
                todayCompletedTasks: 0,
            });
        }
    }
}