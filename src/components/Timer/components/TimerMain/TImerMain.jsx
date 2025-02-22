import { useState, useEffect, useRef } from "react";
import formatTime from "../../helpers/formatTime.js";
import useMelody from "../../../../hooks/useMelody.js";
import { useDispatch, useSelector} from "react-redux";
import { setRoundTasks } from "../../../../store/slices/tasksSlice.js";
import { addRoundToBreak, removeRoundsToBreak, setHasLongBreak } from "../../../../store/slices/settingSlice.js";
import { addPomodoroRound, addRelaxTime, addWorkTime } from "../../../../store/slices/reportSlice.js";
import { setCompleteAchiev, setStepAchiev } from "../../../../store/slices/achievementSlice.js";

function TimerMain({ minutes, info }) {

    const {timerInfo, setTimerInfo} = info;

    const [seconds, setSeconds] = useState({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    });

    const [formatResult, setFormatResult] = useState(() => formatTime(seconds.work));
    const [reportSec, setReportSec] = useState({sec: 0, type: 'work'});

    const dispatch = useDispatch();

    const {autoToWork, autoToRelax, longBreakInterval, soundOn, 
        repeatSound } = useSelector(state => state.settings.mainSettings); //настройки для проверок

    const {hasLongBreak, roundsToBreak} = useSelector(state => state.settings);
    const achievsArray = useSelector(state => state.achievement.achievs);
    const report = useSelector(state => state.report); // для расчета времени достижения в checkAchievement

    const workerRef = useRef(null);

    useEffect(() => {
        workerRef.current = new Worker('timer-worker.js');

        workerRef.current.onmessage = (event) => {
            const { action, data } = event.data; 

            if (action === 'updateTime') {
                setFormatResult(formatTime(data));

                if (timerInfo.nowIsWork) {
                    setSeconds((secs) => ({ ...secs, work: data }));
                    setReportSec(prev => ({sec: prev.sec + 1, type: 'work'}));
                } else {
                    setSeconds((secs) => ({ ...secs, relax: data }));
                    setReportSec(prev => ({sec: prev.sec + 1, type: 'relax'}));
                }

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
    }, [timerInfo.nowIsWork]);

    // обращается к мелодиям и устанавливает громкость
    const {melodyGoWork, melodyGoRelax} = useMelody();

    useEffect(() => {
        setFormatResult(timerInfo.nowIsWork ? formatTime(seconds.work) : formatTime(seconds.relax));
    }, [seconds.work, seconds.relax, timerInfo.nowIsWork])

    useEffect(() => {
        if (timerInfo.canChangeMinutes) {
            setSeconds({work: minutes.work * 60, 
                        relax: minutes.relax * 60})                        
        }
    }, [minutes.work, minutes.relax, timerInfo.canChangeMinutes]);

    // Запуск и остановка таймера через Worker
    useEffect(() => {
        if (timerInfo.hasTimer) {
            workerRef.current.postMessage({ action: 'start', seconds, nowIsWork: timerInfo.nowIsWork });
            setTimerInfo(c=> ({...c, canChangeMinutes: false}))
        } else {
            workerRef.current.postMessage({ action: 'stop' });
            if(reportSec.sec > 0) {
                addReportTime();
            }
        }
    }, [timerInfo.hasTimer]);

    const soundTimeouts = useRef([]);

    function playSounds() {
        if (!soundOn) return; 

        const sound = timerInfo.nowIsWork ? melodyGoRelax : melodyGoWork;
        
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
        if (timerInfo.nowIsWork && autoToRelax) {
            setTimeout(() => {
                setTimerInfo(c=> ({...c, hasTimer: true}))
            }, 1000)
        }
        if (!timerInfo.nowIsWork && autoToWork) {
            setTimeout(() => {
                setTimerInfo(c=> ({...c, hasTimer: true}))
            }, 1000)
        }
    }

    function calcLongBreak() {
        if (timerInfo.nowIsWork && roundsToBreak < longBreakInterval) {   
            dispatch(addRoundToBreak())
        } 
        if (timerInfo.nowIsWork && roundsToBreak + 1 == longBreakInterval) {
            dispatch(setHasLongBreak(true))
            dispatch(removeRoundsToBreak());
        }
    }

    function addReportTime() {                
        if (reportSec.type == 'work') {
            dispatch(addWorkTime(reportSec.sec));
            checkAchievement("In focus", 4, reportSec);
            setReportSec({sec: 0, type: 'work'});
        } else {
            dispatch(addRelaxTime(reportSec.sec));
            checkAchievement("Coffee time", 5, reportSec);
            setReportSec({sec: 0, type: 'relax'});
        }
    }

    function checkAchievement(type, index, reportSec) {
        const reportMins = reportSec.sec / 60;
        const totalTime = report.timer[reportSec.type == 'work' ? "totalWorkTime" : "totalRelaxTime"] + reportMins;
        const prevTime = totalTime - reportMins;
    
        const hours = Math.floor(totalTime / 60);
        if (hours > 0 && hours > Math.floor((prevTime) / 60)) { 
            if (achievsArray[index].step < achievsArray[index].max) {
                if (achievsArray[index].step + 1 === achievsArray[index].max) {
                    dispatch(setCompleteAchiev(type));
                }
                dispatch(setStepAchiev(type));
            }
        }
    }
    // конец таймера, смена типа таймера, звук
    function stopTimer() {
        if (hasLongBreak) {
            dispatch(setHasLongBreak(false))
        }
        setTimerInfo(c => ({hasTimer: false, nowIsWork: !c.nowIsWork, canChangeMinutes: true}))
        playSounds();
        checkAutoSwitch();
        calcLongBreak();
        if (timerInfo.nowIsWork) {
            dispatch(setRoundTasks());
            dispatch(addPomodoroRound());
            // достижение 1
            if (achievsArray[0].step < achievsArray[0].max) {                
                dispatch(setStepAchiev("I'm new"))
                dispatch(setCompleteAchiev("I'm new"))
            }
            // достижение 2
            if (achievsArray[2].step < achievsArray[2].max) {                
                if (achievsArray[2].step + 1 == achievsArray[2].max) {
                    dispatch(setCompleteAchiev("Productive"))
                }
                dispatch(setStepAchiev("Productive"))
            }
        }
    }

    function toggleTimer() {
        setTimerInfo(c=> ({...c, hasTimer: !c.hasTimer}))
    }

    // Сброс таймера до настроек
    function resetTimer() {
        setTimerInfo(c=> ({...c, hasTimer: false, canChangeMinutes: true}))
        if (timerInfo.nowIsWork) {
            setSeconds({...seconds, work: minutes.work * 60})
        } else {
            setSeconds({...seconds, relax: minutes.relax * 60})
        }
        workerRef.current.postMessage({ action: 'reset', seconds: seconds });
    }

    function changeTypeOfTime(type) {
        if (type === 'work') {
            setTimerInfo(c=> ({...c, nowIsWork: true}))
        } else {
            setTimerInfo(c=> ({...c, nowIsWork: false}))
        }
        resetTimer();
        if (hasLongBreak) {
            dispatch(setHasLongBreak(false))
        }
    }

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
            
            <h2 className="timer__time">
                {hasLongBreak && (<span className="timer__long-break">Long break</span>)}
                
                {formatResult}
            </h2>
            <button 
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