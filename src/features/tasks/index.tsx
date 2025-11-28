import ButtonAddTask from './ui/ButtonAddTask'
import TaskForm from './ui/TaskForm'
import TasksHeader from './ui/TasksHeader'
import ActiveTaskList from './ui/ActiveTaskList'

const Tasks = () => {
  return (
    <section className="w-[clamp(22rem,51.3vw,61.6rem)] mx-auto">
      <TasksHeader />
      <div className="flex items-center flex-col w-[clamp(20rem,48.2vw,58rem)] mx-auto">
        <ActiveTaskList />
        <TaskForm />
        <ButtonAddTask />
      </div>
    </section>
  )
}

export default Tasks