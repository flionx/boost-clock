import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { moveTask, removeTask, toggleCompleteTask } from '../../../../store/slices/tasksSlice';
import './OptionsWindow.css';
import OptionRow from './OptionRow';

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
                <OptionRow onClick={onClickEdit} id={1}>edit</OptionRow>
            )}
            {isCompleted ? (
                <OptionRow onClick={uncompleteTask} id={5}>restore</OptionRow>
            ): (
                <>
                <OptionRow onClick={moveTaskToUp} id={2}>move up</OptionRow>
                <OptionRow onClick={moveTaskToDown} id={3}>move down</OptionRow>
            </>)}
            <OptionRow onClick={deleteTask} id={4}>delete</OptionRow>
        </div>
    )
    
}

export default OptionsWindow;
