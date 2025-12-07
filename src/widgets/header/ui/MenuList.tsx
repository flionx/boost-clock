"use client"
import { useModalMenuStore } from '@/shared/store/modal-menu';
import useResetSettings from '@/features/settings/model/useResetSettings';
import { HEADER_MENU_BUTTONS } from '../constants'
import MenuButton from './MenuButton'

const MenuList = () => {
    const setModal = useModalMenuStore(state => state.setModal);
    const resetSettings = useResetSettings()

  return (
    <>
        {HEADER_MENU_BUTTONS.map(m => 
            <MenuButton 
                key={m.label} 
                icon={m.icon}
                onClick={() => setModal(
                    m.label, 
                    m.label === "Settings" ? resetSettings : null
                )} //todo: onReset func for Report 
            >
                {m.label}
            </MenuButton>
        )}
    </>
  )
}

export default MenuList