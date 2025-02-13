import './OptionsWindow.css';

function OptionsWindow({ changeHasOptions, taskIndex, tasksForMove, whenDelete, taskId, onClickEdit, isEdit}) {
    
    const {tasks, setTasks} = tasksForMove;

    const {setHasOptions} = changeHasOptions;

    const {isCardDelete, setIsCardDelete} = whenDelete    

    function hideOptions() {
        setHasOptions(ho => ho = false)
    }

    function moveTaskToUp() {
        if (taskIndex > 0) {
            
            const changedTasks = [...tasks];
            [changedTasks[taskIndex], changedTasks[taskIndex - 1]] = 
            [changedTasks[taskIndex - 1], changedTasks[taskIndex]]
            
            setTasks(t => t = changedTasks);

            hideOptions();
        }
    }

    function moveTaskToDown() {
        if (taskIndex < (tasks.length - 1)) {
            
            const changedTasks = [...tasks];
            [changedTasks[taskIndex], changedTasks[taskIndex + 1]] = 
            [changedTasks[taskIndex + 1], changedTasks[taskIndex]]

            setTasks(t => t = changedTasks);
            hideOptions();
        }
    }

    function deleteTask() {
        setIsCardDelete(true);
        const currTasks = [...tasks];
        const updatedTasks = currTasks.filter((_, i) => taskId !== tasks[i].id);
        
        hideOptions();
        setTimeout(() => {
            setTasks(t => t = updatedTasks);
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
