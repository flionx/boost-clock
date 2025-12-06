"use client"
import { useEffect } from 'react'
import { useTimerPlayerStore } from '@/features/timer/store/timer-player'
import { formatTime } from '../lib/formatTime';

const useDocumentTitleSync = () => {
    const mode = useTimerPlayerStore(state => state.mode);
    const timeLeft = useTimerPlayerStore(state => state.timeLeft);
    const isRunning = useTimerPlayerStore(state => state.isRunning);

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