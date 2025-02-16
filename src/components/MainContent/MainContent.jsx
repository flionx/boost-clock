import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';
import MainTask from '../MainTask/MainTask.jsx';

function MainContent() {
    
    return (
        <main className="main">
            <div className="container">
                <Timer />
                <MainTask/>
                <Tasks />
            </div>
        </main>
    )
}

export default MainContent;