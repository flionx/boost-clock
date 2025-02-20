import { useState, useEffect, useRef } from "react";
import formatTime from "../../helpers/formatTime.js";
import useMelody from "../../../../hooks/useMelody.js";
import { useDispatch, useSelector} from "react-redux";
import { setRoundTasks } from "../../../../store/slices/tasksSlice.js";
import { addRoundToBreak, removeRoundsToBreak, setHasLongBreak } from "../../../../store/slices/settingSlice.js";
import { addPomodoroRound, addRelaxTime, addWorkTime } from "../../../../store/slices/reportSlice.js";

function TimerMain({ minutes, info }) {

    const [seconds, setSeconds] = useState({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    })    
    const [reportSec, setReportSec] = useState(0);
    const {timerInfo, setTimerInfo} = info;
    const {nowIsWork, hasTimer, canChangeMinutes} = timerInfo

    const dispatch = useDispatch();

    const {autoToWork, autoToRelax, longBreakInterval, soundOn, 
            repeatSound } = useSelector(state => state.settings.mainSettings);
    const {hasLongBreak, roundsToBreak} = useSelector(state => state.settings);

    const [formatResult, setFormatResult] = useState(() => formatTime(seconds.work));

    const workerRef = useRef(null);

    useEffect(() => {
        workerRef.current = new Worker('timer-worker.js');

        workerRef.current.onmessage = (event) => {
            const { action, data } = event.data; 

            if (action === 'updateTime') {
                if (nowIsWork) {
                    setSeconds((secs) => ({ ...secs, work: data }));
                    setFormatResult(formatTime(data));
                    setReportSec(sec => sec + 1);
                } else {
                    setSeconds((secs) => ({ ...secs, relax: data }));
                    setFormatResult(formatTime(data));
                    setReportSec(sec => sec + 1);
                }
                // время вышло - стоп
                if (data <= 0) {
                    stopTimer();
                }
            }
        };

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, [nowIsWork]);

    // обращается к мелодиям и устанавливает громкость
    const {melodyGoWork, melodyGoRelax} = useMelody();

    useEffect(() => {
        setFormatResult(nowIsWork ? formatTime(seconds.work) : formatTime(seconds.relax));
    }, [seconds.work, seconds.relax, nowIsWork])

    useEffect(() => {
        if (canChangeMinutes) {
            setSeconds({work: minutes.work * 60, 
                        relax: minutes.relax * 60})                        
        }
    }, [minutes.work, minutes.relax, canChangeMinutes]);

    // Запуск и остановка таймера через Worker
    useEffect(() => {
        if (hasTimer) {
            workerRef.current.postMessage({ action: 'start', seconds, nowIsWork });
            setTimerInfo(c=> ({...c, canChangeMinutes: false}))
        } else {
            workerRef.current.postMessage({ action: 'stop' });
        }
    }, [hasTimer]);

    const soundTimeouts = useRef([]);

    function playSounds() {
        if (!soundOn) return; 

        const sound = nowIsWork ? melodyGoRelax : melodyGoWork;
        
        soundTimeouts.current.forEach(clearTimeout);
        soundTimeouts.current = [];
    
        sound.currentTime = 0;
        sound.play();
    
        if (repeatSound <= 0) return;
    
        for (let i = 1; i <= repeatSound; i++) {
            const timeoutId = setTimeout(() => {
                sound.currentTime = 0;
                sound.play();
            }, i * 2000); 
    
            soundTimeouts.current.push(timeoutId); 
        }
    }

    function checkAutoSwitch() {
        if (nowIsWork && autoToRelax) {
            setTimeout(() => {
                setTimerInfo(c=> ({...c, hasTimer: true}))
            }, 1000)
        }
        if (!nowIsWork && autoToWork) {
            setTimeout(() => {
                setTimerInfo(c=> ({...c, hasTimer: true}))
            }, 1000)
        }
    }

    function calcLongBreak() {
        if (nowIsWork && roundsToBreak < longBreakInterval) {   
            dispatch(addRoundToBreak())
        } 
        if (nowIsWork && roundsToBreak + 1 == longBreakInterval) {
            dispatch(setHasLongBreak(true))
            dispatch(removeRoundsToBreak());
        }
    }

    function addReportTime() {
        if(nowIsWork) {
            dispatch(addWorkTime(reportSec));
        } else {
            dispatch(addRelaxTime(reportSec));
        }
        setReportSec(0);
    }
    // конец таймера, смена типа таймера, звук
    function stopTimer() {
        if (hasLongBreak) {
            dispatch(setHasLongBreak(false))
        }
        setTimerInfo(c => ({hasTimer: false, nowIsWork: !c.nowIsWork, canChangeMinutes: true}))
        addReportTime()
        playSounds();
        checkAutoSwitch();
        calcLongBreak();
        if (nowIsWork) {
            dispatch(setRoundTasks());
            dispatch(addPomodoroRound());
        }
    }

    function toggleTimer() {
        setTimerInfo(c=> ({...c, hasTimer: !c.hasTimer}))
        addReportTime();
    }

    // Сброс таймера до настроек
    function resetTimer() {
        setTimerInfo(c=> ({...c, hasTimer: false, canChangeMinutes: true}))
        if (nowIsWork) {
            setSeconds({...seconds, work: minutes.work * 60})
        } else {
            setSeconds({...seconds, relax: minutes.relax * 60})
        }
        addReportTime()
        workerRef.current.postMessage({ action: 'reset', seconds: seconds });
    }

    function changeTypeOfTime(type) {
        if (type === 'work') {
            setTimerInfo(c=> ({...c, nowIsWork: true}))
        } else {
            setTimerInfo(c=> ({...c, nowIsWork: false}))
        }
        resetTimer();
        addReportTime();
        if (hasLongBreak) {
            dispatch(setHasLongBreak(false))
        }
    }

    return (
        <section className="main__timer timer">
            <div className="timer__top">
                <button 
                    onClick={() => changeTypeOfTime('work')}
                    className={nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}
                >Work</button>
                <span></span>
                <button 
                    onClick={() => changeTypeOfTime('relax')}
                    className={!nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}
                >Break</button>
            </div>
            
            <h2 className="timer__time">
                {hasLongBreak && (<span className="timer__long-break">Long break</span>)}
                
                {formatResult}
            </h2>
            <button 
                onClick={toggleTimer} 
                className="timer__button">
                {hasTimer ? "STOP" : "START"}
            </button>
            <div className="timer__bottom-btns">

                <button 
                    disabled={!hasTimer}
                    style={hasTimer ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
                    onClick={resetTimer} 
                    className="timer__button-reset"
                >Reset</button>

                <button 
                    disabled={!hasTimer}
                    style={hasTimer ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
                    onClick={stopTimer} 
                    className="timer__button-reset"
                >Skip</button>

            </div>
        
        </section>

        
    );
}

export default TimerMain;