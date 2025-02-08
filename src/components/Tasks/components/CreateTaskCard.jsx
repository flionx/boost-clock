import { useEffect, useRef, useState } from "react";
import scrollToNew from '../helpers/scrollToNew.js'
import AnimDeleteCard from "../helpers/AnimDeleteCard.js";

function CreateTaskCard({ createTask, isCreate, changeTasks }) {

    const { newTask, setNewTask } = createTask;
    const { hasCreateTask, setCreateTask } = isCreate;
    const [hasDescription, setHasDescription] = useState(false);
    const {tasks, setTasks} = changeTasks
    // новая задача по умолчанию для сброса
    const resetNewTask = {title: '', description: false, id: Date.now()}

    const createNewTaskRef = useRef(null);
    
    function cancelNewTask() {
        AnimDeleteCard(createNewTaskRef);
        setTimeout(() => {
            setNewTask(resetNewTask);
            setCreateTask(ct => ct = false);
        }, 500)
    }
    
    function createNewTask() {
        if (newTask.title !== '') {
            const updateTasks = [newTask, ...tasks]
            setTasks(t=> t = updateTasks);
            setCreateTask(ct => ct = false);
            setNewTask(resetNewTask);
        }
    }


    const inputTitleRef = useRef(null);
    
    // при создании новой задачи - плавное перемещение, создание фокуса на инпуте
    useEffect(() => {
        if (hasCreateTask) {
            scrollToNew(createNewTaskRef);
            inputTitleRef.current.focus();
        }
    }, [hasCreateTask])
    
    const inputDescriptionRef = useRef(null);
    // при создании описания задачи - создание фокуса на инпуте
    useEffect(() => {
        if (hasDescription) {
            inputDescriptionRef.current.focus();
        }
    }, [hasDescription])

    return (
        <li className="tasks__item" ref={createNewTaskRef}>

            <section className="tasks__task-create task">
                <div className="create-task__col">
                    <h4 className="task__title create-task__title">Title</h4>
                    <input 
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value})}
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
                        // value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value})}
                        ref={inputDescriptionRef}
                        className="create-task__input" placeholder="more detailed task description" />
                        </>

                    ) : (

                        <button 
                        onClick={() => setHasDescription(true)}
                        className="btn-with-plus btn-ui m15">Add description (optional)</button>
                    )}
                        



                </div>
                <div className="create-task__bottom">
                    <button className="btn-with-plus btn-ui">Add the desired deadline (optional)</button>
                    <div className="create-task__btns">
                        <button 
                        onClick={cancelNewTask}
                        className="create-task__btn-cancel">Cancel</button>
                        <button 
                        onClick={createNewTask}
                        className="create-task__btn-create btn-ui">Create</button>
                    </div>
                </div>
            </section>
        </li>
    )
}

export default CreateTaskCard;