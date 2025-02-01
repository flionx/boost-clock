function TaskListHeader() {
    return (
        <div className="tasks__header">
            <div className="tasks__header-row">
                <h3 className="tasks__title">Tasks</h3>
                <button className="tasks__clear">Clear all</button>
            </div>
            <hr/>
        </div>
    )
}

export default TaskListHeader;