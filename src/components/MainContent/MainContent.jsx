import { useCallback, useState, useMemo } from 'react';
import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import {RoundContext, MainTaskContext} from './context/RoundContext.js';
import MainTask from '../MainTask/MainTask.jsx';
import useUpdateStorage from '../../hooks/useUpdateStorage.js';

function MainContent() {

    const [wasRound, setWasRound] = useState(false);
    const [mainTask, setMainTask] = useState(() => storageMainTask('mainTask'));

    const roundContextValue = useMemo(() => ({ wasRound, setWasRound }), [wasRound]);
    const mainTaskContextValue = useMemo(() => ({ mainTask, setMainTask }), [mainTask]);

    function storageMainTask(key) {
        const storage = JSON.parse(localStorage.getItem(key));
        return storage ? storage : {index: null, title: null, hasTask: false};
    }

    useUpdateStorage('mainTask', mainTask, mainTask.hasTask);
    

    return (
        <main className="main">
            <div className="container">
                <RoundContext.Provider value={roundContextValue}>
                    <Timer />
                    <MainTaskContext.Provider value={mainTaskContextValue}>
                        {mainTask.title &&
                        (
                        <MainTask />
                        )}
                        <Tasks />
                    </MainTaskContext.Provider>
                </RoundContext.Provider>
            </div>
        </main>
    )
}

export default MainContent;