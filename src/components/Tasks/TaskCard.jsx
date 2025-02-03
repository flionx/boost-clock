import { useCallback, useRef, useState } from "react";
import OptionForTask from "./OptionForTask/OptionForTask";

function TaskCard({ task, taskIndex, tasksForMove}) {

    const [hasOptions, setHasOptions] = useState(false);

    const callSetHasOptions = useCallback((value) => setHasOptions(value), [])

    return (
        <li className="tasks__item">
            <section className="tasks__task task">
                
                <div className="task__top">
                <div className="task__top-left">
                    <input className="task__check" type="checkbox" name="task" id="1"/>
                    <h4 className="task__title">{task.title}</h4>
                </div>
                <div className="task__option-block">
                    <button onClick={() => setHasOptions(ho => ho = !ho)} className="task__option pink-btn"></button>
                    {hasOptions ? ( 
                        <OptionForTask 
                        taskIndex={taskIndex}
                        tasksForMove={tasksForMove}
                        changeHasOptions={{setHasOptions: callSetHasOptions}}/> 
                    ) : null}
                    
                </div>
                </div>
                <div className="task__bottom">
                    {task.description ? (
                        <p className="task__describe">{task.description}</p>
                    ) : null}
                </div>
            </section>

        </li>
    )
}

export default TaskCard;