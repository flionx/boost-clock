"use client"
import { useTimerPlayerStore } from '@/shared/store/timer-player';
import { TimerMode } from '@/shared/types/timer';
interface ToggleTimerButtonProps {
    type: TimerMode,
    isActive: boolean
}
const ToggleTimerButton: React.FC<ToggleTimerButtonProps> = ({
    type,
    isActive
}) => {
    const {switchMode} = useTimerPlayerStore();
  return (
    <button 
        onClick={() => switchMode(type)}
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