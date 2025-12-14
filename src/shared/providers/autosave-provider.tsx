"use client"
import useAutoSaveUserData from "@/features/auth/model/useAutoSaveUserData"

const AutoSaveProvider = ({children}: {children: React.ReactNode}) => {
    useAutoSaveUserData();
  return (
    <>{children}</>
  )
}

export default AutoSaveProvider