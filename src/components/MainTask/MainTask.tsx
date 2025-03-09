import { useAppSelector } from '../../hooks/useRedux';
import useUpdateStorage from '../../hooks/useUpdateStorage';
import './MainTask.css';

const MainTask = () => {    
    const mainTask = useAppSelector(state => state.mainTask);
    useUpdateStorage('mainTask', mainTask);
    
    return (
        <div className="main__task-main">
            <div className="task-main__icon"></div>
            <div className="task-main__title">{mainTask.title}</div>
        </div>
    ) 
}

export default MainTask;