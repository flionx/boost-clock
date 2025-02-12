import TaskCard from './TaskCard.jsx';
import { useEffect, useRef, useState, useContext , useCallback } from 'react';
import AnimDeleteCard from '../helpers/AnimDeleteCard.js';
import CreateTaskCard from './CreateTaskCard.jsx';
import RoundContext from "../../MainContent/context/RoundContext.js";


function TaskList({deleteAll, completeTasks, basicTasks}) {

    const {tasks, setTasks} = basicTasks;

    const {isDeleteAll, setIsDeleteAll} = deleteAll;

    const {wasRound, setWasRound} = useContext(RoundContext);


    // создается ли новая задача
    const [hasCreateTask, setCreateTask] = useState(false);
    const callSetCreateTask = useCallback((value) => setCreateTask(value), []);
    
    const tasksListRef = useRef(null);
    // если нажата кнопка удалить все 
    useEffect(() => {
        if (isDeleteAll) {
                
            AnimDeleteCard(tasksListRef);

            setTimeout(() => {
                setTasks(t => t = [])
                setIsDeleteAll(prev => prev = false);
            }, 500)
                
        }

    }, [isDeleteAll])

    useEffect(() => {
        if (wasRound) {
            const CurrTasks = [...tasks];
            const changedTasks = CurrTasks.map(task => (
                {...task, rounds: task.rounds + 1}
            ));
            setTasks(changedTasks)
            setWasRound(false);
        }
    }, [wasRound])



    return (
        <div className="container-for-task">
        <ul 
        ref={tasksListRef} 
        className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                taskIndex={index}
                key={task.id} 
                task={task}
                completeTasks={completeTasks}
                tasks={basicTasks}
                />))}
        </ul>   
            {hasCreateTask ? (
                <CreateTaskCard 
                isCreate={{hasCreateTask, setCreateTask : callSetCreateTask}}
                changeTasks={basicTasks}/>
             ) : null}
            

            <li className="tasks__item">
            <button 
            onClick={() => setCreateTask(true)}
            className="tasks__add">
                <div className="tasks__add-circle">+</div>
                Add new task</button>
            </li>
        
        </div>

    )    
}

export default TaskList;
