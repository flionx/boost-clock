import { useCallback, useEffect, useRef, useState } from "react";
import OptionForTask from "./OptionForTask/OptionForTask";

function TaskCard({ task, tasks, completeTasks, taskIndex}) {

    // опции перемещения, удаления задачи при нажатии на кнопку
    const [hasOptions, setHasOptions] = useState(false);
    // для анимации удаления
    const [stylesCard, setStylesCard] = useState("tasks__item");
    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    // если нажат чекбокс - карточка выполнена
    const [isTaskCompleted, setIsComplete] = useState(false);

    // выполненные задачи
    const {completedTasks, setCompletedTasks} = completeTasks;

    const callSetHasOptions = useCallback((value) => setHasOptions(value), [])
    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), [])

    // если карточка удалена - применяем анимацию
    useEffect(()=> {
        if (!isCardDelete) {
            return;
        }
        
        changeMaxHeight();
        setStylesCard("tasks__item anim-delete");
        
        const timer = setTimeout(() => {
            setStylesCard("tasks__item");
        }, 500);
    
        return () => clearTimeout(timer);
        

    }, [isCardDelete])

    const taskTitle = useRef(null);
    const timeoutId = useRef(null);

    // если задача выполнена - анимация, перемещение задачи в массив выполн задач
    useEffect(() => {

        if (isTaskCompleted) {
            const newCompetedTask = {
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

    function changeMaxHeight() {
        const height = taskElement.current.getBoundingClientRect().height; // Узнаем высоту
        taskElement.current.style.maxHeight = `${height}px`; // Устанавливаем max-height
    }
    

    return (
        <li 
        ref={taskElement}
        className={stylesCard}>
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
                    className="task__title">{task.title}
                    {/* если нажат чекбокс - зачеркиваем заголовок */}
                    {isTaskCompleted && (
                        <div className="task__title-completed"></div>
                    )}
                    
                    </h4>
                </div>
                <div className="task__option-block">
                    <button 
                    onClick={() => setHasOptions(ho => ho = !ho)} 
                    className="task__option pink-btn"></button>
                    
                    {hasOptions ? ( 
                        <OptionForTask 
                        taskId={task.id}
                        taskIndex={taskIndex}
                        tasksForMove={tasks}
                        changeHasOptions={{setHasOptions: callSetHasOptions}}
                        whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}/> 
                    ) : null}
                    
                </div>
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