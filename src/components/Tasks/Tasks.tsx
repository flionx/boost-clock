import { useCallback, useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import useUpdateStorage from "../../hooks/useUpdateStorage";
import TaskList from "./components/TaskList";
import TaskListHeader from "./components/TaskListHeader/TaskListHeader";
import CompletedTasksList from './components/CompletedTasks/CompletedTasksList'
import './tasks.css';

const Tasks = () => {
    const tasks = useAppSelector(state => state.tasks.tasks)    
    const completedTasks = useMemo(() => tasks.filter(task => task.complete), [tasks]);
    const [hasCompleted, setHasCompleted] = useState<boolean>(completedTasks.length > 0);

    useUpdateStorage('tasks', tasks);
    
    useEffect(() => {
        if (completedTasks.length >= 1 && !hasCompleted) {
            setHasCompleted(prev => prev = true);
        } if (completedTasks.length == 0) {
            setHasCompleted(prev => prev = false);
        }
    }, [completedTasks.length])

    const changeCompletedHandler = useCallback(() => {
        setHasCompleted(prev => prev = false);
    }, [])

    return (
        <section className="main__tasks tasks">
            <div className="container-in">
                <TaskListHeader/>
                <TaskList />
                {hasCompleted && (
                    <CompletedTasksList 
                    completedTasks={completedTasks}
                    changeCompletedHandler={changeCompletedHandler}/>
                )}
            </div>
        </section>
    )
}

export default Tasks;