import OptionsWindow from "../OptionsWindow/OptionsWindow";
import { useState, useCallback } from "react";

function OptionTaskButton({taskId, taskIndex, whenDelete, onClickEdit, isEdit, isCompleted}) {
    
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
                changeHasOptions={{setHasOptions: callSetHasOptions}}
                onClickEdit={onClickEdit}
                isCompleted={isCompleted}
                whenDelete={whenDelete}/> 
            ) : null}
            
        </div>
    )
}

export default OptionTaskButton;