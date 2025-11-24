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
        className="
            flex items-center w-fit rounded-lg py-1.5 px-2.5 gap-1.5 text-text-light bg-btn-ui transition-colors
            duration-300 hover:bg-[var(--btn-ui-hover)] active:bg-[var(--btn-ui-active)]
        "
    >
        <span className='text-2xl leading-2'>+</span>
        {label}
    </button>
  )
}

export default ButtonAddProperty