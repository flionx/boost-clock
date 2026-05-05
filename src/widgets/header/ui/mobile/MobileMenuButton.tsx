"use client"
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useCallback, useEffect, useRef, useState } from 'react'
import UnseenNotify from '../UnseenNotify';
import MobileMenu from './MobileMenu';

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen(c => !c), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeMenu]);

  return (
    <div className="xl:hidden relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`flex flex-col justify-between size-6 transition-transform duration-300 ${isOpen ? "-rotate-90" : ""}`}
      >
        <span className="w-full min-h-[0.15625rem] bg-content rounded-xs" />
        <span className="w-full min-h-[0.15625rem] bg-content rounded-xs" />
        <span className="w-full min-h-[0.15625rem] bg-content rounded-xs" />
      </button>
      {isOpen && <MobileMenu />}
      {newUnseenAchievs > 0 && <UnseenNotify count={newUnseenAchievs} />}
    </div>
  )
}

export default MobileMenuButton