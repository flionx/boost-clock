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
        className="size-7.5 bg-white rounded-xl text-black font-bold hover:bg-gray-200"
    >
        {children}
    </button>
  )
}

export default SquareButton