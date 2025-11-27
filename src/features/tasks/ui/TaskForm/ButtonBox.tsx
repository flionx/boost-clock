import React from 'react'
interface ButtonBoxProps {
    label: string
}
const ButtonBox: React.FC<ButtonBoxProps> = ({label}) => {
    // todo: add handle click
  return (
    <button 
        className="btn-ui size-7.5 py-1.5 px-2.5 rounded-lg text-black"
    >
      {label}
    </button>
  )
}

export default ButtonBox