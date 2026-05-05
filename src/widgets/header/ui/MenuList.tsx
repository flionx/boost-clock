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
import { useTranslations } from 'next-intl';

const MenuList = () => {
  const setModalMenu = useModalMenuStore(state => state.setModal);
  const setModal = useModalStore(state => state.setModal);
  const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs);
  const resetReport = useReportStore(state => state.resetStore);
  const resetSettings = useResetSettings();

  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const t = useTranslations();

  const handleClick = (label: HeaderMenuButton['label']) => {
    if ((label === "achievements" || label === "report") && !user) {
      setModal(t("noAccess"), t("loginToAccess"), t("logIn"), () => router.push("/login"));
      return;
    }
    setModalMenu(label, label === "settings" ? resetSettings :
      label === "report" ? resetReport : null
    )
  }

  return (
    <>
      {HEADER_MENU_BUTTONS.map(m =>
        <MenuButton
          key={m.label}
          icon={m.icon}
          onClick={() => handleClick(m.label)}
          unseenNotifyCount={(m.label === "achievements" && newUnseenAchievs) ? newUnseenAchievs : undefined}
        >
          {t(m.label)}
        </MenuButton>
      )}
    </>
  )
}

export default MenuList