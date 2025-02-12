import { useCallback, useState } from 'react';
import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import RoundContext from './context/RoundContext.js';

function MainContent() {

    const [wasRound, setWasRound] = useState(false);

    const callSetWasRound = useCallback((value) => setWasRound(value), []);

    return (
        <main className="main">
            <div className="container">
                <RoundContext.Provider value={{ wasRound, setWasRound: callSetWasRound }}>
                    <Timer />
                    <Tasks />
                </RoundContext.Provider>
            </div>
        </main>
    )
}

export default MainContent;