import { FC, useState} from "react";
import useManageTimer from "../../../../hooks/useManageTimer";
interface TimerMainProps {
    minutes: {work: number, relax: number},
    info: {timerInfo: any, setTimerInfo: any}
}

const TimerMain: FC<TimerMainProps> = ({ minutes, info }) => {

    const {timerInfo, setTimerInfo} = info;

    const [seconds, setSeconds] = useState({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    });

    const {stopTimer, resetTimer, toggleTimer, changeTypeOfTime, formatResult, hasLongBreak} = useManageTimer(
        {seconds, setSeconds, minutes, timerInfo, setTimerInfo});

    return (
        <section className="main__timer timer">
            <div className="timer__top">
                <button 
                    onClick={() => changeTypeOfTime('work')}
                    className={timerInfo.nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}
                >Work</button>
                <span></span>
                <button 
                    onClick={() => changeTypeOfTime('relax')}
                    className={!timerInfo.nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}
                >Break</button>
            </div>
            
            <h2 className="timer__time" translate="no">
                {hasLongBreak && (<span className="timer__long-break">Long break</span>)}
                
                {formatResult}
            </h2>
            <button 
            translate="no"
                onClick={toggleTimer} 
                className="timer__button">
                {timerInfo.hasTimer ? "STOP" : "START"}
            </button>
            <div className="timer__bottom-btns">

                <button 
                    disabled={!timerInfo.hasTimer}
                    style={timerInfo.hasTimer ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
                    onClick={resetTimer} 
                    className="timer__button-reset"
                >Reset</button>

                <button 
                    disabled={!timerInfo.hasTimer}
                    style={timerInfo.hasTimer ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
                    onClick={stopTimer} 
                    className="timer__button-reset"
                >Skip</button>

            </div>
        
        </section>

        
    );
}

export default TimerMain;