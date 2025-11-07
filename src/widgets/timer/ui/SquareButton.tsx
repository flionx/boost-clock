// "use client"
import React from 'react'
interface SquareButtonProps {
    children: React.ReactNode,
    // onClick: VoidFunction
}
const SquareButton: React.FC<SquareButtonProps> = ({
    children,
    // onClick
}) => {
  return (
    <button 
        // onClick={onClick}
        className="
            size-7.5 bg-white rounded-xl text-black font-bold duration-200 transition-all 
            hover:bg-white/90 hover:scale-109 active:bg-white active:scale-none
        "
    >
        {children}
    </button>
  )
}

export default SquareButton