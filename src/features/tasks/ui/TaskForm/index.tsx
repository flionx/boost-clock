"use client"
import { useRef } from "react"
import ButtonAddProperty from "./ButtonAddProperty"
import ButtonBox from "./ButtonBox"
import FormCol from "./FormCol"
import FormInput from "./FormInput"
import FormTitle from "./FormTitle"
import FormContainer from "./FormContainer"
import useTaskForm from "../../model/useTaskForm"
import { Task } from "@/shared/types/tasks"
import { useTasksStore } from "@/shared/store/tasks"
interface TaskFormProps {
    task?: Task
}
const TaskForm: React.FC<TaskFormProps> = ({task}) => {
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const {showForm, switchFormTask} = useTasksStore();
    const {editTask, setEditTask, handleChangeTitle, 
        handleChangeDescription, handleChangeRound, handleAddTask} = useTaskForm({task, inputTitleRef, textareaRef, showForm});
    if (!showForm) return null;

  return (
    <FormContainer>
        <FormCol>
            <FormTitle>Title</FormTitle>
            <FormInput 
                type="text" 
                value={editTask.title}
                onChange={handleChangeTitle}
                ref={inputTitleRef}
            />
        </FormCol>

        {typeof editTask.description === "string" ?
            <FormCol>
                <FormTitle>Description</FormTitle>
                <FormInput 
                    type="textarea" 
                    value={editTask.description}
                    onChange={handleChangeDescription}
                    ref={textareaRef}
                />
            </FormCol>
        :
            <FormCol>
                <ButtonAddProperty 
                    label="Add a description"
                    onClick={() => setEditTask(c => ({...c, description: ''}))}
                />
            </FormCol>
        }
        {typeof editTask.round?.current === "number" &&
            <FormCol noMarginBottom>
                <FormTitle>Deadline</FormTitle>
                <div className="flex items-center gap-4">
                    <FormInput 
                        type="number" 
                        value={editTask.round.current}
                        onChange={handleChangeRound}
                    />
                    <div className="flex items-center gap-2.5">
                        <ButtonBox label="-" />
                        <ButtonBox label="+" />
                    </div>
                </div>
            </FormCol>
        }
        <div className="flex justify-between items-center">
            {typeof editTask.round?.current !== "number" && 
                <ButtonAddProperty 
                    label="Add a deadline"
                    onClick={() => setEditTask(c => ({...c, deadline: 0}))}
                />
            }
            <div className="flex items-center gap-[clamp(0.9375rem,2.5vw,3.125rem)] ml-auto">
                <button 
                    onClick={() => switchFormTask(false)}
                    className="text-xl text-text hover:underline"
                >
                    Cancel
                </button>
                <button 
                    className="btn-ui py-1 px-3 rounded-xl text-xl text-black" 
                    onClick={handleAddTask}
                >
                    Create
                </button>
            </div>
        </div>
    </FormContainer>
  )
}

export default TaskForm