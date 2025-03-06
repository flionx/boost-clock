import { useSelector, useDispatch } from 'react-redux';
import { resetReport, setShowReport } from '../../store/slices/reportSlice';
import useStopPageScroll from '../../hooks/useStopPageScroll';
import '../../css/modal-menu.css'
function Report() {
    
    const {
        today: { workTime, relaxTime, tCompletedTasks },
        timer: { totalWorkTime, totalRelaxTime, pomodoroRounds },
        tasks: { aCompletedTasks, onTime, outOfTime }
    } = useSelector(state => state.report);
    const dispatch = useDispatch();

    useStopPageScroll();

    function calcAndRound(minutes) {
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
                <div className="colum-modal-menu__item item-modal-menu">
                    <p className="item-modal-menu__text">Work time</p>
                    <p className="item-modal-menu__stat">{calcAndRound(workTime)}h</p>
                </div>
                <div className="colum-modal-menu__item item-modal-menu">
                    <p className="item-modal-menu__text">Relax time</p>
                    <p className="item-modal-menu__stat">{calcAndRound(relaxTime)}h</p>
                </div>
                <div className="colum-modal-menu__item item-modal-menu">
                    <p className="item-modal-menu__text">Completed tasks</p>
                    <p className="item-modal-menu__stat">{tCompletedTasks}</p>
                </div>

            </section>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Timer</h4>
                <hr className='column-modal-menu-line'/>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">Total work time</p>
                    <p className="item-modal-menu__text-bg">{calcAndRound(totalWorkTime)}h</p>
                </div>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">Total relax time</p>
                    <p className="item-modal-menu__text-bg">{calcAndRound(totalRelaxTime)}h</p>
                </div>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">Pomodoro rounds</p>
                    <p className="item-modal-menu__text-bg">{pomodoroRounds}</p>
                </div>
            </section>
            <section className="modal-menu__column column-modal-menu">
                <h4 className="column-modal-menu__title">Tasks</h4>
                <hr className='column-modal-menu-line'/>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">Сompleted tasks</p>
                    <p className="item-modal-menu__text-bg">{aCompletedTasks}</p>
                </div>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">On time</p>
                    <p className="item-modal-menu__text-bg">{onTime}</p>
                </div>
                <div className="column-modal-menu__row">
                    <p className="item-modal-menu__text">Out of time</p>
                    <p className="item-modal-menu__text-bg">{outOfTime}</p>
                </div>
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