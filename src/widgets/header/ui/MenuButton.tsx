"use client"
import React from 'react'
import UnseenNotify from './UnseenNotify'
interface MenuButtonProps {
    children: React.ReactNode,
    icon: React.FC<React.SVGProps<SVGSVGElement>>,
    onClick: VoidFunction,
    unseenNotifyCount?: number
}
const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  unseenNotifyCount
}) => {  
  return (
    <button
      onClick={onClick} 
      className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#979ac6] hover:dark:bg-[#535672] transition-colors duration-200 relative"
    >
      <p className="font-nav">{children}</p>
      <Icon width={24} height={24} className="fill-btn-icon"/>
      {unseenNotifyCount && <UnseenNotify count={unseenNotifyCount}/>}
    </button>
  )
}

export default MenuButton