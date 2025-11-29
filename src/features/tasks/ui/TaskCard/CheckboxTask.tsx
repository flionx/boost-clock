"use client"
import { useTasksStore } from "@/shared/store/tasks"
import { Task } from "@/shared/types/tasks";
interface CheckboxTaskProps {
  id: Task['id']
}
const CheckboxTask: React.FC<CheckboxTaskProps> = ({id}) => {
  const toggleCompleteTask = useTasksStore(state => state.toggleCompleteTask);
  const handleToggleCompleteTask = () => setTimeout(() => toggleCompleteTask(id), 1000)
  return (
    <input
      onChange={handleToggleCompleteTask}
      className="checkbox size-[clamp(2rem,4vw,2.5rem)] rounded-xs cursor-pointer accent-[#D9DBFF] dark:accent-[#4b4f6b]" 
      type="checkbox" 
    />
  )
}

export default CheckboxTask