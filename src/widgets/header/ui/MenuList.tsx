"use client"
import { useModalMenuStore } from '@/shared/store/modal-menu';
import { useReportStore } from '@/features/report/store/report';
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import useResetSettings from '@/features/settings/model/useResetSettings';
import { HEADER_MENU_BUTTONS } from '../constants'
import MenuButton from './MenuButton'

const MenuList = () => {
    const setModal = useModalMenuStore(state => state.setModal);
    const resetReport = useReportStore(state => state.resetReport);
    const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs);
    const resetSettings = useResetSettings();

  return (
    <>
        {HEADER_MENU_BUTTONS.map(m => 
            <MenuButton 
                key={m.label} 
                icon={m.icon}
                onClick={() => setModal(m.label, 
                    m.label === "Settings" ? resetSettings : 
                    m.label === "Report" ? resetReport : null
                )}
                unseenNotifyCount={
                    (m.label === "Achievements" && newUnseenAchievs) ? newUnseenAchievs : undefined
                }
            >
                {m.label}
            </MenuButton>
        )}
    </>
  )
}

export default MenuList