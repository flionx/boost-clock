import { UserAchievement } from "@/features/achievements/types"
import { ReportSnapshot } from "@/features/report/types"
import { TimerSettingsSnapshot } from "@/features/timer/types"
import { Task } from "@/features/tasks/types"

export interface UserData {
    tasks: {
        list: Task[],
        showCompletedTasks: boolean,
    },
    achievements: {
        achievements: UserAchievement[],
        newUnseenAchievs: number
    },
    report: ReportSnapshot,
    timer: TimerSettingsSnapshot
}