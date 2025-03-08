import { memo, useCallback, useEffect, useRef, useState } from "react";
import OptionTaskButton from "../OptionTaskButton/OptionTaskButton";
import AnimDeleteCard from '../../helpers/AnimDeleteCard'

const CompletedTaskCard = memo(({completedTasks, task, taskIndex, CompletedTasksListRef, changeCompletedHandler}) => {
    
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
                    callSetIsCardDelete={callSetIsCardDelete}
                />
            </div>
            {task.description && ( 
                <div className="completed-list__item-describe">{task.description}</div>
            )}
        </li>
    );
});

export default CompletedTaskCard;