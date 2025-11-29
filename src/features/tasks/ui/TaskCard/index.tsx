"use client"
import { Task } from "@/shared/types/tasks"
import CheckboxTask from "./CheckboxTask"
import ButtonOptions from "./ButtonOptions"
import { useState } from "react"
import ModalOptions from "./ModalOptions"
import ButtonWithIcon from "./ButtonWithIcon"
import { DeleteIcon, EditIcon } from "@/shared/ui/icons"
import { useTasksStore } from "@/shared/store/tasks"
import { AnimatedTaskForm } from "../TaskForm"

interface TaskCardProps {
    task: Task
}
const TaskCard: React.FC<TaskCardProps> = ({task}) => {   
    const [showOptions, setShowOptions] = useState(false);
    const {deleteTask, setEditTaskId, switchFormTask, editTaskId} = useTasksStore();
    const handleEditTask = () => {
        setEditTaskId(task.id);
        switchFormTask(true);
    }
  return (
    <>
        <div className="w-full rounded-lg bg-accent pt-3 px-3 pb-5">
            <div className="flex justify-between relative mb-4">
                <div className="flex items-center gap-[clamp(0.5rem,1.5vw,1rem)] max-w-85/100">
                    <CheckboxTask id={task.id}/>
                    <h4 className="text-[calc(20px+(25-20)*((100vw-375px)/(1440-375)))] w-fit max-w-[clamp(70%,30vw,85%)] xl:max-w-[clamp(70%,35vw,85%)] text-text break-words relative linethrough-text gray-text">
                        {task.title}
                    </h4>
                </div>
                <div className="relative">
                    {task.round && 
                        <p className="absolute top-1.5 left-[-140%] text-xl">{task.round?.current}/{task.round?.max}</p>
                    }
                    <div className="relative">
                        <ButtonOptions onClick={() => setShowOptions(c => !c)} />
                        {showOptions && (
                            <ModalOptions onClose={() => setShowOptions(c => false)}>
                                <ButtonWithIcon 
                                    onClick={handleEditTask}
                                    label="edit"
                                    icon={EditIcon}
                                />
                                <ButtonWithIcon 
                                    onClick={() => deleteTask(task.id)}
                                    label="delete"
                                    icon={DeleteIcon}
                                />
                            </ModalOptions>
                        )}
                    </div>
                </div>
            </div>
            {task.description && (
                <p className="w-full bg-secondary py-1.5 px-5 text-lg break-words rounded-lg">{task.description}</p>
            )}
        </div>
        {(editTaskId === task.id) && (
            <AnimatedTaskForm task={task} editId={editTaskId} />
        )}
    </>
  )
}

export default TaskCard