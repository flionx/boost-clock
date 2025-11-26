"use client"
import { useState } from "react"
import ButtonAddProperty from "./ButtonAddProperty"
import ButtonBox from "./ButtonBox"
import FormCol from "./FormCol"
import FormInput from "./FormInput"
import FormTitle from "./FormTitle"
import { Task } from "@/shared/types/tasks"
import FormContainer from "./FormContainer"
const TaskForm = () => {
    const [newTask, setNewTask] = useState<Task>({
        id: String(Date.now()),
        title: '',
        description: null,
        round: null,
        complete: false
    })
  return (
    <FormContainer>
        <FormCol>
            <FormTitle>Title</FormTitle>
            <FormInput type="text" />
        </FormCol>

        {typeof newTask.description === "string" ?
            <FormCol>
                <FormTitle>Description</FormTitle>
                <FormInput type="textarea" />
            </FormCol>
        :
            <FormCol>
                <ButtonAddProperty 
                    label="Add a description"
                    onClick={() => setNewTask(c => ({...c, description: ''}))}
                />
            </FormCol>
        }
        {typeof newTask.round?.current === "number" &&
            <FormCol noMarginBottom>
                <FormTitle>Deadline</FormTitle>
                <div className="flex items-center gap-4">
                    <FormInput type="number" />
                    <div className="flex items-center gap-2.5">
                        <ButtonBox label="-" />
                        <ButtonBox label="+" />
                    </div>
                </div>
            </FormCol>
        }
        <div className="flex justify-between items-center">
            {typeof newTask.round?.current !== "number" && 
                <ButtonAddProperty 
                    label="Add a deadline"
                    onClick={() => setNewTask(c => ({...c, deadline: 0}))}
                />
            }
            <div className="flex items-center gap-[clamp(0.9375rem,2.5vw,3.125rem)] ml-auto">
                <button className="text-xl text-text hover:underline">Cancel</button>
                <button className="py-1 px-3 rounded-xl bg-btn-ui text-xl text-black transition-colors hover:bg-[var(--btn-ui-hover)] active:bg-[var(--btn-ui-active)]">
                    Create
                </button>
            </div>
        </div>
    </FormContainer>
  )
}

export default TaskForm