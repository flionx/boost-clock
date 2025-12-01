"use client"
import React from 'react'
interface MenuButtonProps {
    children: React.ReactNode,
    icon: React.FC<React.SVGProps<SVGSVGElement>>,
    onClick?: VoidFunction
}
const MenuButton: React.FC<MenuButtonProps> = ({
    children,
    icon: Icon,
    onClick
}) => {
  return (
    <button
      onClick={onClick} 
      className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#979ac6] hover:dark:bg-[#535672] transition-colors duration-200"
    >
      <p className="font-nav">{children}</p>
      <Icon width={24} height={24} className="fill-btn-icon"/>
    </button>
  )
}

export default MenuButton