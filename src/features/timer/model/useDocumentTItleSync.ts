"use client"
import { useEffect } from 'react'
import { useTimerPlayerStore } from '@/shared/store/timer-player'
import { formatTime } from '../lib/formatTime';

const useDocumentTitleSync = () => {
    const {timeLeft, mode, isRunning} = useTimerPlayerStore(state => ({
        timeLeft: state.timeLeft,
        mode: state.mode,
        isRunning: state.isRunning
    }));

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