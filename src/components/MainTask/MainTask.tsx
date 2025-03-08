import { FC } from 'react';
import useUpdateStorage from '../../hooks/useUpdateStorage';
import { useAppSelector } from '../../hooks/useRedux';
import './MainTask.css';

const MainTask: FC = () => {    
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