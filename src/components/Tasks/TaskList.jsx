import TaskCard from './TaskCard.jsx';
import CreateTaskCard from './CreateTaskCard.jsx'
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

function TaskList({deleteAll}) {

    // массив всех задач
    const [tasks, setTasks] = useState([]);
    // создается ли новая задача
    const [hasCreateTask, setCreateTask] = useState(false);
    // новая задача {}
    const [newTask, setNewTask] = useState({title: '', description: false})

    const {isDeleteAll, setIsDeleteAll} = deleteAll;

    useEffect(() => {

        if (isDeleteAll) {
            setTasks(t => t = [])
            setIsDeleteAll(curr => curr = false)
        }

    }, [isDeleteAll])

    // коллбэк для передачи состояний вниз
    const callSetNewTask = useCallback((value) => setNewTask(value), []);
    const callSetCreateTask = useCallback((value) => setCreateTask(value), []);
    const callSetTasks = useCallback((value) => setTasks(value), []);




    return (
        <div className="container-for-task">
        <ul className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                taskIndex={index}
                tasksForMove={{tasks, setTasks: callSetTasks}}
                key={index} task={task}/>))}
           
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
        </ul>
        </div>

    )    
}

export default TaskList;
