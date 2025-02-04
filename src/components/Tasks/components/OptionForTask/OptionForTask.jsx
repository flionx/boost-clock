import './index.css';

function OptionForTask({ changeHasOptions, taskIndex, tasksForMove, whenDelete}) {
    
    const {tasks, setTasks} = tasksForMove;

    const {setHasOptions} = changeHasOptions;

    const {isCardDelete, setIsCardDelete} = whenDelete

    function hideOptions() {
        setHasOptions(ho => ho = false)
    }

    function moveTaskToUp() {
        if (taskIndex > 0) {
            
            const changedTasks = [...tasks];
            [changedTasks[taskIndex], changedTasks[taskIndex - 1]] = [changedTasks[taskIndex - 1], changedTasks[taskIndex]]
            setTasks(t => t = changedTasks);

            hideOptions();
        }
    }

    function moveTaskToDown() {
        if (taskIndex < (tasks.length - 1)) {
            
            const changedTasks = [...tasks];
            [changedTasks[taskIndex], changedTasks[taskIndex + 1]] = [changedTasks[taskIndex + 1], changedTasks[taskIndex]]
            setTasks(t => t = changedTasks);
            hideOptions();
        }
    }

    function deleteTask() {
        const currTasks = [...tasks];
        const updatedTasks = currTasks.filter((_, i) => taskIndex !== i);
        setIsCardDelete(icd => icd = true);
        hideOptions();
        setTimeout(() => {
            setTasks(t => t = updatedTasks);
        }, 500)
    }


    return (
        <div onMouseLeave={hideOptions} className="task-option">
            <button 
            onClick={moveTaskToUp}
            className="task-option__row">
                move up
            </button>
            <button 
            onClick={moveTaskToDown}
            className="task-option__row">
                move down
            </button>
            <button 
            onClick={() => deleteTask()}
            className="task-option__row">
                delete
            </button>
        </div>
    )
    
}

export default OptionForTask;

// добавить в новую задачу id, ???
// при создании новой задачи - id++, ???
// в key передаем id, а не index  ???
