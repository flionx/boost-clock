"use client"
import { useEffect } from "react";
import { useAchievementsStore } from "../store/achievements"
import { useReportStore } from "@/features/report/store/report";
import { useTasksStore } from "@/features/tasks/store/tasks";
import { formatToHours } from "@/shared/lib/formatToHours";

const useAchievementsTracker = () => {
    const syncData = useAchievementsStore(state => state.syncData);
    const pomodoroRounds = useReportStore(state => state.pomodoroRounds);
    const taskList = useTasksStore(state => state.list);
    const tasksOnTime = useReportStore(state => state.tasksOnTime);
    const totalWorkTime = useReportStore(state => state.totalWorkTime);
    const totalBreakTime = useReportStore(state => state.totalBreakTime);

    useEffect(() => {                
        syncData({
            pomodoroRounds,
            tasksCount: taskList.length,
            tasksOnTime,
            totalWorkTime: Number(formatToHours(totalWorkTime)), 
            totalBreakTime: Number(formatToHours(totalBreakTime))
        })
    }, [pomodoroRounds, taskList.length, tasksOnTime, totalWorkTime, totalBreakTime])
}

export default useAchievementsTracker