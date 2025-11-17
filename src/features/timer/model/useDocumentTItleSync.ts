"use client"
import { useTimerPlayerStore } from '@/shared/store/timer-player'
import { useEffect } from 'react'
import { formatTime } from '../lib/formatTime';

const useDocumentTitleSync = () => {
    const {timeLeft, mode, isRunning} = useTimerPlayerStore();

    useEffect(() => {        
        const modeLabel = mode === 'work' ? "Work" : "Break";
        const timeAndModeLabel = `${formatTime(timeLeft)} - ${modeLabel} time`
        if (isRunning) {
            document.title = `${timeAndModeLabel} | BoostClock`;
        } else {
            document.title = `${timeAndModeLabel} - Paused | BoostClock`;
            return;
        }
    }, [timeLeft, mode, isRunning])
}

export default useDocumentTitleSync