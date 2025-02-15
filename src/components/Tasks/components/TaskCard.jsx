import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AnimDeleteCard from '../helpers/AnimDeleteCard.js';
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton.jsx";
import CreateTaskCard from "./CreateTaskCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleCompleteTask, setEditTask } from "../../../store/slices/tasksSlice.js";
import { changeMainTask, setMainTask } from "../../../store/slices/mainTaskSlice.js";

function TaskCard({ task, taskIndex}) {

    const dispatch = useDispatch();

    const mainTask = useSelector(state => state.mainTask);
    const tasks = useSelector(state => state.tasks.tasks);
    const editTask = useSelector(state => state.tasks.editTask);

    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    // если нажат чекбокс - карточка выполнена
    const [isTaskCompleted, setIsComplete] = useState(false);

    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), [])

    const taskElement = useRef(null);

    useEffect(() => {
        if (isCardDelete) {
            AnimDeleteCard(taskElement);
            
            if (mainTask.id === task.id) {
                setTimeout(() => {
                    dispatch(changeMainTask({tasks: tasks, taskId: task.id}))    
                }, 600);
            }
        }
    }, [isCardDelete, dispatch]);


    const taskTitle = useRef(null);
    const timeoutId = useRef(null);

    // если задача выполнена - анимация заголовка, перемещение задачи в массив выполн задач
    useEffect(() => {

        if (isTaskCompleted) {

            taskTitle.current.className = 'task__title anim-title-complete';
            timeoutId.current = setTimeout(()=> {
                if (isTaskCompleted) {
                    dispatch(toggleCompleteTask(taskIndex))
                    deleteTask();
                }
            }, 1000)
        } else {
            taskTitle.current.className = 'task__title';
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }

    }, [isTaskCompleted])

    // (передавать ее, а не состояние?)
    function deleteTask() {
        setIsCardDelete(true);

        setTimeout(() => {
            dispatch(removeTask(task.id))
        }, 500)
    }   

    const onClickEdit = useCallback(() => {
        dispatch(setEditTask(task))
    }, [])

    function changeToMainTask() {        
        dispatch(setMainTask({id: task.id, title: task.title}))        
    }

    return (
        <>
            <li 
            ref={taskElement}
            className="tasks__item">
                <section className="tasks__task task">
                    
                    <div className="task__top">
                    <div className="task__top-left">
                        {/* чекбокс */}
                        <input 
                        onClick={() => setIsComplete(curr => !curr)}
                        value={isTaskCompleted}
                        className="task__check" type="checkbox" name="task"/>
                        {/* заголовок */}
                        <h4 
                        ref={taskTitle}
                        onClick={changeToMainTask}
                        className="task__title">
                            {task.title}
                            {/* если нажат чекбокс - зачеркиваем заголовок */}
                            {isTaskCompleted && (
                                <div className="task__title-completed"></div>
                            )}
                        
                        </h4>
                    </div>
                    <div className="task-top-right">

                        {task.deadline > 0 && (
                            <p className="task__deadline">{task.round}/{task.deadline ?? 0}</p>
                            
                        )}

                        <OptionTaskButton 
                            isEdit={true}
                            onClickEdit={onClickEdit}
                            taskId={task.id}
                            taskIndex={taskIndex}
                            whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}
                        />
                    </div>

                    </div>
                    <div className="task__bottom">
                        {task.description 
                        ? <p className="task__describe">{task.description}</p>
                        : null}
                    </div>
                </section>

            </li>
            {editTask.id === task.id &&(
                <CreateTaskCard 
                    isEdit={true}
                />
            )}
        </>
    )
}

export default TaskCard;