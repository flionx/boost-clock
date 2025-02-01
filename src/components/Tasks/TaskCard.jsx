
function TaskCard() {
    
    return (
        <li className="tasks__item">
            <section className="tasks__task task">
                
                <div className="task__top">
                <div className="task__top-left">
                    <input className="task__check" type="checkbox" name="task" id="1"/>
                    <h4 className="task__title">Create header</h4>
                </div>
                <button className="task__option pink-btn"></button>
                </div>
                <div className="task__bottom">
                <p className="task__describe">Add div and menu with source</p>
                </div>
            </section>
        </li>
    )
}

export default TaskCard;