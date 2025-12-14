"use client"
import { useTimerPlayerStore } from '@/features/timer';
import { capitalizeFirstLetter } from '@/shared/lib/capitalizeFirstLetter';
import { TimerMode } from '../../types';
interface SwitchTimerButtonProps {
    type: TimerMode,
    isActive: boolean
}
const SwitchTimerButton: React.FC<SwitchTimerButtonProps> = ({
    type,
    isActive
}) => {
    const switchMode = useTimerPlayerStore(state => state.switchMode);
  return (
    <button 
        onClick={() => switchMode(type)}
        className={`
            text-2xl text-white py-1.25 px-2.5 hover:bg-[rgba(0,0,0,0.05)] rounded-sm 
            transition-colors duration-200 ${isActive ? "bg-[rgba(0,0,0,0.14)]" : ""}
        `}
    >
        {capitalizeFirstLetter(type)}
    </button>
  )
}

export default SwitchTimerButton