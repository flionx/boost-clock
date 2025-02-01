import TaskList from "./TaskList";
import TaskListHeader from "./TaskListHeader";

function Tasks() {

    return (
        <section className="main__tasks tasks">
            <div className="container-tasks">

                <TaskListHeader />
                <TaskList />
                
            </div>
        </section>
    )

}

export default Tasks;