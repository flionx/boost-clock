"use client"
import { useCallback, useState } from "react"
// import { HEADER_MENU_BUTTONS } from "../constants"
// import MenuButton from "./MenuButton"
// import UserButton from "./UserButton"

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsOpen(c => !c), []);
    
  return (
    <div className="relative">
        <button 
            onClick={toggleMenu}
            className={`flex flex-col justify-between w-6 h-6 min-xl:hidden transition-transform duration-300 ${isOpen ? "-rotate-90" : ""}`}
        >
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
        </button>
        {/* <div className='hidden items-center gap-5'>
            {HEADER_MENU_BUTTONS.map(m => 
                <MenuButton key={m.label} icon={m.icon}>
                    {m.label}
                </MenuButton>
            )}
            <UserButton />
        </div> */}
    </div>
  )
}

export default MobileMenu