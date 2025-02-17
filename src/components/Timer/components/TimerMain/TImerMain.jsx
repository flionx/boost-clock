import { useState, useEffect, useRef, useContext } from "react";
import formatTime from "../../helpers/formatTime.js";
import useMelody from "../../../../hooks/useMelody.js";
import { useDispatch } from "react-redux";
import { setRoundTasks } from "../../../../store/slices/tasksSlice.js";

function TimerMain({ minutes, timerCheck, nowIs }) {

    const dispatch = useDispatch();

    const { hasTimer, setHasTimer } = timerCheck;
    const { nowIsWork, setNowIsWork } = nowIs;
    const [seconds, setSeconds] = useState({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    })
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
                } else {
                    setSeconds((secs) => ({ ...secs, relax: data }));
                    setFormatResult(formatTime(data));
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
        if (seconds.work <= 0 || seconds.relax <= 0) {
            stopTimer();
        }
        setFormatResult(nowIsWork ? formatTime(seconds.work) : formatTime(seconds.relax));

    }, [seconds.work, seconds.relax, nowIsWork])

    useEffect(() => {
        if (!hasTimer) {
            setSeconds({work: minutes.work * 60, 
                        relax: minutes.relax * 60})
        }
    }, [minutes.work, minutes.relax, hasTimer]);

    // Запуск и остановка таймера через Worker
    useEffect(() => {
        if (hasTimer) {
            workerRef.current.postMessage({ action: 'start', seconds, nowIsWork });
        } else {
            workerRef.current.postMessage({ action: 'stop' });
        }
    }, [hasTimer]);

    // конец таймера, смена типа таймера, звук
    function stopTimer() {
        setHasTimer(false);
        setNowIsWork(nowIs => !nowIs);
        setSeconds({ work: minutes.work * 60, 
                    relax: minutes.relax * 60})
        if (nowIsWork) {
            melodyGoRelax.play();
            melodyGoRelax.currentTime = 0;
            dispatch(setRoundTasks())
        } else {
            melodyGoWork.play();
            melodyGoWork.currentTime = 0;
        }
            
    }

    function toggleTimer() {
        setHasTimer(prev => !prev);
    }

    // Сброс таймера до настроек
    function resetTimer() {
        setHasTimer(false);
        if (nowIsWork) {
            setSeconds({...seconds, work: minutes.work * 60})
        } else {
            setSeconds({...seconds, relax: minutes.relax * 60})
        }
        workerRef.current.postMessage({ action: 'reset', seconds: seconds });
    }

    function changeTypeOfTime(type) {
        if (type === 'work') {
            setNowIsWork(prev => prev = true);
        } else {
            setNowIsWork(prev => prev = false);
        }
        resetTimer();
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

            <h2 className="timer__time">{formatResult}</h2>
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