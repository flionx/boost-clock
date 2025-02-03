import { useCallback, useState } from "react";
import TaskList from "./TaskList";
import TaskListHeader from "./TaskListHeader";

function Tasks() {

    // если нажата кнопка удалить все - меняем состояние на true, очищаем список задач
    const [isDeleteAll, setIsDeleteAll] = useState(false);
    const callSetIsDeleteAll = useCallback((value) => setIsDeleteAll(value), [])

    return (
        <section className="main__tasks tasks">
            <div className="container-tasks">

                <TaskListHeader 
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}/>

                <TaskList 
                deleteAll={{isDeleteAll, setIsDeleteAll: callSetIsDeleteAll}}/>
                
            </div>
        </section>
    )

}

export default Tasks;