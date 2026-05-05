"use client"
import { useTimerPlayerStore } from '@/features/timer';
import { TimerMode } from '../../types';
import { useTranslations } from 'next-intl';
interface SwitchTimerButtonProps {
  type: TimerMode,
  isActive: boolean
}
const SwitchTimerButton: React.FC<SwitchTimerButtonProps> = ({
  type,
  isActive
}) => {
  const switchMode = useTimerPlayerStore(state => state.switchMode);
  const t = useTranslations();

  return (
    <button
      onClick={() => switchMode(type)}
      className={`
        text-2xl text-white py-1.25 px-2.5 hover:bg-[rgba(0,0,0,0.05)] rounded-sm 
        transition-colors duration-200 ${isActive ? "bg-[rgba(0,0,0,0.14)]" : ""}
      `}
    >
      {t(type)}
    </button>
  )
}

export default SwitchTimerButton