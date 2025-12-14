import React from 'react'
interface SelectOptionsProps {
    value: string,
    onChange: (value: string) => void,
    children: React.ReactNode
}
const SelectOptions: React.FC<SelectOptionsProps> = ({ value, onChange, children }) => {
  return (
    <select 
        className="bg-primary p-1.5 cursor-pointer" 
        value={value} 
        onChange={e => onChange(e.target.value)}
    >
      {children}
    </select>
  )
}

export default SelectOptions