"use client"
import { KeyboardEvent } from "react"
import useFocusOnMount from "@/shared/model/useFocusOnMount"
import useTaskForm from "../../model/useTaskForm"
import useInputRefs from "../../model/useInputRefs"
import ButtonAddProperty from "./ButtonAddProperty"
import ButtonBox from "./ButtonBox"
import FormCol from "./FormCol"
import FormInput from "./FormInput"
import FormTitle from "./FormTitle"
import FormContainer from "./FormContainer"
import { Task } from "@/shared/types/tasks"

interface TaskFormProps {
    task?: Task
}

const TaskForm: React.FC<TaskFormProps> = ({task}) => {
    const {editTask, change, changeRoundByType, addProperty, changeRound, handleSubmit, handleCancel} = useTaskForm({task});
    const {inputTitleRef, textareaRef} = useInputRefs();
    useFocusOnMount(textareaRef, typeof editTask.description == "string")
    
    const isValid = editTask.title.trim().length > 0;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (isValid) {
                handleSubmit();
            }
        }
        if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <FormContainer>
            <FormCol>
                <FormTitle>Title</FormTitle>
                <FormInput 
                    type="text" 
                    value={editTask.title}
                    onChange={e => change('title', e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={inputTitleRef}
                />
            </FormCol>
            <FormCol>
                {typeof editTask.description === "string" ? (
                    <>
                        <FormTitle>Description</FormTitle>
                        <FormInput 
                            type="textarea" 
                            value={editTask.description}
                            onChange={e => change('description', e.target.value)}
                            onKeyDown={handleKeyDown}
                            ref={textareaRef}
                        />
                    </>
                ) : (
                    <ButtonAddProperty 
                        onClick={() => addProperty('description')}
                        label="Add a description"
                    />
                )}
            </FormCol>
            {typeof editTask.round?.current === "number" && (
                <FormCol noMarginBottom>
                    <FormTitle>Deadline</FormTitle>
                    <div className="flex items-center gap-4">
                        <FormInput 
                            type="number" 
                            value={editTask.round.max}
                            onChange={changeRound}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex items-center gap-2.5">
                            <ButtonBox 
                                label="-" 
                                onClick={() => changeRoundByType("-")}
                                aria-label="Decrease deadline" 
                            />
                            <ButtonBox 
                                label="+" 
                                onClick={() => changeRoundByType("+")}
                                aria-label="Increase deadline"
                            />
                        </div>
                    </div>
                </FormCol>
            )}
            <div className="flex justify-between items-center">
                {typeof editTask.round?.current !== "number" && (
                    <ButtonAddProperty 
                        onClick={() => addProperty('deadline')}
                        label="Add a deadline"
                    />
                )}
                <div className="flex items-center gap-[clamp(0.9375rem,2.5vw,3.125rem)] ml-auto">
                    <button 
                        onClick={handleCancel} 
                        className="text-xl text-text hover:underline"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={!isValid}
                        className="btn-ui py-1 px-3 rounded-xl text-xl text-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        type="submit"
                    >
                        {editTask.id ? 'Save' : 'Create'}
                    </button>
                </div>
            </div>
        </FormContainer>
    )
}

export default TaskForm