"use client"
import { Timer } from '@/shared/types/timer'
import { useState } from 'react';
interface ToggleTimerButtonProps {
    type: Timer
}
const ToggleTimerButton: React.FC<ToggleTimerButtonProps> = ({
    type
}) => {
    // todo: use global state
    const [isActive, setIsActive] = useState(false);
  return (
    <button 
        onClick={() => setIsActive(c => !c)}
        className={`
            text-2xl text-white py-1.25 px-2.5 hover:bg-[rgba(0,0,0,0.05)] rounded-sm 
            transition-colors duration-200 ${isActive ? "bg-[rgba(0,0,0,0.14)]" : ""}
        `}
    >
        {type}
    </button>
  )
}

export default ToggleTimerButton