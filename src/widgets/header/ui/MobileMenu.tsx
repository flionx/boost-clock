"use client"
import { useCallback, useState } from "react"
import UserButton from "./UserButton"
import MenuList from "./MenuList"
import UnseenNotify from "./UnseenNotify"
import { useAchievementsStore } from "@/features/achievements/store/achievements"

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsOpen(c => !c), []);
    const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs)
    
  return (
    <div className="xl:hidden relative">
        <button 
            onClick={toggleMenu}
            className={`flex flex-col justify-between size-6 transition-transform duration-300 ${isOpen ? "-rotate-90" : ""}`}
        >
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
            <span className="w-full min-h-[0.15625rem] bg-text rounded-xs"/>
        </button>
        {isOpen && (
            <ul className="
                flex flex-col-reverse items-center justify-around 
                w-63 h-50 bg-secondary font-nav rounded-sm
                absolute top-13 left-7/10 -translate-x-[50%]
                shadow shadow-secondary border border-[#3a3a3a] z-2"
            >
                <UserButton />
                <MenuList />
            </ul>
        )}
        {newUnseenAchievs > 0 && <UnseenNotify count={newUnseenAchievs} />}
    </div>
  )
}

export default MobileMenu