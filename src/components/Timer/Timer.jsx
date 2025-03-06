import TimerMain from './components/TimerMain/TImerMain.jsx';
import TimerSettings from './components/TimerSettings/TimerSettings.jsx';
import { useState, useCallback } from 'react';

function Timer() {
    const [minutes, setMinutes] = useState( {work: 25, relax: 5} );
    const [timerInfo, setTimerInfo] = useState({hasTimer: false, nowIsWork: true, canChangeMinutes: true})
    const callSetMinutes = useCallback((value) => setMinutes(value), []);
    const callSetTimerInfo = useCallback((value) => setTimerInfo(value), []);

    return (
        <>
            <TimerMain 
                minutes={minutes}
                info={{timerInfo, setTimerInfo: callSetTimerInfo}}
            />  
            <TimerSettings 
                mins={{minutes, setMinutes: callSetMinutes}}
                info={{timerInfo, setTimerInfo: callSetTimerInfo}}
            />
        </>
    )
}

export default Timer;


