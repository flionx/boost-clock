

function CompletedTaskCard({completeTasks, task}) {
    
    const {completedTasks, setCompletedTasks} = completeTasks;
        
    return (
        <li className="completed-list__item">
            <div className="completed-list__item-top">
                <h5>{task.title}</h5>
                <div className="task__option-block">
                    <button className="task__option pink-btn"></button>
                </div>
            </div>
            {task.description ? ( 
                <div className="completed-list__item-describe">{task.description}</div>
            ) : null}
        </li>
    )
}

export default CompletedTaskCard;