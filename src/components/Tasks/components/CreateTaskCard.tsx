import { FC } from "react";
import { ITask } from "../../../types/global";
import useCreateTaskCard from "../../../hooks/useCreateTaskCard";
import CreateTaskButtons from "./CreateTaskCard/CreateTaskButtons";
import CreateTaskDescription from "./CreateTaskCard/CreateTaskDescription";
import CreateTaskDeadline from "./CreateTaskCard/CreateTaskDeadline";

export interface CreateTaskCardProps {
    isEdit: boolean,
    task?: ITask,
    hasCreateTask?: boolean,
    callSetHasCreateTask?: (value: boolean) => void,
    isCardDelete?: boolean,
}

const CreateTaskCard: FC<CreateTaskCardProps> = ({ task, isEdit, hasCreateTask, callSetHasCreateTask, isCardDelete = false}) => {

    const {currentTask, createNewTaskRef, inputTitleRef, inputDescriptionRef, changeTitleHandle, 
        changeDescriptionHandle, addDescriptionHandle, changeDeadlineHandle, 
        addDeadlineHandle, cancelNewTask, saveTask, createNewTask
    } = useCreateTaskCard({isEdit, task, isCardDelete, hasCreateTask, callSetHasCreateTask});

    return (
        <li className="tasks__item" ref={createNewTaskRef}>
            <section className="tasks__task-create task">
                <div className="create-task__col">
                    <h4 className="task__title create-task__title">Title</h4>
                    <input 
                        value={currentTask.title}
                        onChange={changeTitleHandle}
                        ref={inputTitleRef}
                        className="create-task__input"
                        type="text" 
                        placeholder="title for your task" 
                    />
                </div>
                    <CreateTaskDescription 
                        task={currentTask} 
                        inputRef={inputDescriptionRef} 
                        onChange={changeDescriptionHandle} 
                        onClick={addDescriptionHandle}
                    />
                    {typeof currentTask.deadline === 'number' && (
                        <CreateTaskDeadline 
                            deadline={currentTask.deadline} 
                            changeDeadline={changeDeadlineHandle}
                        />
                    )}
                <div className="create-task__bottom">
                    <div className="create-task__actions">
                        {currentTask.deadline == null && (
                            <button 
                            onClick={addDeadlineHandle}
                            disabled={currentTask.deadline !== null}
                            className="btn-with-plus btn-ui">
                            Add a deadline
                            </button>
                        )}
                    </div>
                    <CreateTaskButtons
                        isEdit={isEdit} 
                        cancelNewTask={cancelNewTask} 
                        saveTask={saveTask} 
                        createNewTask={createNewTask}
                    />
                </div>
            </section>
        </li>
    )
}

export default CreateTaskCard;