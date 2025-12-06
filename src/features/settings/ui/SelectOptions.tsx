import { Theme } from '@/features/theme-toggle/types'
import React from 'react'
interface SelectOptionsProps {
    value: Theme,
    onChange: (value: Theme) => void
}
const SelectOptions: React.FC<SelectOptionsProps> = ({ value, onChange }) => {
  return (
    <select 
        className="bg-primary p-1.5 cursor-pointer" 
        value={value} 
        onChange={e => onChange(e.target.value as Theme)}
    >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>
  )
}

export default SelectOptions