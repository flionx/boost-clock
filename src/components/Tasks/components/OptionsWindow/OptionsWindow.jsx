import './OptionsWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, removeTask, toggleCompleteTask } from '../../../../store/slices/tasksSlice';

function OptionsWindow({ changeHasOptions, taskIndex, whenDelete, taskId, onClickEdit, isEdit, isCompleted}) {
    
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    const {setHasOptions} = changeHasOptions;

    const {isCardDelete, setIsCardDelete} = whenDelete    

    function hideOptions() {
        setHasOptions(ho => ho = false)
    }

    function moveTaskToUp() {
        if (taskIndex > 0) {
            dispatch(moveTask({taskId: taskId, direction: "up" }));
            hideOptions();
        }
    }

    function moveTaskToDown() {
        if (taskIndex < (tasks.length - 1)) {
            dispatch(moveTask({taskId: taskId, direction: "down" }));
            hideOptions();
        }
    }

    function deleteTask() {
        setIsCardDelete(true);
        
        hideOptions();
        setTimeout(() => {
            dispatch(removeTask(taskId));
        }, 500)
    }
    function uncompleteTask() {
        setIsCardDelete(true);
        
        hideOptions();
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
