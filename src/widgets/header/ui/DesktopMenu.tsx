"use client"
import { HEADER_MENU_BUTTONS } from '../constants'
import MenuButton from './MenuButton'
import UserButton from './UserButton'

const DesktopMenu = () => {
  return (
    <div className='hidden items-center gap-5 min-xl:flex'>
        {HEADER_MENU_BUTTONS.map(m => 
            <MenuButton key={m.label} icon={m.icon}>
                {m.label}
            </MenuButton>
        )}
        <UserButton />
    </div>
  )
}

export default DesktopMenu