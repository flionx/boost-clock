"use client"
import React, { useEffect } from 'react'
import { initAuthListener } from '../lib/initAuthListener'
interface FirebaseProviderProps {
    children: React.ReactNode
}
const FirebaseProvider: React.FC<FirebaseProviderProps> = ({children}) => {

    useEffect(() => {
        initAuthListener();
    }, [])

  return (
    <>{children}</>
  )
}

export default FirebaseProvider