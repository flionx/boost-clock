function TaskListHeader({ deleteAll }) {

    const {isDeleteAll, setIsDeleteAll} = deleteAll;

    function changeOnDeleteAllTasks() {
        setIsDeleteAll(true);
    }

    return (
        <div className="tasks__header">
            <div className="tasks__header-row">
                <h3 className="tasks__title">Tasks</h3>
                <button 
                onClick={changeOnDeleteAllTasks}
                className="tasks__clear">Clear all</button>
            </div>
            <hr/>
        </div>
    )
}

export default TaskListHeader;

// сделать модальное окно предупреждения