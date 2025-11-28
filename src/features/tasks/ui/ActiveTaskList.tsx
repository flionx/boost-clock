"use client"
import useActiveTasks from '../model/useActiveTasks'
import TaskCard from './TaskCard';

const ActiveTaskList = () => {
  const tasks = useActiveTasks();
  return (
    <>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </>
  )
}

export default ActiveTaskList