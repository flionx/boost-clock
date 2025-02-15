import { useCallback, useEffect, useState } from "react";
import useUpdateStorage from "../../hooks/useUpdateStorage.js";
import TaskList from "./components/TaskList.jsx";
import TaskListHeader from "./components/TaskListHeader/TaskListHeader.jsx";
import CompletedTasksList from './components/CompletedTasks/CompletedTasksList.jsx'
import './tasks.css';
import { useDispatch, useSelector } from "react-redux";

function Tasks() {
    
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.tasks)
    
    const arrayCompletedTasks = storageTasks('completed-tasks');
    // массив выполненных задач [{}]
    const [completedTasks, setCompletedTasks] = useState(arrayCompletedTasks);

    const [hasCompleted, setHasCompleted] = useState(() => arrayCompletedTasks.length > 0 ? true : false);

    // при изменении задач - сохраняем в localStorage
    useUpdateStorage('tasks', tasks);
    // при изменении выполненных задач - сохраняем в localStorage
    useUpdateStorage('completed-tasks', completedTasks);
    
    const callSetCompletedTasks = useCallback((value) => setCompletedTasks(value), []);

    // когда меняется кол.во выполненных задач
    useEffect(() => {
        if (completedTasks.length >= 1 && !hasCompleted) {
            setHasCompleted(curr => true);
        }
    }, [completedTasks.length])

    const changeStateNoCompleted = useCallback(() => {
        setHasCompleted(curr => false);
    }, [])

    function storageTasks(key) {
        const storage = JSON.parse(localStorage.getItem(key));
        return storage ? storage : [];
    }
    

    return (
        <section className="main__tasks tasks">
            <div className="container-tasks">

                <TaskListHeader/>

                <TaskList 
                    completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}
                />
                {hasCompleted && (
                    <CompletedTasksList 
                    noCompleted={changeStateNoCompleted}
                    hasCompleted={hasCompleted}
                    completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}/>
                )}

            </div>
        </section>
    )

}

export default Tasks;