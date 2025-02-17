import OptionsWindow from "../OptionsWindow/OptionsWindow";
import { useState, useEffect, useRef } from "react";

function OptionTaskButton({taskId, taskIndex, callSetIsCardDelete, onClickEdit, isEdit, isCompleted}) {
    
    const [hasOptions, setHasOptions] = useState(false);
    
    const optionsRef = useRef(null);

    // Закрываем меню при клике вне него
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
        <div 
        ref={optionsRef}
        className="task__option-block">

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