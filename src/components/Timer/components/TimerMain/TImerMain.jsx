import { useState, useEffect, useRef } from "react";
import formatTime from "../../../../helpers/formatTime.js";

function TimerMain({ work, relax, timerCheck, nowIs }) {
    // глобальное время в минутах
    const { workMin, setWorkMin } = work;
    const { relaxMin, setRelaxMin } = relax;

    // время в секундах
    const [workTime, setWorkTime] = useState(workMin * 60);
    const [relaxTime, setRelaxTime] = useState(relaxMin * 60);

    const { hasTimer, setHasTimer } = timerCheck;
    const idInterval = useRef(null);

    const { nowIsWork, setNowIsWork } = nowIs;

    const melodyGoWork = document.querySelector('#melodyGoWork');
    const melodyGoRelax = document.querySelector('#melodyGoRelax');
    
    const [formatResult, setFormatResult] = useState(() => formatTime(workTime));

    useEffect(() => {

        // Останавливаем таймер, когда закончилось время
        if (workTime <= 0 || relaxTime <= 0) {
            stopTimer();
        }


        if (nowIsWork) {
            setFormatResult(() => formatTime(workTime));
        } else {
            setFormatResult(() => formatTime(relaxTime));

        }

    }, [workTime, relaxTime, nowIsWork])


    // Обновляем таймер при изменении workMin или relaxMin
    useEffect(() => {
        if (!hasTimer) {
            setWorkTime(workMin * 60);
            setRelaxTime(relaxMin * 60)
        }
    }, [workMin, relaxMin]);


    // Запуск/остановка таймера
    useEffect(() => {
        if (hasTimer) {
            idInterval.current = setInterval(() => {
                if (nowIsWork) {
                    setWorkTime((currTime) => currTime - 1);

                } else {
                    setRelaxTime((currTime) => currTime - 1);
                }
            }, 1000);

        } else {
            clearInterval(idInterval.current);
        }

        // Очистка интервала при размонтировании
        return () => clearInterval(idInterval.current);
    }, [hasTimer]);

    // Остановка таймера, смена типа таймера
    function stopTimer() {
        setHasTimer(false);
        setNowIsWork((nowIs) => !nowIs);
        setWorkTime(workMin * 60);
        setRelaxTime(relaxMin * 60);
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

    // Сброс таймера
    function resetTimer() {
        falseAndDeleteTimer();
        setWorkMin(workMin);
        setRelaxMin(relaxMin);

        if (nowIsWork) {
            setWorkTime(workMin * 60);
        } else {
            setRelaxTime(relaxMin * 60);
        }
    }

    // смена типа времени, сброс таймера
    function changeTypeOfTime(type) {

        if (type === 'work') {
            setNowIsWork(cur => cur = true);
        } else {
            setNowIsWork(cur => cur = false);
        }
        resetTimer();
    }


    function falseAndDeleteTimer() {
        clearInterval(idInterval.current);
        setHasTimer(false);
    }


    return (
        <section className="main__timer timer">
            <div className="timer__top">
                <button 
                    onClick={() => changeTypeOfTime('work')}
                className={nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}>Work</button>
                <span></span>
                <button 
                    onClick={() => changeTypeOfTime('relax')}
                className={!nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}>Break</button>
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
                className="timer__button-reset">Reset</button>

                <button 
                    disabled={!hasTimer}
                    style={hasTimer ? {opacity: 1, cursor: 'pointer'} : {opacity: 0, cursor: 'default'}}
                    onClick={stopTimer} 
                className="timer__button-reset">Skip</button>

            </div>
        
        </section>

        
    );
}

export default TimerMain;