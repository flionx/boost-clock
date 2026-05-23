"use client"
import { useTimerPlayerStore } from '@/features/timer/store/timer-player';
import { useEffect } from 'react';

const TimerInitializer = () => {
  const restoreFromStorage = useTimerPlayerStore(state => state.restoreFromStorage);

  useEffect(() => {
    restoreFromStorage();
  }, [restoreFromStorage]);

  return null;
};

export default TimerInitializer;