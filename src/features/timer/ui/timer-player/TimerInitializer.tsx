"use client"
import { useTimerPlayerStore } from '@/features/timer/store/timer-player';
import { useEffect } from 'react';

const TimerInitializer = () => {
    const restoreFromStorage = useTimerPlayerStore(state => state.restoreFromStorage);

    useEffect(() => {
        restoreFromStorage();

        // const requestNotificationPermission = async () => {
        //     if ("Notification" in window && Notification.permission === "default") {
        //         try {
        //             await Notification.requestPermission();
        //         } catch (error) {
        //             console.log("Notification permission request failed:", error);
        //         }
        //     }
        // };

        // const handleFirstInteraction = () => {
        //     requestNotificationPermission();
        //     document.removeEventListener('click', handleFirstInteraction);
        // };

        // document.addEventListener('click', handleFirstInteraction);

        // return () => {
        //     document.removeEventListener('click', handleFirstInteraction);
        // };
    }, [restoreFromStorage]);

    return null;
};

export default TimerInitializer;