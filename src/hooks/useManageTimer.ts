import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import formatTime from "../components/Timer/helpers/formatTime";
import { addRoundToBreak, removeRoundsToBreak, setHasLongBreak } from "../store/slices/settingSlice";
import { setRoundTasks } from "../store/slices/tasksSlice";
import { addPomodoroRound, addRelaxTime, addWorkTime } from "../store/slices/reportSlice";
import { setCompleteAchiev, setStepAchiev } from "../store/slices/achievementSlice";
import useMelody from "./useMelody";
import { TSetState } from "../types/global";
import { TTimerInfo, TypeTime } from "../components/Timer/types/types";

interface Props {
    seconds: TypeTime,
    setSeconds: TSetState<TypeTime>,
    minutes: TypeTime,
    timerInfo: TTimerInfo,
    setTimerInfo: TSetState<TTimerInfo>,
}

interface IReportSec {
    sec: number;
    type: 'work' | 'relax';
}

const useManageTimer = ({seconds, setSeconds, minutes, timerInfo, setTimerInfo}: Props) => {
    const [reportSec, setReportSec] = useState<IReportSec>({sec: 0, type: 'work'});
    const [formatResult, setFormatResult] = useState(() => formatTime(seconds.work));

    const dispatch = useAppDispatch();
    const {hasLongBreak, roundsToBreak} = useAppSelector(state => state.settings);
    const {autoToWork, autoToRelax, longBreakInterval, soundOn, 
        repeatSound } = useAppSelector(state => state.settings.mainSettings); //настройки для проверок
    const achievsArray = useAppSelector(state => state.achievement.achievs);
    const report = useAppSelector(state => state.report)
    
    const {melodyGoRelax, melodyGoWork} = useMelody();

    const workerRef = useRef<Worker | null>(null);
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
            workerRef.current && workerRef.current.postMessage({ action: 'start', seconds, nowIsWork: timerInfo.nowIsWork });
            setTimerInfo(c=> ({...c, canChangeMinutes: false}))
        } else {
            workerRef.current && workerRef.current.postMessage({ action: 'stop' });
            if(reportSec.sec > 0) {
                addReportTime();
            }
        }
    }, [timerInfo.hasTimer]);


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

    function resetTimer() {
        setTimerInfo(c=> ({...c, hasTimer: false, canChangeMinutes: true}))
        if (timerInfo.nowIsWork) {
            setSeconds({...seconds, work: minutes.work * 60})
        } else {
            setSeconds({...seconds, relax: minutes.relax * 60})
        }
        workerRef.current && workerRef.current.postMessage({ action: 'reset', seconds: seconds });
    }

    function toggleTimer() {
        setTimerInfo(c=> ({...c, hasTimer: !c.hasTimer}))
    }

    function changeTypeOfTime(type: 'work' | 'relax') {
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

    function checkAchievement(type: string, index: number, reportSec: IReportSec) {
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

    const soundTimeouts = useRef<NodeJS.Timeout[]>([]);

    function playSounds() {
        if (!soundOn) return; 

        const sound = timerInfo.nowIsWork ? melodyGoRelax : melodyGoWork;
        
        soundTimeouts.current.forEach(clearTimeout);
        soundTimeouts.current = [];
    
        sound.currentTime = 0;
        sound.play();
    
        if (repeatSound <= 0) return;
    
        for (let i = 1; i <= repeatSound; i++) {
            const timeoutId: NodeJS.Timeout = setTimeout(() => {
                sound.currentTime = 0;
                sound.play();
            }, i * 2000); 
    
            soundTimeouts.current.push(timeoutId); 
        }
    }

    
    return {stopTimer, resetTimer, toggleTimer, changeTypeOfTime, formatResult, setFormatResult, hasLongBreak}
}

export default useManageTimer