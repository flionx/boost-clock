import { UserAchievement } from "@/features/achievements/types"
import { ReportState } from "@/features/report/store/report"
import { Task } from "@/features/tasks/types"
import { TimerSettingsState } from "@/features/timer/store/timer-settings"

export interface UserData {
    tasks: {
        list: Task[],
        showCompletedTasks: boolean,
    },
    achievements: {
        achievements: UserAchievement[],
        newUnseenAchievs: number
    },
    report: Omit<ReportState, | "addWorkTime" | "addBreakTime" | "addPomodoroRound" | "addCompletedTasks" | "resetReport">,
    timer: Pick<TimerSettingsState, | "workDuration" | "breakDuration" | "longBreakDuration" | "longBreakInterval" 
        | "autoSwitchTo" | "soundEnabled" | "soundCountRepeat">
}