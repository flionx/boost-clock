import { useState, useEffect, useRef } from "react";
import formatTime from "../../helpers/formatTime.js";
import useMelody from "../../../../hooks/useMelody.js";

function TimerMain({ mins, timerCheck, nowIs }) {

    const {minutes, setMinutes} = mins;
    const { hasTimer, setHasTimer } = timerCheck;
    const { nowIsWork, setNowIsWork } = nowIs;
    
    // переводим минуты в секунды
    const [seconds, setSeconds] = useState({ 
        work: minutes.work * 60, 
        relax: minutes.relax * 60
    })
    const [formatResult, setFormatResult] = useState(() => formatTime(seconds.work));

    const workerRef = useRef(null);  // Ссылка на Web Worker

    // Инициализация Web Worker
    useEffect(() => {
        workerRef.current = new Worker('timer-worker.js');

        // полученное сообщение
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

                // Если время вышло - стоп
                if (data <= 0) {
                    stopTimer();
                }
            }
        };

        // Очистка при размонтировании
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
        // опираемся на тип таймера и форматируем время
        setFormatResult(nowIsWork ? formatTime(seconds.work) : formatTime(seconds.relax));

    }, [seconds.work, seconds.relax, nowIsWork])


    // настройка времени при нажатии кнопок
    useEffect(() => {
        if (!hasTimer) {
            setSeconds({work: minutes.work * 60, 
                        relax: minutes.relax * 60})
        }
    }, [minutes.work, minutes.relax]);

    // Запуск и остановка таймера через Worker
    useEffect(() => {
        if (hasTimer) {
            // Отправляем команду на запуск таймера
            workerRef.current.postMessage({ action: 'start', seconds, nowIsWork });
        } else {
            // Отправляем команду на остановку таймера
            workerRef.current.postMessage({ action: 'stop' });
        }
    }, [hasTimer]);

    // конец таймера, смена типа таймера, звук
    function stopTimer() {
        setHasTimer(false);
        setNowIsWork((nowIs) => !nowIs);
        setSeconds({ work: minutes.work * 60, 
                    relax: minutes.relax * 60})

        if (nowIsWork) {
            melodyGoRelax.play();
            melodyGoRelax.currentTime = 0;
        } else {
            melodyGoWork.play();
            melodyGoWork.currentTime = 0;
        }
            
    }

    // Переключение таймера
    function toggleTimer() {
        setHasTimer((current) => !current);
    }

    // Сброс таймера до настроек
    function resetTimer() {
        setHasTimer(false);
        setMinutes({...minutes})

        if (nowIsWork) {
            setSeconds({...seconds, work: minutes.work * 60})
        } else {
            setSeconds({...seconds, relax: minutes.relax * 60})
        }
        workerRef.current.postMessage({ action: 'reset', seconds: { work: minutes.work * 60, relax: minutes.relax * 60 } });
    }

    // смена типа времени, сброс таймера - при смене типа
    function changeTypeOfTime(type) {
        if (type === 'work') {
            setNowIsWork(cur => cur = true);
        } else {
            setNowIsWork(cur => cur = false);
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