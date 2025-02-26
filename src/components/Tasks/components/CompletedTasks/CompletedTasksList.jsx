import { useEffect, useRef, useState } from 'react';
import './CompletedTasks.css';
import CompletedTaskCard from './CompletedTaskCard';

function CompletedTasksList({completedTasks, changeCompletedHandler}) {
    
    const [isShowTasks, setIsShowTasks] = useState(true);

    const CompletedTasksListRef = useRef(null);

    const arrowRef = useRef(null);
    useEffect(() =>{
        if (isShowTasks) {
            // изменение класса на обычный
            arrowRef.current.className = 'task-comlpeted__arrow'
        } else {
            // добавление класса, который прокручивает стрелку
            arrowRef.current.className = 'task-comlpeted__arrow task-comlpeted__arrow-rotated'
        }

    }, [isShowTasks])

    return (
        <section 
            ref={CompletedTasksListRef}
            className="completed__tasks tasks-completed">
            <div className="container-in">
                <button 
                    onClick={()=> setIsShowTasks(curr => !curr)}
                    className="tasks-completed__header">
                    Completed tasks
                    <div 
                    ref={arrowRef}
                    className="task-comlpeted__arrow"></div>
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