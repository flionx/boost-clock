import { useCallback, useEffect, useRef, useState } from "react";
import OptionForTask from "../OptionForTask/OptionForTask";
import AnimDeleteCard from '../../helpers/AnimDeleteCard.js'

function CompletedTaskCard({completeTasks, task, taskIndex}) {

    // опции перемещения, удаления задачи при нажатии на кнопку
    const [hasOptions, setHasOptions] = useState(false);
    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);

    const callSetHasOptions = useCallback((value) => setHasOptions(value), []);
    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), []);

    const {completedTasks, setCompletedTasks} = completeTasks;

    const cardRef = useRef(null);

    useEffect(() => {

        AnimDeleteCard(cardRef)

    }, [isCardDelete])

        
    return (
        <li 
        ref={cardRef}
        className="completed-list__item">
            <div className="completed-list__item-top">
                <h5>{task.title}</h5>

                <div className="task__option-block">
                    <button 
                    onClick={() => setHasOptions(prev => prev = !prev)} 
                    className="task__option pink-btn"></button>

                    {hasOptions ? ( 
                        <OptionForTask 
                        taskId={task.id}
                        taskIndex={taskIndex}
                        tasksForMove={{tasks: completedTasks, setTasks: setCompletedTasks}}
                        changeHasOptions={{setHasOptions: callSetHasOptions}}
                        whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}/> 
                    ) : null}

                </div>
            </div>
            {task.description ? ( 
                <div className="completed-list__item-describe">{task.description}</div>
            ) : null}
        </li>
    )
}

export default CompletedTaskCard;