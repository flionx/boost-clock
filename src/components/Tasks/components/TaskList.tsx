import TaskCard from './TaskCard';
import CreateTaskCard from './CreateTaskCard';
import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setEditTaskId } from '../../../store/slices/tasksSlice';

const TaskList = () => {
    const [hasCreateTask, setHasCreateTask] = useState(false);
    const dispatch = useAppDispatch();
    const allTasks = useAppSelector(state => state.tasks.tasks)
    const tasks = useMemo(() => allTasks.filter(task => !task.complete), [allTasks])
    const editTaskId = useAppSelector(state => state.tasks.editTaskId)
    
    const toggleHasCreateTask = useCallback(() => {
        setHasCreateTask(curr => !curr)
        dispatch(setEditTaskId(null))
    }, [])
    const callSetHasCreateTask = useCallback((value: boolean) => setHasCreateTask(value), [])

    return (
        <div className="container-for-task">
        <ul className="tasks__list">
            {tasks.map((task, index) => (
                <TaskCard 
                    key={task.id} 
                    taskIndex={index}
                    task={task}
                    callSetHasCreateTask={callSetHasCreateTask}
                />))}
        </ul>   
            {hasCreateTask && typeof editTaskId !== 'number' && (
                <CreateTaskCard
                    isEdit={false}
                    hasCreateTask={hasCreateTask}
                    callSetHasCreateTask={callSetHasCreateTask}
                />
             )}
            <li className="tasks__item">
            <button 
                onClick={toggleHasCreateTask}
                className="tasks__add">
                <div className="tasks__add-circle">+</div>
                Add new task
            </button>
            </li>
        </div>
    )    
}

export default TaskList;
