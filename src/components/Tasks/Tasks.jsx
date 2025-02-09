import { useCallback, useEffect, useState } from "react";
import useUpdateStorage from "../../hooks/useUpdateStorage.js";
import TaskList from "./components/TaskList.jsx";
import TaskListHeader from "./components/TaskListHeader/TaskListHeader.jsx";
import CompletedTasksList from './components/CompletedTasks/CompletedTasksList.jsx'
import './tasks.css';

function Tasks() {
    
    // массив НЕ выполненных задач [{}]
    const [tasks, setTasks] = useState(() => storageTasks('tasks'));
    // если нажата кнопка удалить все - меняем состояние на true, очищаем список задач
    const [isDeleteAll, setIsDeleteAll] = useState(false);
    
    const arrayCompletedTasks = storageTasks('completed-tasks');
    // массив выполненных задач [{}]
    const [completedTasks, setCompletedTasks] = useState(arrayCompletedTasks);

    const [hasCompleted, setHasCompleted] = useState(() => arrayCompletedTasks.length > 0 ? true : false);

    // при изменении задач - сохраняем в localStorage
    useUpdateStorage('tasks', tasks);
    // при изменении выполненных задач - сохраняем в localStorage
    useUpdateStorage('completed-tasks', completedTasks);
    
    const callSetTasks = useCallback((value) => setTasks(value), []);
    const callSetIsDeleteAll = useCallback((value) => setIsDeleteAll(value), [])
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

                <TaskListHeader 
                basicTasks={{tasks, setTasks: callSetTasks}}
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}/>

                <TaskList 
                basicTasks={{tasks, setTasks: callSetTasks}}
                completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}
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