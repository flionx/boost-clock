import { useCallback, useEffect, useRef, useState } from "react";
import AnimDeleteCard from '../helpers/AnimDeleteCard.js';
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton.jsx";
import CreateTaskCard from "./CreateTaskCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompleteTask, setEditTaskId } from "../../../store/slices/tasksSlice.js";
import { changeMainTask, setMainTask } from "../../../store/slices/mainTaskSlice.js";

function TaskCard({ task, taskIndex, hasCreateTask }) {

    const dispatch = useDispatch();

    const mainTask = useSelector(state => state.mainTask);
    const tasks = useSelector(state => state.tasks.tasks);
    const editTaskId = useSelector(state => state.tasks.editTaskId);

    const [isCardDelete, setIsCardDelete] = useState(false);
    const [isTaskCompleted, setIsComplete] = useState(false);

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

    useEffect(() => {
        if (isTaskCompleted) {
            taskTitle.current.className = 'task__title anim-title-complete';
            timeoutId.current = setTimeout(()=> {                    
                deleteTask();
            }, 1000)
        } else {
            taskTitle.current.className = 'task__title';
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }
    }, [isTaskCompleted])

    function deleteTask() {
        setIsCardDelete(true);
        setTimeout(() => {
            dispatch(toggleCompleteTask(task.id))
        }, 500)
    }   

    const onClickEdit = useCallback(() => {
        dispatch(setEditTaskId(task.id))
    }, [])

    function changeToMainTask() {        
        dispatch(setMainTask({id: task.id, title: task.title}))        
    }

    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), []);

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
                            value={task.complete}
                            className="task__check" type="checkbox" name="task"/>
                        <h4 
                            ref={taskTitle}
                            onClick={changeToMainTask}
                        className="task__title">
                            {task.title}
                            {isTaskCompleted && (
                                <div className="task__title-completed"></div>
                            )}
                        </h4>
                    </div>
                <div className="task-top-right">

                    {task.deadline > 0 && (
                        <p className="task__deadline">{task.round ?? 0}/{task.deadline ?? 0}</p>
                        
                    )}
                    <OptionTaskButton 
                        isEdit={true}
                        onClickEdit={onClickEdit}
                        taskId={task.id}
                        taskIndex={taskIndex}
                        callSetIsCardDelete={callSetIsCardDelete}
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
        {!hasCreateTask && editTaskId === task.id &&(
            <CreateTaskCard 
                isCardDelete={isCardDelete}
                isEdit={true}
                task={task}
            />
        )}
    </>
    )
}

export default TaskCard;