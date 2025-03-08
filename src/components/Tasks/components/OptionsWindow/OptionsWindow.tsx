import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { moveTask, removeTask, toggleCompleteTask } from '../../../../store/slices/tasksSlice';
import './OptionsWindow.css';

interface Props {
    taskIndex: number,
    callSetIsCardDelete: (value: boolean) => void,
    taskId: number,
    onClickEdit?: VoidFunction,
    isEdit?: boolean,
    isCompleted: boolean,
}

const OptionsWindow: FC<Props> = ({ taskIndex, callSetIsCardDelete, taskId, onClickEdit, isEdit, isCompleted}) => {
    
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.tasks);

    function moveTaskToUp() {
        if (taskIndex > 0) {
            dispatch(moveTask({taskId: taskId, direction: "up" }));
        }
    }

    function moveTaskToDown() {
        if (taskIndex < (tasks.length - 1)) {
            dispatch(moveTask({taskId: taskId, direction: "down" }));
        }
    }

    function deleteTask() {
        callSetIsCardDelete(true)
        setTimeout(() => {
            dispatch(removeTask(taskId));
        }, 500)
    }
    function uncompleteTask() {
        callSetIsCardDelete(true)
        setTimeout(() => {
            dispatch(toggleCompleteTask(taskId))
        }, 500)
    }

    return (
        <div className="task-option">
            {isEdit && (
                <button 
                onClick={onClickEdit}
                className="task-option__row row-opt1">
                    edit
                </button>
            )}
            {isCompleted ? (
                <button 
                onClick={uncompleteTask}
                className="task-option__row row-opt5">
                    restore
                </button>
            ): (
            <>
                <button 
                onClick={moveTaskToUp}
                className="task-option__row row-opt2">
                    move up
                </button>
                <button 
                onClick={moveTaskToDown}
                className="task-option__row row-opt3">
                    move down
                </button>
            </>
                
            )}
            <button 
            onClick={deleteTask}
            className="task-option__row row-opt4">
                delete
            </button>
        </div>
    )
    
}

export default OptionsWindow;
