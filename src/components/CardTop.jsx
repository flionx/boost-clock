import { useState, useEffect, useRef } from "react";
import formatTime from "../modules/formatTime";

function CardTop({ work, relax, timerCheck, nowIs, progress }) {
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

    const melody = document.querySelector('#timeout');
    
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
        clearInterval(idInterval.current);
        setHasTimer(false);
        setWorkMin(25);
        setRelaxMin(5);

        if (nowIsWork) {
            setWorkTime(25 * 60);
        } else {
            setWorkTime(5 * 60);
        }
    }


    return (
        <div className="card__top">
            <h2 className="card__top-title">{nowIsWork ? 'Session' : 'You can relax'}</h2>
            <div className="card__current-time">{formatResult}</div>
            <div className="card__buttons">
                <button onClick={toggleTimer}>{hasTimer ? "Stop" : "Start"}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default CardTop;