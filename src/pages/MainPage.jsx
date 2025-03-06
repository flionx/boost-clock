import React from 'react'
import { useSelector } from 'react-redux';
import Timer from '../components/Timer/Timer'
import MainTask from '../components/MainTask/MainTask';
import Settings from '../components/Settings/Settings';
import Achievements from '../components/Achievements/Achievements';
import Tasks from '../components/Tasks/Tasks';
import Quote from '../components/Quote/Quote'
const MainPage = () => {

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
            <Quote />
        </main>
    )
}

export default MainPage;
