"use client"
import useAutoSaveUserData from "@/features/auth/model/useAutoSaveUserData"

const InitAutoSave = () => {
  useAutoSaveUserData();
  return null
}

export default InitAutoSave