import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import scrollToNew from '../helpers/scrollToNew'
import AnimDeleteCard from "../helpers/AnimDeleteCard";
import { addTask, changeTask, setEditTaskId } from "../../../store/slices/tasksSlice";
import { setCompleteAchiev, setStepAchiev } from "../../../store/slices/achievementSlice";
import { ITask } from "../../../types/global";

interface Props {
    isEdit: boolean,
    task?: ITask,
    hasCreateTask?: boolean,
    callSetHasCreateTask?: (value: boolean) => void,
    isCardDelete?: boolean,
}

const CreateTaskCard: FC<Props> = ({ task, isEdit, hasCreateTask, callSetHasCreateTask, isCardDelete = false}) => {
    const dispatch = useAppDispatch()
    const secondAchiev = useAppSelector(state => state.achievement.achievs[1])

    const resetTask: ITask = {id: Date.now(), title: '', description: null, complete: false, deadline: null, round: null};

    const [currentTask, setCurrentTask] = useState(() => isEdit ? (task as ITask) : resetTask);

    const createNewTaskRef = useRef(null);
    const inputTitleRef = useRef(null);
    const inputDescriptionRef = useRef(null);

    useEffect(() => {
        if (isEdit && task) {
            const cleanTask = {
                ...task,
                description: task.description?.trim() || null,
            };
            setCurrentTask(cleanTask);
        }
    }, [task]);

    useEffect(() => {
        if (isCardDelete) {
            cancelNewTask()
        }
    }, [isCardDelete])

    useEffect(() => {
        scrollToNew(createNewTaskRef as unknown as {current: HTMLElement});
        if (currentTask && typeof currentTask.description === 'string') {
            focusDescriptionInput();
        } else {
            const input = inputTitleRef.current as unknown as HTMLInputElement;
            input.focus();
        }
    }, []);

    function focusDescriptionInput() {
        const textarea = inputDescriptionRef.current as unknown as HTMLTextAreaElement;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }

    const changeTitleHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCurrentTask(curr=> ({...curr, title: e.target.value}))  
    }
    const changeDescriptionHandle: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCurrentTask(curr=> ({...curr, description: e.target.value}))  
    }
    function addDescriptionHandle() {
        setCurrentTask(curr=> ({...curr, description: ''}))
        setTimeout(focusDescriptionInput, 150)
    }
    function addDeadlineHandle() {
        setCurrentTask(curr=> ({...curr, deadline: 0}))  
    }
    function changeDeadlineHandle(type: '+' | '-') {
        if (type === '+') {
            setCurrentTask(curr=> ({...curr, deadline: curr.deadline ? curr.deadline + 1 : 1}))  
        } else if (type === '-' && currentTask.deadline && currentTask.deadline > 0) {
            setCurrentTask(curr=> ({...curr, deadline: curr.deadline ? curr.deadline - 1 : 0}))  
        }
    }

    function cancelNewTask() {
        AnimDeleteCard(createNewTaskRef as unknown as {current: HTMLLinkElement})
        setTimeout(() => {
            dispatch(setEditTaskId(null))
            setCurrentTask(resetTask)
            if (hasCreateTask) {
                callSetHasCreateTask && callSetHasCreateTask(false)
                dispatch(setEditTaskId(null))
            }
        }, 500)
    }
    function saveTask() {
        if (currentTask.title.trim() !== '') {
            dispatch(changeTask(currentTask))
            callSetHasCreateTask && callSetHasCreateTask(false)
            dispatch(setEditTaskId(null))
        }
    }

    function createNewTask() {
        if (currentTask.title.trim() !== '') {
            dispatch(addTask(currentTask))
            if (hasCreateTask) {
                callSetHasCreateTask && callSetHasCreateTask(false)
                dispatch(setEditTaskId(null))
            }
            // достижение 2
            if (secondAchiev.step < secondAchiev.max) {                
                dispatch(setStepAchiev("Planner"))
                dispatch(setCompleteAchiev("Planner"))
            }
        }
    }

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
                <div className="create-task__col">
                    {typeof currentTask.description === 'string' ? (
                        <>
                        <h4 className="task__title create-task__title">Description</h4>
                        <textarea 
                            value={currentTask.description} 
                            onChange={changeDescriptionHandle}
                            ref={inputDescriptionRef}
                            className="create-task__input" placeholder="more detailed task description" 
                        />
                        </>
                    ) : (
                        <button 
                        onClick={addDescriptionHandle}
                        className="btn-with-plus btn-ui m15">Add a description</button>
                    )}
                </div>
                    {typeof currentTask.deadline === 'number' && (
                        <div className="create-task__col">
                                <h4 className="task__title create-task__title">Deadline</h4>
                            <div className="create-task__deadline">
                                <div className="create-task__deadline-value">{currentTask.deadline ?? 0}</div>
                                <div className="create-task__deadline-btns">
                                    <button 
                                    onClick={() => changeDeadlineHandle('+')}
                                    className="btn-deadline btn-ui">+</button>
                                    <button 
                                    onClick={() => changeDeadlineHandle('-')}
                                    className="btn-deadline btn-ui">-</button>
                                </div>
                            </div>
                        </div>
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
                    <div className="create-task__btns">
                        <button 
                        onClick={cancelNewTask}
                        className="create-task__btn-cancel">Cancel</button>

                        {isEdit ? ( <button 
                            onClick={saveTask}
                            className="create-task__btn-create btn-ui">Save</button>
                        ) : (
                        <button 
                            onClick={createNewTask}
                            className="create-task__btn-create btn-ui">Create</button>
                        )}
                    </div>
                </div>
            </section>
        </li>
    )
}

export default CreateTaskCard;

