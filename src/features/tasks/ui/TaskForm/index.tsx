"use client"
import ButtonAddProperty from "./ButtonAddProperty"
import ButtonBox from "./ButtonBox"
import FormCol from "./FormCol"
import FormInput from "./FormInput"
import FormTitle from "./FormTitle"
import FormContainer from "./FormContainer"
import useTaskForm from "../../model/useTaskForm"
import { Task } from "@/shared/types/tasks"
import { useTasksStore } from "@/shared/store/tasks"
import useInputRefs from "../../model/useInputRefs"
import useFocusOnMount from "@/shared/model/useFocusOnMount"
interface TaskFormProps {
    task?: Task
}
const TaskForm: React.FC<TaskFormProps> = ({task}) => {
    const {showForm} = useTasksStore();
    const {editTask, change, changeRoundByType, addProperty, changeRound, handleAddTask, handleCancel} = useTaskForm({task});
    const {inputTitleRef, textareaRef} = useInputRefs(showForm, editTask.description);
    useFocusOnMount(textareaRef, typeof editTask.description == "string")
    if (!showForm) return null;

  return (
    <FormContainer>
        <FormCol>
            <FormTitle>Title</FormTitle>
            <FormInput 
                type="text" 
                value={editTask.title}
                onChange={e => change('title', e.target.value)}
                ref={inputTitleRef}
            />
        </FormCol>

        <FormCol>
            {typeof editTask.description === "string" ? <>
                <FormTitle>Description</FormTitle>
                <FormInput 
                    type="textarea" 
                    value={editTask.description}
                    onChange={e => change('description', e.target.value)}
                    ref={textareaRef}
                />
            </>:
                <ButtonAddProperty 
                    label="Add a description"
                    onClick={() => addProperty('description')}
                />
            }
        </FormCol>
        {typeof editTask.round?.current === "number" &&
            <FormCol noMarginBottom>
                <FormTitle>Deadline</FormTitle>
                <div className="flex items-center gap-4">
                    <FormInput 
                        type="number" 
                        value={editTask.round.max}
                        onChange={changeRound}
                    />
                    <div className="flex items-center gap-2.5">
                        <ButtonBox label="-" onClick={() => changeRoundByType("-")} />
                        <ButtonBox label="+" onClick={() => changeRoundByType("+")} />
                    </div>
                </div>
            </FormCol>
        }
        <div className="flex justify-between items-center">
            {typeof editTask.round?.current !== "number" && 
                <ButtonAddProperty 
                    label="Add a deadline"
                    onClick={() => addProperty('deadline')}
                />
            }
            <div className="flex items-center gap-[clamp(0.9375rem,2.5vw,3.125rem)] ml-auto">
                <button 
                    onClick={handleCancel}
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