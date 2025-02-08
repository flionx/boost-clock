import { useCallback, useEffect, useRef, useState } from "react";
import AnimDeleteCard from '../helpers/AnimDeleteCard.js';
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton.jsx";

function TaskCard({ task, tasks, completeTasks, taskIndex}) {

    // для анимации удаления
    const [stylesCard, setStylesCard] = useState("tasks__item");
    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    // если нажат чекбокс - карточка выполнена
    const [isTaskCompleted, setIsComplete] = useState(false);

    // выполненные задачи
    const {completedTasks, setCompletedTasks} = completeTasks;

    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), [])

    // если карточка удалена/выполнена - применяем анимацию
    useEffect(()=> {
        if (isCardDelete) {
            AnimDeleteCard(taskElement);
        }

    }, [isCardDelete])

    const taskTitle = useRef(null);
    const timeoutId = useRef(null);

    // если задача выполнена - анимация заголовка, перемещение задачи в массив выполн задач
    useEffect(() => {

        if (isTaskCompleted) {
            const newCompetedTask = {
                id: Date.now(),
                title: task.title, 
                description: task.description
            }

            taskTitle.current.className = 'task__title anim-title-complete';
            timeoutId.current = setTimeout(()=> {
                if (isTaskCompleted) {
                    setCompletedTasks(prevTasks => [newCompetedTask, ...prevTasks]);
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

    const taskElement = useRef(null);

    function deleteTask() {
        setIsCardDelete(true);

        setTimeout(() => {
            tasks.setTasks(prevTasks => 
                prevTasks.filter((_, index) => prevTasks[index].id !== task.id));
        }, 500)
    }

    return (
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
                    className="task__title">
                        {task.title}
                        {/* если нажат чекбокс - зачеркиваем заголовок */}
                        {isTaskCompleted && (
                            <div className="task__title-completed"></div>
                        )}
                    
                    </h4>
                </div>
                
                <OptionTaskButton 
                    taskId={task.id}
                    taskIndex={taskIndex}
                    tasksForMove={tasks}
                    whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}
                />

                </div>
                <div className="task__bottom">
                    {task.description 
                    ? <p className="task__describe">{task.description}</p>
                    : null}
                </div>
            </section>

        </li>
    )
}

export default TaskCard;