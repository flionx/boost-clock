import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useReportStore } from '@/features/report/store/report';
import { useTasksStore } from '@/features/tasks/store/tasks';
import { useTimerSettingsStore } from '@/features/timer/store/timer-settings';

const resetUserData = () => {
    useTasksStore.getState().resetStore();
    useAchievementsStore.getState().resetStore();
    useReportStore.getState().resetStore();
    useTimerSettingsStore.getState().resetStore();
    // localStorage.clear();
}

export default resetUserData