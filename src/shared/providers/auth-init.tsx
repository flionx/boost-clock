"use client"
import { useEffect } from 'react'
import { initAuthListener } from '../lib/initAuthListener'

const InitAuth = () => {
  useEffect(() => {
    initAuthListener();
  }, [])
  return null;
}

export default InitAuth