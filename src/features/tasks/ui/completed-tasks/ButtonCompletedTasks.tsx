"use client"
import { useTasksStore } from "@/shared/store/tasks";
import { ArrowDownIcon } from "@/shared/ui/icons"

const ButtonCompletedTasks = () => {
  const showCompletedTasks = useTasksStore(state => state.showCompletedTasks)
  const toggleShowCompletedTasks = useTasksStore(state => state.toggleShowCompletedTasks)
  
  return (
    <button
      onClick={toggleShowCompletedTasks}
      className="w-full flex justify-between items-center py-1.5 px-12 text-3xl bg-accent rounded-lg mb-1.5"
    >
      Completed Tasks
      <ArrowDownIcon className={`
          size-7 text-text dark:text-line relative left-3 duration-300
          transition-transform ${showCompletedTasks ? 'rotate-0' : 'rotate-180'} 
        `} 
      />
    </button>
  )
}

export default ButtonCompletedTasks