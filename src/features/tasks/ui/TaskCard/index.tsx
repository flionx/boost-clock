import React from 'react'

const TaskCard = () => {
  return (
    <div className="w-full rounded-lg bg-accent pt-3 px-3 pb-5">
        <div className="flex justify-between relative mb-4">
            <div className="flex items-center gap-4 max-w-85/100">
                <input
                    className="checkbox size-10 rounded-xs cursor-pointer accent-[#D9DBFF] dark:accent-[#4b4f6b]" 
                    type="checkbox" 
                />
                <h4 className="text-[calc(20px+(25-20)*((100vw-375px)/(1440-375)))] w-fit max-w-[clamp(70%,30vw,85%)] text-text break-words relative linethrough-text gray-text">
                    new task
                </h4>
            </div>
        </div>
        <div className="relative">
            
        </div>
    </div>
  )
}

export default TaskCard