"use client"
import { useTasksStore } from "@/shared/store/tasks"

const ButtonAddTask = () => {
    const switchFormTask = useTasksStore(state => state.switchFormTask);
    return (
    <button 
        onClick={() => switchFormTask(true)}
        className="
            flex justify-center bg-accent rounded-xl max-w-104.5 w-full group text-center text-[calc(22px+(25-22)*((100vw-375px)/(1440-375)))] 
            py-5 px-7 transition-all duration-300 hover:bg-[rgba(0,0,0,0.25)] dark:hover:bg-[rgba(75,75,75,0.15)]
            hover:scale-101 active:scale-100 relative mb-7.5
        "
    >
        <span 
            className="
                flex items-center justify-center text-gray-500 size-8.5 rounded-full bg-white absolute top-1/2 left-10 
                -translate-y-1/2 transition-colors group-hover:bg-gray-200 duration-300
            "
        >
            +
        </span>
        Add new task
    </button>
  )
}

export default ButtonAddTask