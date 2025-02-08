import { useCallback, useEffect, useRef, useState } from "react";
import OptionTaskButton from "../OptionTaskButton/OptionTaskButton.jsx";
import AnimDeleteCard from '../../helpers/AnimDeleteCard.js'

function CompletedTaskCard({completeTasks, task, taskIndex}) {

    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), []);

    const {completedTasks, setCompletedTasks} = completeTasks;

    const cardRef = useRef(null);

    useEffect(() => {
        if (isCardDelete) {
            AnimDeleteCard(cardRef, 'completed')
        }

    }, [isCardDelete])

        
    return (
        <li 
        ref={cardRef}
        className="completed-list__item">
            <div className="completed-list__item-top">
                <h5>{task.title}</h5>

                <OptionTaskButton 
                    taskId={task.id}
                    taskIndex={taskIndex}
                    tasksForMove={{tasks: completedTasks, setTasks: setCompletedTasks}}
                    whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}
                />

            </div>
            {task.description ? ( 
                <div className="completed-list__item-describe">{task.description}</div>
            ) : null}
        </li>
    )
}

export default CompletedTaskCard;