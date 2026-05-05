"use client"
import { useEffect } from 'react'
import { useTimerPlayerStore } from '@/features/timer/store/timer-player'
import { formatTime } from '../lib/formatTime';
import { useTranslations } from 'next-intl';

const useDocumentTitleSync = () => {
  const mode = useTimerPlayerStore(state => state.mode);
  const timeLeft = useTimerPlayerStore(state => state.timeLeft);
  const isRunning = useTimerPlayerStore(state => state.isRunning);
  const t = useTranslations();

  useEffect(() => {
    const modeLabel = mode === 'work' ? t("work") : t("break");
    const timeAndModeLabel = `${formatTime(timeLeft)} - ${modeLabel}`
    if (isRunning) {
      document.title = `${timeAndModeLabel} | BoostClock`;
    } else {
      document.title = `${timeAndModeLabel}(${t("paused")}) | BoostClock`;
      return;
    }
  }, [timeLeft, mode, isRunning])
}

export default useDocumentTitleSync