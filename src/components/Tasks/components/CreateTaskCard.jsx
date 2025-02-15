import { useEffect, useRef, useState } from "react";
import scrollToNew from '../helpers/scrollToNew.js'
import AnimDeleteCard from "../helpers/AnimDeleteCard.js";
import { useDispatch, useSelector } from "react-redux";
import { addTask, changeTask, setEditTask } from "../../../store/slices/tasksSlice.js";

function CreateTaskCard({ isEdit }) {

    const dispatch = useDispatch();
    const editTask = useSelector(state => state.tasks.editTask)

    const resetNewTask = { id: Date.now(), title: '', description: null, complete: false, deadline: null, round: 0};

    const [newTask, setNewTask] = useState(() => ({...resetNewTask, ...editTask}));

    const createNewTaskRef = useRef(null);
    
    useEffect(() => {
        setNewTask(editTask);
        console.log('когда');
        
    }, [editTask]);
    

    // кнопка отмена - сброс и анимация
    function cancelNewTask() {
        AnimDeleteCard(createNewTaskRef);
        setTimeout(() => {
            dispatch(setEditTask({})); // Просто сбрасываем редактируемую задачу
        }, 500);
    }
    
    
    //кнопка создать - скрыть опцию
    function createNewTask() {
        if (newTask.title.trim() !== '') {
            dispatch(addTask({
                ...newTask, 
                id: Date.now()
            }))
            dispatch(setEditTask({}));
            setNewTask(curr => {});
        }
    }

    function saveTask() {
        dispatch(changeTask({...newTask}));
        dispatch(setEditTask({}));
    }
    

    const inputTitleRef = useRef(null);
    
    // при создании новой задачи - плавное перемещение, создание фокуса на инпуте
    useEffect(() => {
        scrollToNew(createNewTaskRef);
        inputTitleRef.current.focus();  
        console.log("editTask:", editTask);
        console.log("newTask:", newTask);          
    }, [])
    
    const inputDescriptionRef = useRef(null);
    // при создании описания задачи - создание фокуса на инпуте
    useEffect(() => {
        if (newTask.description !== null) {
            if (isEdit) {
                inputDescriptionRef.current.value = newTask.description;
            }
            inputDescriptionRef.current.focus();
        }
    }, [newTask.description])

    // при изменениях Инпута (можно объединить функции в одну)
    function changeTitleHandle(e) {
        setNewTask(curr => ({ ...curr, title: e.target.value}))
    }

    function changeDescriptionHandle(e) {
        setNewTask(curr => ({ ...curr, description: e.target.value}))

    }

    function changeDeadlineHandle(type) {
        if (type === '+') {
            setNewTask(curr => ({ ...curr, deadline: curr.deadline + 1}))
        } else {
            if (newTask.deadline > 0) {                
                setNewTask(curr => ({ ...curr, deadline: curr.deadline - 1}))
            }
        }
    }

    function addDescriptionHandle() {
        setNewTask(curr => ({...curr, description: ''}))    
    }
    
    function addDeadlineHandle() {
        setNewTask(curr => ({...curr, deadline: 0}))
    }

    return (
        <li className="tasks__item" ref={createNewTaskRef}>

            <section className="tasks__task-create task">
                <div className="create-task__col">
                    <h4 className="task__title create-task__title">Title</h4>
                    <input 
                    value={newTask.title}
                    onChange={changeTitleHandle}
                    ref={inputTitleRef}
                    className="create-task__input"
                    type="text" 
                    placeholder="title for your task" />
                </div>
                <div className="create-task__col">
                    {(newTask.description || newTask.description == '') ? (
                        <>
                        <h4 className="task__title create-task__title">Description</h4>
                        <textarea 
                        value={newTask.description} 
                        onChange={changeDescriptionHandle}
                        ref={inputDescriptionRef}
                        className="create-task__input" placeholder="more detailed task description" />
                        </>
                    ) : (
                        <button 
                        onClick={addDescriptionHandle}
                        className="btn-with-plus btn-ui m15">Add a description</button>
                    )}

                        
                </div>
                    {newTask.deadline !== null && (
                        <div className="create-task__col">
                                <h4 className="task__title create-task__title">Deadline</h4>
                            <div className="create-task__deadline">
                                <div className="create-task__deadline-value">{newTask.deadline ?? 0}</div>
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
                        {newTask.deadline == null && (
                            <button 
                            onClick={addDeadlineHandle}
                            disabled={newTask.deadline}
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

