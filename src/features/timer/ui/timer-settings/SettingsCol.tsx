"use client"
import { useTimerSettingsStore } from '@/shared/store/timer-settings'
import { capitalizeFirstLetter } from '@/shared/lib/capitalizeFirstLetter'
import { TimerMode } from '@/shared/types/timer'
import SquareButton from './SquareButton'
import InputMinutes from './InputMinutes'

interface SettingsColProps {
    mode: TimerMode,
    minutes: number,
}

const SettingsCol: React.FC<SettingsColProps> = ({ mode, minutes }) => {
    const {setDuration, changeMinutes} = useTimerSettingsStore();
  return (
    <div className="flex flex-col items-center">
        <h3 className="mb-5 text-2xl">
            {capitalizeFirstLetter(mode)}
        </h3>
        <div className="flex items-center gap-1.5">
            <SquareButton label="-" onClick={() => changeMinutes(mode, "-")} />
            <InputMinutes value={minutes} mode={mode} onChange={setDuration} />
            <SquareButton label="+" onClick={() => changeMinutes(mode, "+")} />
        </div>
    </div>
  )
}

export default SettingsCol