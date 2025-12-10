import { useReportStore } from "@/features/report/store/report"
import { Task } from "../types"

export const addCompleteTaskToReport = (isComplete: Task['complete'], round: Task['round']) => {
  if (isComplete) {                        
        useReportStore.getState().addCompletedTasks(!round ? "OnTime" :
            round.current > round.max ? "OutOfTime" : "OnTime" 
        )
    }
}