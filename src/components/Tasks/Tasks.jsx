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
    // массив выполненных задач [{}]
    const [completedTasks, setCompletedTasks] = useState(() => storageTasks('completed-tasks'));
    
    // при изменении задач - сохраняем в localStorage
    useUpdateStorage('tasks', tasks);
    // при изменении выполненных задач - сохраняем в localStorage
    useUpdateStorage('completed-tasks', completedTasks);
    
    const callSetTasks = useCallback((value) => setTasks(value), []);
    const callSetIsDeleteAll = useCallback((value) => setIsDeleteAll(value), [])
    const callSetCompletedTasks = useCallback((value) => setCompletedTasks(value), []);


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
                {completedTasks.length > 0 && (
                    <CompletedTasksList 
                    completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}/>
                )}

            </div>
        </section>
    )

}

export default Tasks;