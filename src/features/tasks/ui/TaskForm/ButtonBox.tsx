import React from 'react'
interface ButtonBoxProps {
    label: string,
    onClick: VoidFunction
}
const ButtonBox: React.FC<ButtonBoxProps> = ({label, onClick}) => {
  return (
    <button 
        className="btn-ui size-7.5 py-1.5 px-2.5 rounded-lg text-black"
        onClick={onClick}
    >
      {label}
    </button>
  )
}

export default ButtonBox