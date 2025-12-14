import { ReportState } from "../store/report";

export type ReportSnapshot = Pick<ReportState, | "date" | "todayWorkTime" | "todayBreakTime" | "todayCompletedTasks" | "totalWorkTime" 
    | "totalBreakTime" | "pomodoroRounds" | "totalCompletedTasks" | "tasksOnTime" | "tasksOutOfTime">