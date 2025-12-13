"use client"
import { auth, db } from '@/shared/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useAuthStore } from '@/features/auth/store/auth'
import { useModalWarningStore } from '@/shared/store/modal-warning'
import { getUserData } from '@/shared/lib/getUserData'
import MenuButton from './MenuButton'
import { UserIcon } from '@/shared/ui/icons'
import toast from 'react-hot-toast'

const UserButton = () => {
  const user = useAuthStore(state => state.user);
  const setModal = useModalWarningStore(state => state.setModal);

  const saveAndLogout = async () => {
    const user = auth.currentUser;        
    if (!user) return;

    try {            
      const userRef = doc(db, "Users", user.uid);
      const userData = getUserData();
      await setDoc(userRef, userData, { merge: true });
      // todo: reset zustand and localstorage
      // resetStateToDefault();
      await auth.signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Error saving data before exiting:", error);
    }
  };

  const handleLogout = () => {
    setModal("Are you sure you want to log out?", "Log out", saveAndLogout)
  }
  return (
    <MenuButton 
      onClick={handleLogout} 
      href={user ? undefined : "/auth/login"}
      icon={UserIcon} 
    >
        {user ? "Log out" : "Log in"}
    </MenuButton>
  )
}

export default UserButton