import { useRef, useState } from 'react';
import CompletedTaskCard from './CompletedTaskCard';
import './CompletedTasks.css';
const arrowRotate = 'task-comlpeted__arrow-rotated';

function CompletedTasksList({completedTasks, changeCompletedHandler}) {
    
    const [isShowTasks, setIsShowTasks] = useState(true);
    const CompletedTasksListRef = useRef(null);

    return (
        <section 
            ref={CompletedTasksListRef}
            className="completed__tasks tasks-completed">
            <div className="container-in">
                <button 
                    onClick={()=> setIsShowTasks(curr => !curr)}
                    className="tasks-completed__header">
                    Completed tasks
                    <div className={`task-comlpeted__arrow ${!isShowTasks && arrowRotate}`}></div>
                </button>
                <ul className="completed-list">
                    {isShowTasks && (
                        completedTasks.map((task, index) => (
                        <CompletedTaskCard 
                            key={task.id} 
                            task={task} 
                            taskIndex={index} 
                            completedTasks={completedTasks} 
                            CompletedTasksListRef={CompletedTasksListRef}
                            changeCompletedHandler={changeCompletedHandler}
                        />
                        ))
                    )}
                </ul>
            </div>
        </section>
    )
}

export default CompletedTasksList;