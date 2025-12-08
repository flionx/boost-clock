import { RowModalMenu, SectionModalMenu } from '@/widgets/modal-menu'
import RowReportValue from './RowReportValue'
import RowReportToday from './RowReportToday'
import { useReportStore } from '../store/report'

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
  return (
    <>
        <SectionModalMenu title="Today" lineUnderTitle={false}>
            <RowReportToday label="Work time" value={`${todayWorkTime}h`} />
            <RowReportToday label="Break time" value={`${todayBreakTime}h`} />
            <RowReportToday label="Completed tasks" value={todayCompletedTasks} />
        </SectionModalMenu>

        <SectionModalMenu title="Timer">
            <RowModalMenu label="Total work time">
                <RowReportValue value={`${totalWorkTime}h`}/>
            </RowModalMenu>
            <RowModalMenu label="Total break time">
                <RowReportValue value={`${totalBreakTime}h`}/>
            </RowModalMenu>
            <RowModalMenu label="Pomodoro rounds">
                <RowReportValue value={pomodoroRounds}/>
            </RowModalMenu>
        </SectionModalMenu>
        
        <SectionModalMenu title="Tasks">
            <RowModalMenu label="Completed Tasks">
                <RowReportValue value={totalCompletedTasks}/>
            </RowModalMenu>
            <RowModalMenu label="On time">
                <RowReportValue value={tasksOnTime}/>
            </RowModalMenu>
            <RowModalMenu label="Out of time">
                <RowReportValue value={tasksOutOfTime}/>
            </RowModalMenu>
        </SectionModalMenu>
    </>
  )
}

export default Report