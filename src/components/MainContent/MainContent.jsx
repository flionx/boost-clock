import Tasks from '../Tasks/Tasks.jsx';
import Timer from '../Timer/Timer.jsx';

function MainContent() {
    return (
        <main className="main">
            <div className="container">
                <Timer />
                <Tasks />
            </div>
        </main>
    )
}

export default MainContent;