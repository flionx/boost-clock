"use client"
import { Task } from "@/shared/types/tasks"

interface TaskCardProps {
    task: Task
}
const TaskCard: React.FC<TaskCardProps> = ({task}) => {    
  return (
    <div className="w-full rounded-lg bg-accent pt-3 px-3 pb-5 mb-7.5">
        <div className="flex justify-between relative mb-4">
            <div className="flex items-center gap-4 max-w-85/100">
                <input
                    className="checkbox size-10 rounded-xs cursor-pointer accent-[#D9DBFF] dark:accent-[#4b4f6b]" 
                    type="checkbox" 
                />
                <h4 className="text-[calc(20px+(25-20)*((100vw-375px)/(1440-375)))] w-fit max-w-[clamp(70%,30vw,85%)] text-text break-words relative linethrough-text gray-text">
                    {task.title}
                </h4>
            </div>
            <div className="relative">
                {task.round && 
                    <p className="absolute top-1.5 left-[-140%] text-xl">{task.round?.current}/{task.round?.max}</p>
                }
                <div className="relative">
                    <button className="btn-ui flex flex-col items-center justify-center gap-0.5 size-8.5 rounded-sm bg-[#d9dbff80]">
                        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
                        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
                        <span className="block size-[0.3125rem] rounded-full bg-[#1D1B20]"></span>
                    </button>
                </div>
            </div>
        </div>
        {task.description && 
            <p className="w-full bg-secondary py-1.5 px-5 text-lg break-words rounded-lg">{task.description}</p>
        }
    </div>
  )
}

export default TaskCard