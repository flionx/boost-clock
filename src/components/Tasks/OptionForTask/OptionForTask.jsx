import './index.css';

function OptionForTask({ changeHasOptions }) {
    
    const {setHasOptions} = changeHasOptions;

    function hideOptions(params) {
        setHasOptions(ho => ho = false)
    }

    return (
        <div onMouseLeave={hideOptions} className="task-option">
            <button className="task-option__row">
                move up
            </button>
            <button className="task-option__row">
                move down
            </button>
            <button className="task-option__row">
                delete
            </button>
        </div>
    )
    
}

export default OptionForTask;

// добавить в новую задачу id,
// при создании новой задачи - id++,
// в key передаем id, а не index
// при удалении задачи - новый массив, filter.
// меняем текущий массив задач на новый