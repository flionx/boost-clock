import './OptionsWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import { moveUpTask, moveDownTask, removeTask } from '../../../../store/slices/tasksSlice';

function OptionsWindow({ changeHasOptions, taskIndex, whenDelete, taskId, onClickEdit, isEdit}) {
    
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    const {setHasOptions} = changeHasOptions;

    const {isCardDelete, setIsCardDelete} = whenDelete    

    function hideOptions() {
        setHasOptions(ho => ho = false)
    }

    function moveTaskToUp() {
        if (taskIndex > 0) {
            dispatch(moveUpTask(taskIndex))
            hideOptions();
        }
    }

    function moveTaskToDown() {
        if (taskIndex < (tasks.length - 1)) {
            dispatch(moveDownTask(taskIndex))
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


    return (
        <div className="task-option">
            {isEdit && (

                <button 
                onClick={onClickEdit}
                className="task-option__row row-opt1">
                    edit
                </button>
            )}
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
            <button 
            onClick={deleteTask}
            className="task-option__row row-opt4">
                delete
            </button>
            
        </div>
    )
    
}

export default OptionsWindow;
