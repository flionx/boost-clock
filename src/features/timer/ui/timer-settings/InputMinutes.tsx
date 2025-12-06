"use client"
import { parseNumberInput } from '@/shared/lib/parseNumberInput'
import { TimerMode } from '../../types'
interface InputMinutesProps {
  value: number,
  mode: TimerMode,
  onChange: (mode: TimerMode, minutes: number) => void,
}
const InputMinutes: React.FC<InputMinutesProps> = ({value, mode, onChange}) => {
  return (
    <input
        className="w-20.5 h-7.5 rounded-lg bg-[#D9DBFF] dark:bg-[#4b4f6b] text-center text-[22px] appearance-none"
        type="number"
        value={value}
        onChange={e => onChange(mode, parseNumberInput(e.target.value))}
    />
  )
}

export default InputMinutes