"use client"
import React from 'react'
interface ButtonAddPropertyProps {
    label: string,
    onClick: VoidFunction
}
const ButtonAddProperty: React.FC<ButtonAddPropertyProps> = ({
    label,
    onClick
}) => {
  return (
    <button
        onClick={onClick}
        className="btn-ui flex items-center w-fit rounded-lg py-1.5 px-2.5 gap-1.5 text-text-light"
    >
        <span className='text-2xl leading-2'>+</span>
        {label}
    </button>
  )
}

export default ButtonAddProperty