import TimerMain from './components/TimerMain/TImerMain.jsx';
import TimerSettings from './TimerSettings/TimerSettings.jsx';
import { useState, useCallback } from 'react';

function Timer() {

    const [workMin, setWorkMin] = useState(25);
    const [relaxMin, setRelaxMin] = useState(5);
    const [hasTimer, setHasTimer] = useState(false);
    const [nowIsWork, setNowIsWork] = useState(true);

    const callSetWorkMin = useCallback((value) => setWorkMin(value), []);
    const callSetRelaxMin = useCallback((value) => setRelaxMin(value), []);
    const callSetHasTimer = useCallback((value) => setHasTimer(value), []);
    const callSetNowIsWork = useCallback((value) => setNowIsWork(value), []);


    return (
        <>
            <TimerMain 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                timerCheck={{hasTimer, setHasTimer : callSetHasTimer}}
                nowIs = {{nowIsWork, setNowIsWork : callSetNowIsWork}}
            />                
            <TimerSettings 
                work={{workMin, setWorkMin : callSetWorkMin}} 
                relax={{relaxMin, setRelaxMin : callSetRelaxMin}}
                hasTimer={hasTimer}
            />

        </>
    )
}

export default Timer;