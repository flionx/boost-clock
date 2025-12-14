import { useTasksStore } from '@/features/tasks/store/tasks';
import { useAchievementsStore } from '@/features/achievements/store/achievements';
import { useReportStore } from '@/features/report/store/report';
import { useTimerSettingsStore } from '@/features/timer/store/timer-settings';
import { UserData } from '@/shared/types/user-data';

const getUserData = (): UserData => {
  const tasks = useTasksStore.getState();
  const achievements = useAchievementsStore.getState();
  const report = useReportStore.getState();
  const timer = useTimerSettingsStore.getState();

  return {
    tasks: {
      list: tasks.list,
      showCompletedTasks: tasks.showCompletedTasks,
    },
    achievements: {
      achievements: achievements.list.map(({ id, step }) => ({ id, step })),
      newUnseenAchievs: achievements.newUnseenAchievs,
    },
    report: {
      date: report.date,
      todayWorkTime: report.todayWorkTime,
      todayBreakTime: report.todayBreakTime,
      todayCompletedTasks: report.todayCompletedTasks,
      totalWorkTime: report.totalWorkTime,
      totalBreakTime: report.totalBreakTime,
      pomodoroRounds: report.pomodoroRounds,
      totalCompletedTasks: report.totalCompletedTasks,
      tasksOnTime: report.tasksOnTime,
      tasksOutOfTime: report.tasksOutOfTime,
    },
    timer: {
      workDuration: timer.workDuration,
      breakDuration: timer.breakDuration,
      longBreakDuration: timer.longBreakDuration,
      longBreakInterval: timer.longBreakInterval,
      autoSwitchTo: timer.autoSwitchTo,
      soundEnabled: timer.soundEnabled,
      soundCountRepeat: timer.soundCountRepeat,
    },
  };
};

export default getUserData;