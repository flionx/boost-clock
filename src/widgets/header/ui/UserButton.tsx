"use client"
import { useCallback, useState } from 'react'
import MenuButton from './MenuButton'
import { UserIcon } from '@/shared/ui/icons'

const UserButton = () => {
    const [isAuth, setIsAuth] = useState(false);
    const toggleAuth = useCallback(() => setIsAuth(c => !c), [])
  return (
    <MenuButton icon={UserIcon} onClick={toggleAuth}>
        {isAuth ? "Log out" : "Log in"}
    </MenuButton>
  )
}

export default UserButton