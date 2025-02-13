import { useContext } from 'react';
import { MainTaskContext } from '../MainContent/context/RoundContext';
import './MainTask.css';

function MainTask() {

    const {mainTask, setMainTask} = useContext(MainTaskContext);

    return (
        <div className="main__task-main">
            <div className="task-main__icon"></div>
            <div className="task-main__title">{mainTask.title}</div>
        </div>
    )
}

export default MainTask;