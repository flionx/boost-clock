"use client"
import { useEffect } from 'react'

const useTimerRunning = (
    isRunning: boolean,
    tick: VoidFunction
) => {
    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => tick(), 1000);
        return () => clearInterval(interval)
    }, [isRunning])
}

export default useTimerRunning