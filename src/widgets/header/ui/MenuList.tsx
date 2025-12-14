"use client"
import { useModalMenuStore } from '@/shared/store/modal-menu';
import { useModalStore } from '@/shared/store/modal';
import { useReportStore } from '@/features/report/store/report';
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useAuthStore } from '@/features/auth/store/auth';
import useResetSettings from '@/features/settings/model/useResetSettings';
import { useRouter } from 'next/navigation';
import { HEADER_MENU_BUTTONS } from '../constants'
import { HeaderMenuButton } from '../types';
import MenuButton from './MenuButton'

const MenuList = () => {
    const setModalMenu = useModalMenuStore(state => state.setModal);
    const setModal = useModalStore(state => state.setModal);
    const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs);
    const resetReport = useReportStore(state => state.resetStore);
    const resetSettings = useResetSettings();

    const user = useAuthStore(state => state.user);
    const router = useRouter();

    const handleClick = (label: HeaderMenuButton['label']) => {
        if ((label === "Achievements" || label === "Report") && !user) {
            setModal("No access", "Please log in to access", "Log in", () => router.push("/login"));
            return;
        }
        setModalMenu(label, label === "Settings" ? resetSettings : 
            label === "Report" ? resetReport : null
        )
    }

  return (
    <>
        {HEADER_MENU_BUTTONS.map(m => 
            <MenuButton 
                key={m.label} 
                icon={m.icon}
                onClick={() => handleClick(m.label)}
                unseenNotifyCount={(m.label === "Achievements" && newUnseenAchievs) ? newUnseenAchievs : undefined}
            >
                {m.label}
            </MenuButton>
        )}
    </>
  )
}

export default MenuList