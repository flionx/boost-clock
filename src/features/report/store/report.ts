import { create } from "zustand";
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
    addWorkTime: (seconds: number) => {
        const mins = convertToHours(seconds);
        set({
            todayWorkTime: get().todayWorkTime + mins,
            totalWorkTime: get().totalWorkTime + mins,
        })
    },
    addBreakTime: (seconds: number) => {
        const mins = convertToHours(seconds);
        set({
            todayBreakTime: get().todayBreakTime + mins,
            totalBreakTime: get().totalBreakTime + mins,
        })
    },
    addPomodoroRound: () => set(state => ({
         pomodoroRounds: state.pomodoroRounds + 1 
    })),
    addCompletedTasks: (type: "OnTime" | "OutOfTime") => set(state => ({
        todayCompletedTasks: get().todayCompletedTasks + 1,
        totalCompletedTasks: get().totalCompletedTasks + 1,
        [`tasks${type}`]: state[`tasks${type}`] + 1
    })),
    resetReport: () => set({
        ...initReport()
    })
}))

const convertToHours = (seconds: number) => {
    const mins = seconds / 60;
    const minsFixed = Number(mins.toFixed(3))
    const hours = minsFixed / 60;
    return Number(hours.toFixed(1)) 
}