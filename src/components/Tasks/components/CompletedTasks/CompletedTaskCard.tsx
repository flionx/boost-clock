import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import OptionTaskButton from "../OptionTaskButton/OptionTaskButton";
import AnimDeleteCard from '../../helpers/AnimDeleteCard'
import { TaskType } from "../../../../types/global";

interface Props{
    completedTasks: TaskType[],
    task: TaskType,
    taskIndex: number,
    CompletedTasksListRef: {current: HTMLElement | null},
    changeCompletedHandler: VoidFunction,
}

const CompletedTaskCard: FC<Props> = memo(({completedTasks, task, taskIndex, CompletedTasksListRef, changeCompletedHandler}) => {
    
    const [isCardDelete, setIsCardDelete] = useState(false);
    const callSetIsCardDelete = useCallback((value: boolean) => setIsCardDelete(value), []);

    const cardRef = useRef<HTMLLIElement | null>(null);

    // анимация удаления. Если 1 карточка - удаляем весь блок
    useEffect(() => {
        if (isCardDelete) {
            if (completedTasks.length === 1) {
                AnimDeleteCard(CompletedTasksListRef as {current: HTMLElement}, 'completed')
                setTimeout(changeCompletedHandler, 500)
            }
            AnimDeleteCard(cardRef as {current: HTMLElement}, 'completed')
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