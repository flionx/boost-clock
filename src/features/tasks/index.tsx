import ButtonAddTask from './ui/buttons/ButtonAddTask'
import TasksHeader from './ui/TasksHeader'
import ActiveTaskList from './ui/ActiveTaskList'
import { AnimatedTaskForm } from './ui/TaskForm'

const Tasks = () => {
  return (
    <section className="w-[clamp(22rem,51.3vw,61.6rem)] mx-auto">
      <TasksHeader />
      <div className="flex items-center flex-col w-[clamp(22rem,48.2vw,58rem)] mx-auto">
        <ActiveTaskList />
        <AnimatedTaskForm />
        <ButtonAddTask />
      </div>
    </section>
  )
}

export default Tasks