import './MainTask.css';
import useUpdateStorage from '../../hooks/useUpdateStorage';
import { useSelector } from 'react-redux';

function MainTask() {    

    const mainTask = useSelector(state => state.mainTask);

    useUpdateStorage('mainTask', mainTask);
    
    return (
        <div className="main__task-main">
            <div className="task-main__icon"></div>
            <div className="task-main__title">{mainTask.title}</div>
        </div>
    ) 

}

export default MainTask;