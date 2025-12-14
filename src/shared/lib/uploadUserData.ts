import { useTasksStore } from '@/features/tasks/store/tasks';
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useReportStore } from '@/features/report/store/report';
import { useTimerSettingsStore } from '@/features/timer/store/timer-settings';
import { UserData } from '../types/user-data';

const uploadUserData = (data: UserData) => {
    useTasksStore.getState().uploadUserData(data.tasks);
    useAchievementsStore.getState().uploadUserData(data.achievements);
    useReportStore.getState().uploadUserData(data.report);
    useTimerSettingsStore.getState().uploadUserData(data.timer);
}

export default uploadUserData