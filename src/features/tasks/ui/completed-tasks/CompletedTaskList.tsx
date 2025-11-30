"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { useTasksStore } from '@/shared/store/tasks';
import useCompletedTasks from '../../model/useCompletedTasks'
import { CompletedTaskCard } from '../task-card';

const CompletedTaskList = () => {
  const tasks = useCompletedTasks();
  const showTasks = useTasksStore(state => state.showCompletedTasks);

  return (
    <AnimatePresence>
      {showTasks && (
        <motion.div
          key="completed-tasks"
          className="w-full px-[clamp(0rem,1.5vw,1.875rem)] overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                className="w-full mb-2 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CompletedTaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletedTaskList;
