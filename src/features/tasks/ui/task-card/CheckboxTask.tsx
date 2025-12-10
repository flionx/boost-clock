"use client"
import { useTasksStore } from "@/features/tasks/store/tasks"
import { Task } from "../../types";
import { useRef, useState } from "react";
interface CheckboxTaskProps {
  id: Task['id']
}
const CheckboxTask: React.FC<CheckboxTaskProps> = ({id}) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCompleteTask = useTasksStore(state => state.toggleCompleteTask);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const handleToggleCompleteTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    setIsChecked(e.target.checked)
    timerRef.current = setTimeout(() => {
      if (e.target.checked) toggleCompleteTask(id);
      timerRef.current = null;         
    }, 1000)
  }
// todo: fix linethrough anim
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        onChange={handleToggleCompleteTask}
        className="sr-only checkbox"
      />
      <div className={`
          flex items-center justify-center size-[clamp(2rem,4vw,2.5rem)]
          rounded-xs border-2 transition-colors
          ${isChecked ? "bg-[#D9DBFF] dark:bg-[#4b4f6b] border-transparent" : 
            "bg-white border-gray-300 dark:border-gray-600"
          }
        `}
      >
        {isChecked && (
          <svg className="size-9/10 text-text " fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        )}
      </div>
    </label>
  )
}

export default CheckboxTask