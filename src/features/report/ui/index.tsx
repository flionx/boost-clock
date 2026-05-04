import { useReportStore } from '../store/report'
import { RowModalMenu, SectionModalMenu } from '@/widgets/modal-menu'
import RowReportValue from './RowReportValue'
import RowReportToday from './RowReportToday'
import { convertMinsToHourString } from '../lib/convertMinsToHourString'
import { useTranslations } from 'next-intl'

const Report = () => {
  const todayWorkTime = useReportStore(state => state.todayWorkTime);
  const todayBreakTime = useReportStore(state => state.todayBreakTime);
  const todayCompletedTasks = useReportStore(state => state.todayCompletedTasks);
  const totalWorkTime = useReportStore(state => state.totalWorkTime);
  const totalBreakTime = useReportStore(state => state.totalBreakTime);
  const pomodoroRounds = useReportStore(state => state.pomodoroRounds);
  const totalCompletedTasks = useReportStore(state => state.totalCompletedTasks);
  const tasksOnTime = useReportStore(state => state.tasksOnTime);
  const tasksOutOfTime = useReportStore(state => state.tasksOutOfTime);
  const t = useTranslations();

  return (
    <>
      <SectionModalMenu title={t("today")} lineUnderTitle={false}>
        <RowReportToday label={t("workTime")} value={convertMinsToHourString(todayWorkTime, t("h"))} />
        <RowReportToday label={t("breakTime")} value={convertMinsToHourString(todayBreakTime, t("h"))} />
        <RowReportToday label={t("completedTasks")} value={todayCompletedTasks} />
      </SectionModalMenu>

      <SectionModalMenu title={t("timer")}>
        <RowModalMenu label={t("totalWorkTime")}>
          <RowReportValue value={convertMinsToHourString(totalWorkTime, t("h"))} />
        </RowModalMenu>
        <RowModalMenu label={t("totalBreakTime")}>
          <RowReportValue value={convertMinsToHourString(totalBreakTime, t("h"))} />
        </RowModalMenu>
        <RowModalMenu label={t("pomodoroRounds")}>
          <RowReportValue value={pomodoroRounds} />
        </RowModalMenu>
      </SectionModalMenu>

      <SectionModalMenu title={t("tasks")}>
        <RowModalMenu label={t("completedTasks")}>
          <RowReportValue value={totalCompletedTasks} />
        </RowModalMenu>
        <RowModalMenu label={t("tasksOnTime")}>
          <RowReportValue value={tasksOnTime} />
        </RowModalMenu>
        <RowModalMenu label={t("tasksOutTime")}>
          <RowReportValue value={tasksOutOfTime} />
        </RowModalMenu>
      </SectionModalMenu>
    </>
  )
}

export default Report