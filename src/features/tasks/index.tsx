import ButtonAddTask from './ui/buttons/ButtonAddTask'
import TasksHeader from './ui/acitve-tasks/TasksHeader'
import ActiveTaskList from './ui/acitve-tasks/ActiveTaskList'
import { AnimatedTaskForm } from './ui/TaskForm'
import ButtonCompletedTasks from './ui/completed-tasks/ButtonCompletedTasks'

const Tasks = () => {
  return (
    <section className="w-[clamp(22rem,51.3vw,61.6rem)] mx-auto">
      <TasksHeader />
      <section className="flex items-center flex-col w-[clamp(22rem,48.2vw,58rem)] mx-auto">
        <ActiveTaskList />
        <AnimatedTaskForm />
        <ButtonAddTask />
      </section>
      <section className="flex items-center flex-col w-[clamp(22rem,51.3vw,61.6rem)] mx-auto">
        <ButtonCompletedTasks />
      </section>
    </section>
  )
}

export default Tasks