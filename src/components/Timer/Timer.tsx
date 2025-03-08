import TimerMain from './components/TimerMain/TImerMain';
import TimerSettings from './components/TimerSettings/TimerSettings';
import { useState, useCallback, FC } from 'react';

export interface IMinutes {
    work: number,
    relax: number,
}
export interface ITimerInfo {
    hasTimer: boolean,
    nowIsWork: boolean,
    canChangeMinutes: boolean,
}

const Timer: FC = () => {
    const [minutes, setMinutes] = useState( {work: 25, relax: 5} );
    const [timerInfo, setTimerInfo] = useState({hasTimer: false, nowIsWork: true, canChangeMinutes: true})
    const callSetMinutes = useCallback((value: IMinutes) => setMinutes(value), []);
    const callSetTimerInfo = useCallback((value: ITimerInfo) => setTimerInfo(value), []);

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


