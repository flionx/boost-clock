import CardTop from "./CardTop"
import CardBottom from "./CardBottom"
import { useCallback, useState } from "react";

export default function Card() {
    const [workMin, setWorkMin] = useState(25);
    const [relaxMin, setRelaxMin] = useState(5);
    const [hasTimer, setHasTimer] = useState(false);
    const [nowIsWork, setNowIsWork] = useState(true);

    // const [showProgress, setShowProgress] = useState(false)

    const callSetWorkMin = useCallback((value) => setWorkMin(value), []);
    const callSetRelaxMin = useCallback((value) => setRelaxMin(value), []);
    const callSetHasTimer = useCallback((value) => setHasTimer(value), []);
    const callSetNowIsWork = useCallback((value) => setNowIsWork(value), []);
    // const callSetShowProgress = useCallback((value) => setShowProgress(value), []);

    return (
        <div className="card">
            <CardTop 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                timerCheck={{hasTimer, setHasTimer : callSetHasTimer}}
                nowIs = {{nowIsWork, setNowIsWork : callSetNowIsWork}}
                // progress = {{showProgress, setShowProgress : callSetShowProgress}}
            />
            <CardBottom 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                hasTimer={hasTimer}
                // progress = {{showProgress, setShowProgress : callSetShowProgress}}
            />


      </div>
    )
}



// import { useState, useEffect, useRef, useMemo } from "react";
// import formatTime from "../modules/formatTime";

// function CardTop({ work, relax, timerCheck, nowIs, progress }) {
//     // глобальное время в минутах
//     const { workMin, setWorkMin } = work;
//     const { relaxMin, setRelaxMin } = relax;

//     // время в секундах
//     const [workTime, setWorkTime] = useState(workMin * 60);
//     const [relaxTime, setRelaxTime] = useState(relaxMin * 60);

//     const { hasTimer, setHasTimer } = timerCheck;
//     const idInterval = useRef(null);

//     const { nowIsWork, setNowIsWork } = nowIs;
//     // const { showProgress, setShowProgress } = progress;

//     // Обновляем таймер при изменении workMin или relaxMin
//     useEffect(() => {
//         if (!hasTimer) {
//             setWorkTime(workMin * 60);
//             // если сейчас релакс, то можем менять время
//             if (!nowIsWork) {
//                 setWorkTime(relaxMin * 60)
//             } else {
//                 setRelaxTime(relaxMin * 60)
//             }

//         }
//     }, [workMin, relaxMin]);

//     // Останавливаем таймер, когда закончилось время
//     useEffect(() => {
//         if (workTime <= 0 && hasTimer) {
//             stopTimer();
//             setWorkTime(relaxTime)
//         }
//     }, [workTime, hasTimer]);

//     // Запуск/остановка таймера
//     useEffect(() => {
//         if (hasTimer) {
//             idInterval.current = setInterval(() => {
//                 setWorkTime((currTime) => currTime - 1);
//             }, 1000);

//             // Показываем прогресс только при запуске таймера
//             // setShowProgress(true);
//         } else {
//             clearInterval(idInterval.current);
//         }

//         // Очистка интервала при размонтировании
//         return () => clearInterval(idInterval.current);
//     }, [hasTimer]);

//     // Остановка таймера, смена типа таймера
//     function stopTimer() {
//         setHasTimer(false);
//         setNowIsWork((nowIs) => !nowIs);
//     }

//     // Переключение таймера
//     function toggleTimer() {
//         setHasTimer((current) => !current);
//     }

//     // Сброс таймера
//     function resetTimer() {
//         clearInterval(idInterval.current);
//         setHasTimer(false);
//         setWorkMin(25);
//         setRelaxMin(5);
        
//         if (nowIsWork) {
//             setWorkTime(25 * 60);
//         } else {
//             setWorkTime(5 * 60);
//         }
//     }

//     // Форматирование времени
//     const formatResult = useMemo(() => {
//         return formatTime(workTime);
//     }, [workTime]);

//     return (
//         <div className="card__top">
//             <h2 className="card__top-title">{nowIsWork ? 'Session' : 'You can relax'}</h2>
//             <div className="card__current-time">{formatResult}</div>
//             <div className="card__buttons">
//                 <button onClick={toggleTimer}>{hasTimer ? "Stop" : "Start"}</button>
//                 <button onClick={resetTimer}>Reset</button>
//             </div>
//         </div>
//     );
// }

// export default CardTop;