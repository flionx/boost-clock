"use client"
import { useTasksStore } from "@/features/tasks/store/tasks"
import { Task } from "@/shared/types/tasks";
import { useRef } from "react";
interface CheckboxTaskProps {
  id: Task['id']
}
const CheckboxTask: React.FC<CheckboxTaskProps> = ({id}) => {
  const toggleCompleteTask = useTasksStore(state => state.toggleCompleteTask);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const handleToggleCompleteTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      if (e.target.checked) toggleCompleteTask(id)
      timerRef.current = null;         
    }, 1000)
  }

  return (
    <input
      onChange={handleToggleCompleteTask}
      className="checkbox size-[clamp(2rem,4vw,2.5rem)] rounded-xs cursor-pointer accent-[#D9DBFF] dark:accent-[#4b4f6b]" 
      type="checkbox" 
    />
  )
}

export default CheckboxTask