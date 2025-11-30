import ButtonAddTask from './ui/buttons/ButtonAddTask'
import { TasksHeader, ActiveTaskList } from './ui/acitve-tasks'
import { ButtonCompletedTasks, CompletedTaskList } from './ui/completed-tasks'
import { AnimatedTaskForm } from './ui/TaskForm'

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
        <CompletedTaskList />
      </section>
    </section>
  )
}

export default Tasks