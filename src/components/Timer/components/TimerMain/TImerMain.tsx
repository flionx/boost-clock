import { FC, useState} from "react";
import useManageTimer from "../../../../hooks/manage/useManageTimer";
import { IInfo, IMins, TypeTime } from "../../types/types";
import TimerTopButton from "./TimerTopButton";
import TimerBottomButton from "./TimerBottomButton";
interface Props {
    minutes: IMins['minutes'],
    info: IInfo,
}

const TimerMain: FC<Props> = ({ minutes, info }) => {
    const {timerInfo, setTimerInfo} = info;
    const [seconds, setSeconds] = useState<TypeTime>({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    });

    const {stopTimer, resetTimer, toggleTimer, changeTypeOfTime, formatResult, hasLongBreak} = useManageTimer(
        {seconds, setSeconds, minutes, timerInfo, setTimerInfo});

    return (
        <section className="main__timer timer">
            <div className="timer__top">
                <TimerTopButton 
                    onClick={() => changeTypeOfTime('work')} 
                    conditionClass={timerInfo.nowIsWork}>Work
                </TimerTopButton>
                <span></span>
                <TimerTopButton 
                    onClick={() => changeTypeOfTime('relax')} 
                    conditionClass={!timerInfo.nowIsWork}>Break
                </TimerTopButton>
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
                <TimerBottomButton disabled={!timerInfo.hasTimer} style={timerInfo.hasTimer}
                    onClick={resetTimer}>Reset
                </TimerBottomButton>
                <TimerBottomButton disabled={!timerInfo.hasTimer} style={timerInfo.hasTimer}
                    onClick={stopTimer}>Skip
                </TimerBottomButton>
            </div>
        </section>        
    );
}

export default TimerMain;