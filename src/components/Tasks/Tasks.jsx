import { useCallback, useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskListHeader from "./components/TaskListHeader/TaskListHeader.jsx";
import CompletedTasks from './components/CompletedTasks/CompletedTasks.jsx'
import './tasks.css';

function Tasks() {

    // если нажата кнопка удалить все - меняем состояние на true, очищаем список задач
    const [isDeleteAll, setIsDeleteAll] = useState(false);
    const callSetIsDeleteAll = useCallback((value) => setIsDeleteAll(value), [])

    // выполненные задачи, добавляем из TaskList
    const [completedTasks, setCompletedTasks] = useState([]);
    const callSetCompletedTasks = useCallback((value) => setCompletedTasks(value), []);

    return (
        <section className="main__tasks tasks">
            <div className="container-tasks">

                <TaskListHeader 
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}/>

                <TaskList 
                completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}
                />
                {completedTasks.length > 0 && (

                    <CompletedTasks 
                    completeTasks={{completedTasks, setCompletedTasks: callSetCompletedTasks}}/>
                )}

            </div>
        </section>
    )

}

export default Tasks;