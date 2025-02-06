import TaskCard from './TaskCard.jsx';
import CreateTaskCard from './CreateTaskCard.jsx'
import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';

function TaskList({deleteAll, completeTasks}) {

    const {isDeleteAll, setIsDeleteAll} = deleteAll;

    // массив всех задач [{}]
    const [tasks, setTasks] = useState([]);
    // создается ли новая задача
    const [hasCreateTask, setCreateTask] = useState(false);
    // новая задача {}
    const [newTask, setNewTask] = useState({title: '', description: null, id: Date.now()})
    

    const taskElement = useRef(null);
    useEffect(() => {
        if (isDeleteAll) {

            // 
            const height = taskElement.current.getBoundingClientRect().height; // Узнаем высоту
            taskElement.current.style.maxHeight = `${height}px`; 
            taskElement.current.classList.add("anim-delete")
            // 
            setTimeout(() => {
                setTasks(t => t = [])
                setIsDeleteAll(false);
                // 
                taskElement.current.classList.remove("anim-delete")
                taskElement.current.style.maxHeight = ``; 
                // 
            }, 500)
            // (пройтись по каждой карточке и применить аним прежде чем очищать)
        }

    }, [isDeleteAll])

    // коллбэк для передачи состояний вниз
    const callSetNewTask = useCallback((value) => setNewTask(value), []);
    const callSetCreateTask = useCallback((value) => setCreateTask(value), []);
    const callSetTasks = useCallback((value) => setTasks(value), []);


    return (
        <div className="container-for-task">
        <ul 
        ref={taskElement} 
        className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                taskIndex={index}
                key={task.id} 
                task={task}
                completeTasks={completeTasks}
                tasks={{tasks, setTasks: callSetTasks}}
                />))}
        </ul>   
            {hasCreateTask ? (
                <CreateTaskCard 
                createTask={{ newTask, setNewTask : callSetNewTask }}
                isCreate={{hasCreateTask, setCreateTask : callSetCreateTask}}
                changeTasks={{tasks, setTasks: callSetTasks}}/>
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
