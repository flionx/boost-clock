import { useState, useCallback, FC } from 'react';
import TimerMain from './components/TimerMain/TImerMain';
import TimerSettings from './components/TimerSettings/TimerSettings';
import { TSetState } from '../../types/global';
import { TypeTime, TTimerInfo } from './types/types';

const Timer: FC = () => {
    const [minutes, setMinutes] = useState<TypeTime>( {work: 25, relax: 5} );
    const [timerInfo, setTimerInfo] = useState<TTimerInfo>( {hasTimer: false, nowIsWork: true, canChangeMinutes: true} )
    const callSetMinutes = useCallback<TSetState<TypeTime>>((value) => setMinutes(value), []);
    const callSetTimerInfo = useCallback<TSetState<TTimerInfo>>((value) => setTimerInfo(value), []);

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


