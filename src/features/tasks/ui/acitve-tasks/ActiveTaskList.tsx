"use client"
import { AnimatePresence, motion } from 'framer-motion';
import useActiveTasks from '../../model/useActiveTasks'
import { ActiveTaskCard } from '../task-card';

const ActiveTaskList = () => {
  const tasks = useActiveTasks();
  return (
    <AnimatePresence>
      {tasks.map(task => (
        <motion.div
          key={task.id}  
          className="w-full mb-7.5 overflow-hidden"
          initial={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveTaskCard key={task.id} task={task}/>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default ActiveTaskList