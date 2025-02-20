import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import MainTask from '../MainTask/MainTask.jsx';
import Settings from '../Settings/Settings.jsx'
import { useSelector } from 'react-redux';
import Report from '../Report/Report.jsx';

function MainContent() {

    const showSettings = useSelector(state => state.settings.showSettings);
    const showReport = useSelector(state => state.report.showReport)
    return (
        <main className="main">
            <div className="container">
                <Timer />
                <MainTask/>
                <Tasks />
                {showSettings && (<Settings/>)}
                {showReport && (<Report />)}
            </div>
        </main>
    )
}

export default MainContent;