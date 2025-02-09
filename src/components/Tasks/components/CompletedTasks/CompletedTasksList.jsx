import { useEffect, useRef, useState } from 'react';
import './index.css'
import CompletedTaskCard from './CompletedTaskCard';

function CompletedTasksList({completeTasks, noCompleted}) {
    
    const [isShowTasks, setIsShowTasks] = useState(true);

    const CompletedTasksSectionRef = useRef(null);

    // выполненные задачи
    const {completedTasks, setCompletedTasks} = completeTasks;    

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
            ref={CompletedTasksSectionRef}
            className="completed__tasks tasks-completed">
            <div className="container-tasks">
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
                            completeTasks={completeTasks} 
                            CompletedTasksSectionRef={CompletedTasksSectionRef}
                            noCompleted={noCompleted}
                        />
                        ))
                    )}

                </ul>
            </div>
        </section>
    )
}

export default CompletedTasksList;