"use client"
import { useTimerSettingsStore } from '@/features/timer/store/timer-settings';
import { useTheme } from 'next-themes';

const useResetSettings = () => {
    const resetSettings = useTimerSettingsStore(state => state.resetSettings);
    const {systemTheme, setTheme} = useTheme();

    const handleResetSettings = () => {
        resetSettings();
        setTheme(systemTheme ?? "dark")
    }
    return handleResetSettings;
}

export default useResetSettings