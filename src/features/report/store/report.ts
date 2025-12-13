import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
    resetReport: VoidFunction,
}

const getToday = () => new Date().toISOString().split("T")[0] // '2025-08-12'

const initReport = (): Omit<ReportState,
| "addWorkTime"
| "addBreakTime"
| "addPomodoroRound"
| "addCompletedTasks"
| "resetReport"
> => ({
  date: getToday(),
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

export const useReportStore = create<ReportState>()(
    persist(
        (set, get) => ({
            ...initReport(),
            addWorkTime: (seconds) => {
                const mins = convertToMins(seconds);
                set({
                    todayWorkTime: get().todayWorkTime + mins,
                    totalWorkTime: get().totalWorkTime + mins,
                })
            },
            addBreakTime: (seconds: number) => {
                const mins = convertToMins(seconds);
                set({
                    todayBreakTime: get().todayBreakTime + mins,
                    totalBreakTime: get().totalBreakTime + mins,
                })
            },
            addPomodoroRound: () => {
                useTasksStore.getState().roundTasks();
                set(state => ({
                    pomodoroRounds: state.pomodoroRounds + 1 
                }))
            },
            addCompletedTasks: (type) => {
                set(state => ({
                    todayCompletedTasks: get().todayCompletedTasks + 1,
                    totalCompletedTasks: get().totalCompletedTasks + 1,
                    [`tasks${type}`]: state[`tasks${type}`] + 1
                }))
            },
            resetReport: () => {
                set(initReport());
            }
        }),
        {
            name: "report-storage",
            storage: createJSONStorage(() => localStorage),   
            partialize: (state) => ({
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
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                const today = getToday();

                if (state.date !== today) {
                    state.date = today;
                    state.todayWorkTime = 0;
                    state.todayBreakTime = 0;
                    state.todayCompletedTasks = 0;
                }
            }
        }
    )
)

const convertToMins = (seconds: number) => {
    const mins = seconds / 60;
    return Number(mins.toFixed(3))
}