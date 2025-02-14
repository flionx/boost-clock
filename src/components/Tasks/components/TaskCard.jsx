import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AnimDeleteCard from '../helpers/AnimDeleteCard.js';
import OptionTaskButton from "./OptionTaskButton/OptionTaskButton.jsx";
import CreateTaskCard from "./CreateTaskCard.jsx";
import { MainTaskContext } from "../../MainContent/context/RoundContext.js";

function TaskCard({ task, tasks, completeTasks, taskIndex}) {


    const {mainTask, setMainTask} = useContext(MainTaskContext);

    // выполненные задачи
    const {completedTasks, setCompletedTasks} = completeTasks;

    // (объединить эти 3 состояния в 1 объект)
    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    // если нажат чекбокс - карточка выполнена
    const [isTaskCompleted, setIsComplete] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), [])

    const taskElement = useRef(null);

    // если карточка удалена/выполнена - применяем анимацию
    useEffect(()=> {
        if (isCardDelete) {
            AnimDeleteCard(taskElement);
        }

        return () => {
            if (mainTask.index === taskIndex) {     
                setMainTask(prev => ({ ...prev, hasTask: false}));
            }
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
                description: task.description,
                deadline: task.deadline
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

    // (передавать ее, а не состояние?)
    function deleteTask() {
        setIsCardDelete(true);

        setTimeout(() => {
            tasks.setTasks(prevTasks => 
                prevTasks.filter((_, index) => prevTasks[index].id !== task.id));
        }, 500)
    }   

    const onClickEdit = useCallback(() => {
        setIsEdit(curr => !curr);
    }, [])

    function changeToMainTask() {
        setMainTask(curr => ({...curr, title: task.title, hasTask: true, index: taskIndex}));
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
                            <p className="task__deadline">{task.rounds}/{task.deadline ?? 0}</p>
                            
                        )}

                        <OptionTaskButton 
                            isEdit={true}
                            onClickEdit={onClickEdit}
                            taskId={task.id}
                            taskIndex={taskIndex}
                            tasksForMove={tasks}
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
            {isEdit && (
                <CreateTaskCard 
                    onClickEdit={onClickEdit}
                    isEdit={true}
                    task={task}
                    taskIndex={taskIndex}
                    changeTasks={tasks}
                />
            )}
        </>
    )
}

export default TaskCard;