"use client"
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useCallback, useState } from 'react'
import UnseenNotify from '../UnseenNotify';
import MobileMenu from './MobileMenu';

const MobileMenuButton = () => {
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
        {isOpen && <MobileMenu />}
        {newUnseenAchievs > 0 && <UnseenNotify count={newUnseenAchievs} />}
    </div>
  )
}

export default MobileMenuButton