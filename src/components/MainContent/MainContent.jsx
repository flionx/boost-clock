import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import MainTask from '../MainTask/MainTask.jsx';
import Settings from '../Settings/Settings.jsx'
import { useSelector } from 'react-redux';
import Report from '../Report/Report.jsx';
import Achievements from '../Achievements/Achievements.jsx';

function MainContent() {

    const showSettings = useSelector(state => state.settings.showSettings);
    const showReport = useSelector(state => state.report.showReport);
    const showAchiev = useSelector(state => state.achievement.showAchiev);
    const mainTask = useSelector(state => state.mainTask);

    return (
        <main className="main">
            <div className="container">
                <Timer />
                {mainTask.title && <MainTask />}
                <Tasks />
                {showSettings && (<Settings />)}
                {showReport && (<Report />)}
                {showAchiev && (<Achievements />)}
            </div>
        </main>
    )
}

export default MainContent;