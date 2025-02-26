import { useCallback, useEffect, useState, useMemo } from "react";
import useUpdateStorage from "../../hooks/useUpdateStorage.js";
import TaskList from "./components/TaskList.jsx";
import TaskListHeader from "./components/TaskListHeader/TaskListHeader.jsx";
import CompletedTasksList from './components/CompletedTasks/CompletedTasksList.jsx'
import './tasks.css';
import { useSelector } from "react-redux";

function Tasks() {
    
    const tasks = useSelector(state => state.tasks.tasks)

    const completedTasks = useMemo(() => tasks.filter(task => task.complete), [tasks]);

    const [hasCompleted, setHasCompleted] = useState(completedTasks.length > 0);

    useUpdateStorage('tasks', tasks);
    
    useEffect(() => {
        if (completedTasks.length >= 1 && !hasCompleted) {
            setHasCompleted(curr => true);
        }
    }, [completedTasks.length])

    const changeCompletedHandler = useCallback(() => {
        setHasCompleted(curr => false);
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