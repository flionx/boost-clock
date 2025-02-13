import { useEffect, useRef, useState } from "react";
import scrollToNew from '../helpers/scrollToNew.js'
import AnimDeleteCard from "../helpers/AnimDeleteCard.js";

function CreateTaskCard({ isEdit, onClickEdit, isCreate, changeTasks, taskIndex, task = {title: '', description: null, id: Date.now(), deadline: null, rounds: 0}}) {

    // для скрытия окна, в случае создания новой задачи
    const { hasCreateTask, setCreateTask } = isCreate ?? {};
    const { tasks, setTasks } = changeTasks;

    // новая задача по умолчанию для сброса
    const resetNewTask = {title: '', description: null, id: Date.now(), deadline: null, rounds: 0}
    // новая задача {}
    const [newTask, setNewTask] = useState(resetNewTask)
    // задача пользователя
    const [changedTask, setChangedTask] = useState(task)

    const [hasDescription, setHasDescription] = useState(() => task.description ? true : false);
    const [hasDeadline, setHasDeadline] = useState(() => task.deadline ? true : false);

    const createNewTaskRef = useRef(null);
    
    // кнопка отмена - сброс и анимация
    function cancelNewTask() {
        AnimDeleteCard(createNewTaskRef);
        setTimeout(() => {
            if (isEdit) {
                setChangedTask(task)
                onClickEdit();
                
            } else {
                setNewTask(resetNewTask);
                setCreateTask(ct => ct = false);
            }
        }, 500)
    }
    
    //кнопка создать - скрыть опцию
    function createNewTask() {
        if (newTask.title !== '') {
            const updateTasks = [newTask, ...tasks]
            setTasks(t=> t = updateTasks);
            setCreateTask(ct => ct = false);
            setNewTask(resetNewTask);
        }
    }

    // сохранить изменения при редактировании
    function saveTask() {
        const currTasks = [...tasks];
        currTasks[taskIndex] = changedTask;
        setTasks(prevTasks => currTasks);
        onClickEdit();
    }

    const inputTitleRef = useRef(null);
    
    // при создании новой задачи - плавное перемещение, создание фокуса на инпуте
    useEffect(() => {
        if (hasCreateTask || isEdit) {
            scrollToNew(createNewTaskRef);
            inputTitleRef.current.focus();            
        }
    }, [hasCreateTask, isEdit])
    
    const inputDescriptionRef = useRef(null);
    // при создании описания задачи - создание фокуса на инпуте
    useEffect(() => {
        if (hasDescription) {
            if (isEdit) {
                inputDescriptionRef.current.value = task.description;
            }
            inputDescriptionRef.current.focus();
        }
    }, [hasDescription])

    // при изменениях Инпута (можно объединить функции в одну)
    function handleChangeTitle(e) {
        if (isEdit) {
            setChangedTask({ ...changedTask, title: e.target.value})
        } else {
            setNewTask({ ...newTask, title: e.target.value});
        }
    }

    function handleChangeDescription(e) {
        if (isEdit) {
            setChangedTask({ ...changedTask, description: e.target.value})
        } else {
            setNewTask({ ...newTask, description: e.target.value})
        }
    }

    function handleChangeDeadline(type) {
        if (type === '+') {
            if (isEdit) {
                setChangedTask({ ...changedTask, deadline: changedTask.deadline + 1})
            } else {
                setNewTask({ ...newTask, deadline: newTask.deadline + 1})
            }
        } else {
            if (isEdit && changedTask.deadline > 0) {                
                setChangedTask({ ...changedTask, deadline: changedTask.deadline - 1})
            } else if (newTask.deadline > 0) {
                setNewTask({ ...newTask, deadline: newTask.deadline - 1})
            }
        }
    }

    return (
        <li className="tasks__item" ref={createNewTaskRef}>

            <section className="tasks__task-create task">
                <div className="create-task__col">
                    <h4 className="task__title create-task__title">Title</h4>
                    <input 
                    value={isEdit ? changedTask.title : newTask.title}
                    onChange={handleChangeTitle}
                    ref={inputTitleRef}
                    className="create-task__input"
                    type="text" 
                    placeholder="title for your task" />
                </div>
                <div className="create-task__col">
                    {hasDescription ? (
                        <>
                        <h4 className="task__title create-task__title">Description</h4>
                        <textarea 
                        onChange={handleChangeDescription}
                        ref={inputDescriptionRef}
                        className="create-task__input" placeholder="more detailed task description" />
                        </>
                    ) : (
                        <button 
                        onClick={() => setHasDescription(true)}
                        className="btn-with-plus btn-ui m15">Add a description</button>
                    )}

                        
                </div>
                    {hasDeadline && (
                        <div className="create-task__col">
                                <h4 className="task__title create-task__title">Deadline</h4>
                            <div className="create-task__deadline">
                                <div className="create-task__deadline-value">{isEdit ? (changedTask.deadline ?? 0) : (newTask.deadline ?? 0)}</div>
                                <div className="create-task__deadline-btns">
                                    <button 
                                    onClick={() => handleChangeDeadline('+')}
                                    className="btn-deadline btn-ui">+</button>
                                    <button 
                                    onClick={() => handleChangeDeadline('-')}
                                    className="btn-deadline btn-ui">-</button>
                                </div>
                            </div>

                        </div>
                    )}
                <div className="create-task__bottom">
                    <div className="create-task__actions">
                        {!hasDeadline && (
                            <button 
                            onClick={() => setHasDeadline(true)}
                            disabled={hasDeadline}
                            className="btn-with-plus btn-ui">
                            Add a deadline
                            </button>
                        )}
                    </div>

                    <div className="create-task__btns">
                        <button 
                        onClick={cancelNewTask}
                        className="create-task__btn-cancel">Cancel</button>

                        {isEdit ? (
                        <button 
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