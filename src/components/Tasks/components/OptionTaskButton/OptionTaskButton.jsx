import OptionsWindow from "../OptionsWindow/OptionsWindow";
import { useState, useCallback } from "react";

function OptionTaskButton({taskId, taskIndex, tasksForMove, changeHasOptions, whenDelete }) {
    
    const [hasOptions, setHasOptions] = useState(false);
    const callSetHasOptions = useCallback((value) => setHasOptions(value), []);

    
    function checkTarget(e) {
        if (e.target.className !== 'task-option-row') {
            setHasOptions(false)
        }         
    }

    return (
        <div 
            onMouseLeave={checkTarget}
            className="task__option-block">
            <button 
                onClick={() => setHasOptions(prev => !prev)}
                className="task__option btn-ui"
            ></button>
            
            {hasOptions ? ( 
                <OptionsWindow 
                taskId={taskId}
                taskIndex={taskIndex}
                tasksForMove={tasksForMove}
                changeHasOptions={{setHasOptions: callSetHasOptions}}
                whenDelete={whenDelete}/> 
            ) : null}
            
        </div>
    )
}

export default OptionTaskButton;