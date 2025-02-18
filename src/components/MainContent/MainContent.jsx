import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import MainTask from '../MainTask/MainTask.jsx';
import Settings from '../Settings/Settings.jsx'
import { useSelector } from 'react-redux';

function MainContent() {

    const showSettings = useSelector(state => state.settings.showSettings)

    return (
        <main className="main">
            <div className="container">
                <Timer />
                <MainTask/>
                <Tasks />
                {showSettings && (<Settings/>)}
            </div>
        </main>
    )
}

export default MainContent;