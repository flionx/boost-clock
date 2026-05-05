import React from 'react'

interface SelectOptionsProps<T extends string = string> {
  value: T,
  onChange: (value: T) => void,
  children: React.ReactNode
}

const SelectOptions = <T extends string>({
  value,
  onChange,
  children
}: SelectOptionsProps<T>): React.ReactElement => {
  return (
    <select
      className="bg-primary p-1.5 cursor-pointer custom-select"
      value={value}
      onChange={e => onChange(e.target.value as T)}
    >
      {children}
    </select>
  )
}

export default SelectOptions