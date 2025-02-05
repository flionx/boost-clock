import TimerMain from './components/TimerMain/TImerMain.jsx';
import TimerSettings from './TimerSettings/TimerSettings.jsx';
import { useState, useCallback } from 'react';

function Timer() {

    const [minutes, setMinutes] = useState( {work: 25, relax: 5} )
    const [hasTimer, setHasTimer] = useState(false);
    const [nowIsWork, setNowIsWork] = useState(true);

    const callSetMinutes = useCallback((value) => setMinutes(value), []);
    const callSetHasTimer = useCallback((value) => setHasTimer(value), []);
    const callSetNowIsWork = useCallback((value) => setNowIsWork(value), []);


    return (
        <>
            <TimerMain 
                mins={{minutes, setMinutes: callSetMinutes}}
                timerCheck={{hasTimer, setHasTimer : callSetHasTimer}}
                nowIs = {{nowIsWork, setNowIsWork : callSetNowIsWork}}
            />                
            <TimerSettings 
                mins={{minutes, setMinutes: callSetMinutes}}
                hasTimer={hasTimer}
            />

        </>
    )
}

export default Timer;