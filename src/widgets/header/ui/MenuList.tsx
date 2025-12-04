"use client"
import { useModalMenuStore } from '@/shared/store/modal-menu';
import { HEADER_MENU_BUTTONS } from '../constants'
import MenuButton from './MenuButton'

const MenuList = () => {
    const setModal = useModalMenuStore(state => state.setModal);

  return (
    <>
        {HEADER_MENU_BUTTONS.map(m => 
            <MenuButton 
                key={m.label} 
                icon={m.icon}
                onClick={() => setModal(m.label, null)} //todo: onReset func
            >
                {m.label}
            </MenuButton>
        )}
    </>
  )
}

export default MenuList