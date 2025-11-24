import React from 'react'
interface ButtonBoxProps {
    label: string
}
const ButtonBox: React.FC<ButtonBoxProps> = ({label}) => {
    // todo: add handle click
  return (
    <button 
        className="size-7.5 py-1.5 px-2.5 bg-btn-ui rounded-lg text-black transition-colors hover:bg-[var(--btn-ui-hover)] active:bg-[var(--btn-ui-active)]"
    >
      {label}
    </button>
  )
}

export default ButtonBox