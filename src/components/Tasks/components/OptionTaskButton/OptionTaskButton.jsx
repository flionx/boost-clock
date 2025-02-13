import OptionsWindow from "../OptionsWindow/OptionsWindow";
import { useState, useCallback } from "react";

function OptionTaskButton({taskId, taskIndex, tasksForMove, whenDelete, onClickEdit, isEdit}) {
    
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
                isEdit={isEdit} 
                taskId={taskId}
                taskIndex={taskIndex}
                tasksForMove={tasksForMove}
                changeHasOptions={{setHasOptions: callSetHasOptions}}
                onClickEdit={onClickEdit}
                whenDelete={whenDelete}/> 
            ) : null}
            
        </div>
    )
}

export default OptionTaskButton;