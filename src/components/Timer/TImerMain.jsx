import { useState, useEffect, useRef } from "react";
import formatTime from "../../helpers/formatTime";

function TimerMain({ work, relax, timerCheck, nowIs, progress }) {
    // глобальное время в минутах
    const { workMin, setWorkMin } = work;
    const { relaxMin, setRelaxMin } = relax;

    // время в секундах
    const [workTime, setWorkTime] = useState(workMin * 60);
    const [relaxTime, setRelaxTime] = useState(relaxMin * 60);

    const { hasTimer, setHasTimer } = timerCheck;
    const idInterval = useRef(null);

    const { nowIsWork, setNowIsWork } = nowIs;
    // const { showProgress, setShowProgress } = progress;

    const melody = document.querySelector('#melody');
    
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

            // Показываем прогресс только при запуске таймера
            // setShowProgress(true);
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
        melody.play();
        melody.currentTime = 0;
        // soundPour.pause();
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
    // пропуск таймера
    function skipTimer() {
        if (nowIsWork) {
            setWorkTime(0);
        } else {
            setRelaxTime(0);
        }
    }

    
    // смена времени на рабочее, сброс таймера
    function changeOnWorkTime() {
        setNowIsWork(cur => cur = true);
        resetTimer();
    }
    
    // смена времени на отдых, сброс таймера
    function changeOnBreakTime() {
        setNowIsWork(cur => cur = false);
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
                    onClick={changeOnWorkTime}
                className={nowIsWork ? "timer__top-btn top-btn--active" : "timer__top-btn"}>Work</button>
                <span></span>
                <button 
                    onClick={changeOnBreakTime}
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