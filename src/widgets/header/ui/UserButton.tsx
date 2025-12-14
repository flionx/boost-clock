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

const UserButton = () => {
  const user = useAuthStore(state => state.user);
  const setModal = useModalStore(state => state.setModal);

  const saveAndLogout = async () => {
    const user = auth.currentUser;        
    if (!user) return;

    try {            
      const userRef = doc(db, "Users", user.uid);
      const userData = getUserData();
      await setDoc(userRef, userData, { merge: true });
      resetUserData();
      await auth.signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Someting went wrong");
      console.error("Error saving data before exiting:", error);
    }
  };

  const handleLogout = () => {
    setModal("Warning!", "Are you sure you want to log out?", "Log out", saveAndLogout)
  }
  return (
    <MenuButton 
      onClick={handleLogout} 
      href={user ? undefined : "/login"}
      icon={UserIcon} 
    >
        {user ? "Log out" : "Log in"}
    </MenuButton>
  )
}

export default UserButton