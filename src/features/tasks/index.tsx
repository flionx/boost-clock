import ButtonAddTask from './ui/buttons/ButtonAddTask'
import { TasksHeader, ActiveTaskList } from './ui/acitve-tasks'
import { ButtonCompletedTasks, CompletedTaskList } from './ui/completed-tasks'
import { AnimatedTaskForm } from './ui/TaskForm'

const Tasks = () => {
  return (
    <section className="content-wrapper">
      <TasksHeader />
      <section className="content-wrapper flex items-center flex-col">
        <ActiveTaskList />
        <AnimatedTaskForm />
        <ButtonAddTask />
      </section>
      <section className="content-wrapper flex items-center flex-col">
        <ButtonCompletedTasks />
        <CompletedTaskList />
      </section>
    </section>
  )
}

export default Tasks