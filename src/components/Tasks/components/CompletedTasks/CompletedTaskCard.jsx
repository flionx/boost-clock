import { useCallback, useEffect, useRef, useState } from "react";
import OptionTaskButton from "../OptionTaskButton/OptionTaskButton.jsx";
import AnimDeleteCard from '../../helpers/AnimDeleteCard.js'

function CompletedTaskCard({completedTasks, task, taskIndex, CompletedTasksListRef, changeCompletedHandler}) {

    // если нажата кнопка = применяем анимацию удаления
    const [isCardDelete, setIsCardDelete] = useState(false);
    const callSetIsCardDelete = useCallback((value) => setIsCardDelete(value), []);

    const cardRef = useRef(null);

    // анимация удаления. Если 1 карточка - удаляем весь блок
    useEffect(() => {
        if (isCardDelete) {
            if (completedTasks.length === 1) {
                AnimDeleteCard(CompletedTasksListRef, 'completed')
                setTimeout(changeCompletedHandler, 500)
            }
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
                    isCompleted={true}
                    whenDelete={{isCardDelete, setIsCardDelete: callSetIsCardDelete}}
                />

            </div>
            {task.description && ( 
                <div className="completed-list__item-describe">{task.description}</div>
            )}
        </li>
    )
}

export default CompletedTaskCard;