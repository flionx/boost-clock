import Timer from './Timer.jsx';
import TimerSettings from './TimerSettings.jsx';
import { useState, useCallback } from 'react';

function MainTime() {

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

        <>
            <Timer 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                timerCheck={{hasTimer, setHasTimer : callSetHasTimer}}
                nowIs = {{nowIsWork, setNowIsWork : callSetNowIsWork}}
                // progress = {{showProgress, setShowProgress : callSetShowProgress}}
            />                
            <TimerSettings 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                hasTimer={hasTimer}
                // progress = {{showProgress, setShowProgress : callSetShowProgress}}
            />

        </>


    )
}

export default MainTime;