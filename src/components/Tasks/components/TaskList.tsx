import TaskCard from './TaskCard';
import CreateTaskCard from './CreateTaskCard';
import { useSelector } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';

function TaskList() {

    const [hasCreateTask, setHasCreateTask] = useState(false);
    const allTasks = useSelector(state => state.tasks.tasks)
    const tasks = useMemo(() => allTasks.filter(task => !task.complete))
    
    const toggleHasCreateTask = useCallback(() => {
        setHasCreateTask(curr => !curr)
    })

    return (
        <div className="container-for-task">
        <ul className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                key={task.id} 
                taskIndex={index}
                task={task}
                hasCreateTask={hasCreateTask}
                />))}
        </ul>   
            {hasCreateTask && (
                <CreateTaskCard
                    isEdit={false}
                    hasCreateTask={hasCreateTask}
                    toggleHasCreateTask={toggleHasCreateTask}
                />
             )}
            <li className="tasks__item">
            <button 
            onClick={toggleHasCreateTask}
            className="tasks__add">
                <div className="tasks__add-circle">+</div>
                Add new task</button>
            </li>
        </div>
    )    
}

export default TaskList;
