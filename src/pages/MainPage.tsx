import { useAppSelector } from '../hooks/useRedux';
import Timer from '../components/Timer/Timer'
import MainTask from '../components/MainTask/MainTask';
import Settings from '../components/Settings/Settings';
import Report from '../components/Report/Report'
import Achievements from '../components/Achievements/Achievements';
import Tasks from '../components/Tasks/Tasks';
import Quote from '../components/Quote/Quote'

const MainPage = () => {
    const showSettings = useAppSelector(state => state.settings.showSettings);
    const showReport = useAppSelector(state => state.report.showReport);
    const showAchiev = useAppSelector(state => state.achievement.showAchiev);
    const mainTask = useAppSelector(state => state.mainTask);

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
            <Quote />
        </main>
    )
}

export default MainPage;
