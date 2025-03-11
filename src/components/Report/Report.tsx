import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { resetReport, setShowReport } from '../../store/slices/reportSlice';
import useStopPageScroll from '../../hooks/useStopPageScroll';
import '../../css/modal-menu.css'
import TodayRowReport from './components/TodayRowReport';
import BasicRowReport from './components/BasicRowReport';
const Report = () => {
    const {
        today: { workTime, relaxTime, tCompletedTasks },
        timer: { totalWorkTime, totalRelaxTime, pomodoroRounds },
        tasks: { aCompletedTasks, onTime, outOfTime }
    } = useAppSelector(state => state.report);
    const dispatch = useAppDispatch();

    useStopPageScroll();

    function calcAndRound(minutes: number): number {
        const hours = minutes / 60;
        const result = Number(hours.toFixed(1))        
        return result;
    } 

    function hideReport() {
        dispatch(setShowReport(false));
    }
    function resetStatsReport() {
        dispatch(resetReport())
    }

    return (
        <div
        onClick={hideReport}
        className="modal-menu__bg">

        <section 
        onClick={(e) => e.stopPropagation()}
        className="modal-menu">
            <div 
            onClick={(e) => {
                e.stopPropagation();
                hideReport()
            }}
            className="modal-menu__close"></div>
            <h3 className="modal-menu__title">Report</h3>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Today</h4>
                <TodayRowReport text='Work time'>{calcAndRound(workTime)}h</TodayRowReport>
                <TodayRowReport text='Relax time'>{calcAndRound(relaxTime)}h</TodayRowReport>
                <TodayRowReport text='Completed tasks'>{tCompletedTasks}</TodayRowReport>
            </section>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Timer</h4>
                <hr className='column-modal-menu-line'/>
                <BasicRowReport text='Total work time'>{calcAndRound(totalWorkTime)}h</BasicRowReport>
                <BasicRowReport text='Total relax time'>{calcAndRound(totalRelaxTime)}h</BasicRowReport>
                <BasicRowReport text='Pomodoro rounds'>{pomodoroRounds}</BasicRowReport>
            </section>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Tasks</h4>
                <hr className='column-modal-menu-line'/>
                <BasicRowReport text='Сompleted tasks'>{aCompletedTasks}</BasicRowReport>
                <BasicRowReport text='On time'>{onTime}</BasicRowReport>
                <BasicRowReport text='Out of time'>{outOfTime}</BasicRowReport>
            </section>
            <div className="modal-menu__btns">
                <button onClick={resetStatsReport}>Reset</button>
                {/* <button>Download</button> */}
            </div>
        </section>
        </div>
    )
}

export default Report;