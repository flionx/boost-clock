import OptionsWindow from "../OptionsWindow/OptionsWindow";
import { useState, useEffect } from "react";

function OptionTaskButton({taskId, taskIndex, callSetIsCardDelete, onClickEdit, isEdit, isCompleted}) {
    
    const [hasOptions, setHasOptions] = useState(false);
    
    // Закрытие опции
    useEffect(() => {
        const handleClickOutside = () => {
            setHasOptions(false);
        };
        if (hasOptions) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [hasOptions]);

    return (
        <div className="task__option-block">

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setHasOptions(prev => !prev);
                }}
                className="task__option btn-ui"
            ></button>
            
            {hasOptions ? ( 
                <OptionsWindow
                isEdit={isEdit} 
                taskId={taskId}
                taskIndex={taskIndex}
                onClickEdit={onClickEdit}
                isCompleted={isCompleted}
                callSetIsCardDelete={callSetIsCardDelete}/> 
            ) : null}
            
        </div>
    )
}

export default OptionTaskButton;