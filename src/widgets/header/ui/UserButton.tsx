"use client"
import { auth, db } from '@/shared/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useAuthStore } from '@/features/auth/store/auth'
import { useModalStore } from '@/shared/store/modal'
import getUserData from '@/shared/lib/getUserData'
import resetUserData from '@/shared/lib/resetUserData'
import MenuButton from './MenuButton'
import { UserIcon } from '@/shared/ui/icons'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

const UserButton = () => {
  const user = useAuthStore(state => state.user);
  const setModal = useModalStore(state => state.setModal);
  const t = useTranslations();

  const saveAndLogout = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "Users", user.uid);
      const userData = getUserData();
      await setDoc(userRef, userData, { merge: true });
      resetUserData();
      await auth.signOut();
      toast.success(t("succesfullyLoggedOut"));
    } catch (error) {
      toast.error(t("sometingWrong"));
      console.error("Error saving data before exiting:", error);
    }
  };

  const handleLogout = () => {
    setModal(t("warning"), t("sureToLogout"), t("logOut"), saveAndLogout)
  }
  return (
    <MenuButton
      onClick={handleLogout}
      href={user ? undefined : "/login"}
      icon={UserIcon}
    >
      {t(user ? "logOut" : "logIn")}
    </MenuButton>
  )
}

export default UserButton