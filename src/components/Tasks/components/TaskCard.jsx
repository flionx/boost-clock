import { useCallback, useEffect, useRef, useState } from "react";
import OptionForTask from "./OptionForTask/OptionForTask";

function TaskCard({ task, taskIndex, tasksForMove, completeTsks}) {

    // опции перемещения, удаления задачи при нажатии на кнопку
    const [hasOptions, setHasOptions] = useState(false);
    // для анимации удаления
    const [stylesCard, setStylesCard] = useState("tasks__item");
    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    // если нажат чекбокс - карточка выполнена
    const [isTaskCompleted, setIsComplete] = useState(false);


    // выполненные задачи
    const {completedTasks, setCompletedTasks} = completeTsks;

    const callSetHasOptions = useCallback((value) => setHasOptions(value), [])
    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), [])

    // если карточка удалена - применяем анимацию
    useEffect(()=> {
        if (!isCardDelete) {
            return;
        }

        setStylesCard("tasks__item anim-delete");
        
        const timer = setTimeout(() => {
            setStylesCard("tasks__item");
            setIsCardDelete(false);
        }, 500);
    
        return () => clearTimeout(timer);
        

    }, [isCardDelete])

    const taskTitle = useRef(null);

    // если задача выполнена - анимация для заголовка
    useEffect(() => {

        const allCompletedTasks = [...completedTasks];

        if (isTaskCompleted) {
            allCompletedTasks.push({title: task.title, 
                                    description: task.description});
            taskTitle.current.className = 'task__title anim-title-complete';
            setTimeout(()=> {
                setCompletedTasks(allCompletedTasks);
                deleteTask();
            }, 1000)
        } else {
            taskTitle.current.className = 'task__title';
        }

    }, [isTaskCompleted])



    function deleteTask() {
        const currTasks = [...tasksForMove.tasks];
        const updatedTasks = currTasks.filter((_, i) => taskIndex !== i);
        setIsCardDelete(icd => icd = true);
        setTimeout(() => {
            tasksForMove.setTasks(t => t = updatedTasks);
        }, 200)
    }

    return (
        <li className={stylesCard}>
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
                    onClick={() => setHasOptions(ho => ho = !ho)} className="task__option pink-btn"></button>
                    
                    {hasOptions ? ( 
                        <OptionForTask 
                        taskIndex={taskIndex}
                        tasksForMove={tasksForMove}
                        changeHasOptions={{setHasOptions: callSetHasOptions}}
                        whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}/> 
                    ) : null}
                    
                </div>
                </div>
                <div className="task__bottom">
                    {task.description ? (
                        <p className="task__describe">{task.description}</p>
                    ) : null}
                </div>
            </section>

        </li>
    )
}

export default TaskCard;